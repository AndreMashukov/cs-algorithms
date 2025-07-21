// Design Pattern: Factory Pattern
// Real-World Use Case: API Client Factory
// Description: A factory system that creates different API clients for various services and protocols
//
// Problem Statement:
// Enterprise applications need to integrate with multiple external APIs (REST, GraphQL, gRPC)
// and internal microservices. Each API has different authentication, error handling, and
// communication protocols. Creating API clients directly in business logic creates tight
// coupling and makes it difficult to switch between services or mock APIs for testing.
//
// Solution Overview:
// The Factory Pattern encapsulates API client creation logic, allowing the application to
// request clients without knowing the specific implementation details. This enables
// easy service switching, centralized configuration management, and consistent error handling.

// Interfaces and Types
interface ApiClient {
  get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
  upload<T>(endpoint: string, file: File, metadata?: Record<string, unknown>): Promise<ApiResponse<T>>;
  getClientInfo(): ClientInfo;
  setAuthToken(token: string): void;
  clearAuthToken(): void;
}

interface ApiConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retryAttempts: number;
  readonly retryDelay: number;
  readonly authType: AuthType;
  readonly apiKey?: string;
  readonly headers?: Record<string, string>;
  readonly interceptors?: ClientInterceptors;
}

interface ClientInterceptors {
  request?: RequestInterceptor[];
  response?: ResponseInterceptor[];
  error?: ErrorInterceptor[];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  metadata: ResponseMetadata;
}

interface ResponseMetadata {
  requestId: string;
  timestamp: number;
  duration: number;
  cached: boolean;
  retryCount: number;
}

type ApiType = 'rest' | 'graphql' | 'grpc' | 'soap';
type AuthType = 'none' | 'bearer' | 'api-key' | 'oauth2' | 'basic';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type QueryParams = Record<string, string | number | boolean>;
type RequestBody = Record<string, unknown> | FormData | string;

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>;

type RequestConfig = {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: RequestBody;
  timeout: number;
};

type ClientInfo = {
  type: ApiType;
  baseUrl: string;
  authType: AuthType;
  isAuthenticated: boolean;
  requestCount: number;
  lastRequestTime: number;
};

type ApiClientFactoryInterface<T extends ApiClient> = {
  createClient(config: ApiConfig): T;
  createMockClient(config: ApiConfig): T;
  getSupportedAuthTypes(): AuthType[];
};

// Enums and Error Types
enum RequestStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
  TIMEOUT = 'timeout',
  CANCELLED = 'cancelled'
}

enum CacheStrategy {
  NO_CACHE = 'no-cache',
  CACHE_FIRST = 'cache-first',
  NETWORK_FIRST = 'network-first',
  CACHE_ONLY = 'cache-only'
}

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class NetworkError extends ApiError {
  constructor(message: string, public readonly originalError: Error) {
    super(message, 0, 'NETWORK_ERROR', { originalError: originalError.message });
    this.name = 'NetworkError';
  }
}

class TimeoutError extends ApiError {
  constructor(timeout: number) {
    super(`Request timed out after ${timeout}ms`, 408, 'TIMEOUT_ERROR', { timeout });
    this.name = 'TimeoutError';
  }
}

// Abstract base class for API clients
abstract class BaseApiClient implements ApiClient {
  protected authToken: string | null = null;
  protected requestCount: number = 0;
  protected lastRequestTime: number = 0;
  protected cache: Map<string, { data: unknown; timestamp: number; ttl: number }> = new Map();
  
  constructor(
    protected config: ApiConfig,
    protected clientType: ApiType
  ) {}
  
  abstract get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>>;
  abstract post<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>>;
  abstract put<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>>;
  abstract delete<T>(endpoint: string): Promise<ApiResponse<T>>;
  
  public async upload<T>(endpoint: string, file: File, metadata?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }
    
    return this.post<T>(endpoint, formData);
  }
  
  public setAuthToken(token: string): void {
    this.authToken = token;
  }
  
  public clearAuthToken(): void {
    this.authToken = null;
  }
  
  public getClientInfo(): ClientInfo {
    return {
      type: this.clientType,
      baseUrl: this.config.baseUrl,
      authType: this.config.authType,
      isAuthenticated: this.authToken !== null,
      requestCount: this.requestCount,
      lastRequestTime: this.lastRequestTime
    };
  }
  
  protected async executeRequest<T>(requestConfig: RequestConfig): Promise<ApiResponse<T>> {
    this.requestCount++;
    this.lastRequestTime = Date.now();
    
    // Apply request interceptors
    let config = requestConfig;
    if (this.config.interceptors?.request) {
      for (const interceptor of this.config.interceptors.request) {
        config = await interceptor(config);
      }
    }
    
    // Add authentication headers
    config.headers = { ...config.headers, ...this.getAuthHeaders() };
    
    // Execute request with retry logic
    let lastError: Error;
    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const response = await this.performRequest<T>(config);
        
        // Apply response interceptors
        if (this.config.interceptors?.response) {
          let processedResponse = response;
          for (const interceptor of this.config.interceptors.response) {
            processedResponse = await interceptor(processedResponse);
          }
          return processedResponse;
        }
        
        return response;
      } catch (error) {
        lastError = error as Error;
        
        // Apply error interceptors
        if (this.config.interceptors?.error) {
          for (const interceptor of this.config.interceptors.error) {
            const processedError = await interceptor(error as ApiError);
            if (processedError !== error) {
              throw processedError;
            }
          }
        }
        
        if (attempt < this.config.retryAttempts && this.shouldRetry(error as ApiError)) {
          await this.delay(this.config.retryDelay * Math.pow(2, attempt));
          continue;
        }
        
        throw error;
      }
    }
    
    throw lastError!;
  }
  
  protected abstract performRequest<T>(config: RequestConfig): Promise<ApiResponse<T>>;
  
  protected buildUrl(endpoint: string, params?: QueryParams): string {
    const url = new URL(endpoint, this.config.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return url.toString();
  }
  
  protected getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    
    switch (this.config.authType) {
      case 'bearer':
        if (this.authToken) {
          headers['Authorization'] = `Bearer ${this.authToken}`;
        }
        break;
      case 'api-key':
        if (this.config.apiKey) {
          headers['X-API-Key'] = this.config.apiKey;
        }
        break;
      case 'basic':
        if (this.authToken) {
          headers['Authorization'] = `Basic ${this.authToken}`;
        }
        break;
    }
    
    return headers;
  }
  
  private shouldRetry(error: ApiError): boolean {
    // Retry on network errors and 5xx status codes
    return error instanceof NetworkError || 
           error instanceof TimeoutError ||
           (error.status >= 500 && error.status < 600);
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// REST API Client Implementation
class RestApiClient extends BaseApiClient {
  constructor(config: ApiConfig) {
    super(config, 'rest');
  }
  
  public async get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, params);
    return this.executeRequest<T>({
      method: 'GET',
      url,
      headers: { 'Content-Type': 'application/json' },
      timeout: this.config.timeout
    });
  }
  
  public async post<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const isFormData = data instanceof FormData;
    
    return this.executeRequest<T>({
      method: 'POST',
      url,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? data : JSON.stringify(data),
      timeout: this.config.timeout
    });
  }
  
  public async put<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.executeRequest<T>({
      method: 'PUT',
      url,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      timeout: this.config.timeout
    });
  }
  
  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.executeRequest<T>({
      method: 'DELETE',
      url,
      headers: { 'Content-Type': 'application/json' },
      timeout: this.config.timeout
    });
  }
  
  protected async performRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: config.body as BodyInit,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          'HTTP_ERROR',
          { response: responseData }
        );
      }
      
      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
        metadata: {
          requestId: response.headers.get('x-request-id') || this.generateRequestId(),
          timestamp: Date.now(),
          duration: Date.now() - this.lastRequestTime,
          cached: false,
          retryCount: 0
        }
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if ((error as Error).name === 'AbortError') {
        throw new TimeoutError(config.timeout);
      }
      
      throw new NetworkError('Network request failed', error as Error);
    }
  }
  
  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  
  private generateRequestId(): string {
    return `req_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
  }
}

// GraphQL API Client Implementation
class GraphQLApiClient extends BaseApiClient {
  constructor(config: ApiConfig) {
    super(config, 'graphql');
  }
  
  public async get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>> {
    // Convert GET request to GraphQL query
    const query = this.buildQuery(endpoint, params);
    return this.executeGraphQLRequest<T>(query);
  }
  
  public async post<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>> {
    if (typeof data === 'string') {
      // Direct GraphQL query
      return this.executeGraphQLRequest<T>(data);
    }
    
    // Convert to GraphQL mutation
    const mutation = this.buildMutation(endpoint, data);
    return this.executeGraphQLRequest<T>(mutation);
  }
  
  public async put<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>> {
    const mutation = this.buildMutation(endpoint, data, 'update');
    return this.executeGraphQLRequest<T>(mutation);
  }
  
  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const mutation = this.buildMutation(endpoint, undefined, 'delete');
    return this.executeGraphQLRequest<T>(mutation);
  }
  
  private async executeGraphQLRequest<T>(query: string, variables?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.executeRequest<T>({
      method: 'POST',
      url: this.config.baseUrl,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      timeout: this.config.timeout
    });
  }
  
  protected async performRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: config.body as BodyInit,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const responseData = await response.json();
      
      if (responseData.errors) {
        throw new ApiError(
          `GraphQL Error: ${responseData.errors.map((e: any) => e.message).join(', ')}`,
          response.status,
          'GRAPHQL_ERROR',
          { errors: responseData.errors }
        );
      }
      
      return {
        data: responseData.data,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
        metadata: {
          requestId: response.headers.get('x-request-id') || this.generateRequestId(),
          timestamp: Date.now(),
          duration: Date.now() - this.lastRequestTime,
          cached: false,
          retryCount: 0
        }
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  private buildQuery(endpoint: string, params?: QueryParams): string {
    const fields = Object.keys(params || {}).join(' ');
    return `query { ${endpoint} { ${fields || 'id'} } }`;
  }
  
  private buildMutation(endpoint: string, data?: RequestBody, operation = 'create'): string {
    const input = data ? JSON.stringify(data).replace(/"([^"]+)":/g, '$1:') : '';
    return `mutation { ${operation}${endpoint}(input: ${input}) { id } }`;
  }
  
  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  
  private generateRequestId(): string {
    return `gql_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
  }
}

// Mock API Client for Testing
class MockApiClient extends BaseApiClient {
  private mockData: Map<string, unknown> = new Map();
  private mockDelay: number = 100;
  
  constructor(config: ApiConfig) {
    super(config, 'rest');
    this.setupMockData();
  }
  
  public setMockData(endpoint: string, data: unknown): void {
    this.mockData.set(endpoint, data);
  }
  
  public setMockDelay(delay: number): void {
    this.mockDelay = delay;
  }
  
  public async get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>> {
    await this.delayMock(this.mockDelay);
    const data = this.mockData.get(endpoint) || { message: 'Mock data' };
    return this.createMockResponse<T>(data as T);
  }
  
  public async post<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>> {
    await this.delayMock(this.mockDelay);
    const responseData = { 
      id: Math.random().toString(36).substr(2, 9), 
      ...(typeof data === 'object' && data !== null ? data as Record<string, unknown> : {})
    };
    return this.createMockResponse<T>(responseData as T);
  }
  
  public async put<T>(endpoint: string, data?: RequestBody): Promise<ApiResponse<T>> {
    await this.delayMock(this.mockDelay);
    return this.createMockResponse<T>(data as T);
  }
  
  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    await this.delayMock(this.mockDelay);
    return this.createMockResponse<T>({ success: true } as T);
  }
  
  protected async performRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    // Mock implementation doesn't use actual HTTP requests
    return this.createMockResponse<T>({} as T);
  }
  
  private createMockResponse<T>(data: T): ApiResponse<T> {
    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      metadata: {
        requestId: `mock_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        duration: this.mockDelay,
        cached: false,
        retryCount: 0
      }
    };
  }
  
  private setupMockData(): void {
    this.mockData.set('/users', [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]);
    
    this.mockData.set('/products', [
      { id: 1, name: 'Product 1', price: 99.99 },
      { id: 2, name: 'Product 2', price: 149.99 }
    ]);
  }
  
  private delayMock(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Factory Implementations
class RestApiFactory implements ApiClientFactoryInterface<RestApiClient> {
  public createClient(config: ApiConfig): RestApiClient {
    return new RestApiClient(config);
  }
  
  public createMockClient(config: ApiConfig): RestApiClient {
    return new MockApiClient(config) as unknown as RestApiClient;
  }
  
  public getSupportedAuthTypes(): AuthType[] {
    return ['none', 'bearer', 'api-key', 'basic'];
  }
}

class GraphQLApiFactory implements ApiClientFactoryInterface<GraphQLApiClient> {
  public createClient(config: ApiConfig): GraphQLApiClient {
    return new GraphQLApiClient(config);
  }
  
  public createMockClient(config: ApiConfig): GraphQLApiClient {
    return new MockApiClient(config) as unknown as GraphQLApiClient;
  }
  
  public getSupportedAuthTypes(): AuthType[] {
    return ['none', 'bearer', 'api-key'];
  }
}

// Main API Client Factory
class ApiClientFactory {
  private static factories = new Map<ApiType, ApiClientFactoryInterface<any>>([
    ['rest', new RestApiFactory()],
    ['graphql', new GraphQLApiFactory()]
  ]);
  
  public static createClient<T extends ApiClient>(
    type: ApiType,
    config: ApiConfig,
    mock = false
  ): T {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Unsupported API type: ${type}`);
    }
    
    if (mock) {
      return factory.createMockClient(config) as T;
    }
    
    return factory.createClient(config) as T;
  }
  
  public static registerFactory<T extends ApiClient>(
    type: ApiType,
    factory: ApiClientFactoryInterface<T>
  ): void {
    this.factories.set(type, factory);
  }
  
  public static getAvailableTypes(): ApiType[] {
    return Array.from(this.factories.keys());
  }
}

// Usage Examples
// Example 1: Basic Usage
const example1 = async () => {
  try {
    const config: ApiConfig = {
      baseUrl: 'https://api.example.com',
      timeout: 5000,
      retryAttempts: 3,
      retryDelay: 1000,
      authType: 'bearer',
      headers: { 'User-Agent': 'MyApp/1.0' }
    };
    
    const restClient = ApiClientFactory.createClient<RestApiClient>('rest', config);
    restClient.setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    
    const users = await restClient.get<{ id: number; name: string }[]>('/users');
    console.log('Basic usage result:', users.data);
    
    const clientInfo = restClient.getClientInfo();
    console.log('Client info:', clientInfo);
  } catch (error) {
    console.error('Error in basic usage:', error);
  }
};

// Example 2: Advanced Usage with Multiple API Types
const example2 = async () => {
  try {
    const restConfig: ApiConfig = {
      baseUrl: 'https://api.example.com',
      timeout: 5000,
      retryAttempts: 2,
      retryDelay: 500,
      authType: 'api-key',
      apiKey: 'abc123'
    };
    
    const graphqlConfig: ApiConfig = {
      baseUrl: 'https://graphql.example.com/graphql',
      timeout: 10000,
      retryAttempts: 1,
      retryDelay: 1000,
      authType: 'bearer'
    };
    
    const restClient = ApiClientFactory.createClient<RestApiClient>('rest', restConfig);
    const graphqlClient = ApiClientFactory.createClient<GraphQLApiClient>('graphql', graphqlConfig);
    
    // Parallel requests to different API types
    const [restUsers, graphqlData] = await Promise.all([
      restClient.get<{ users: any[] }>('/users'),
      graphqlClient.post<{ user: any }>('query { user(id: 1) { name email } }')
    ]);
    
    console.log('Advanced usage results:', {
      restUsers: restUsers.data,
      graphqlData: graphqlData.data
    });
  } catch (error) {
    console.error('Error in advanced usage:', error);
  }
};

// Example 3: Edge Cases and Error Handling
const example3 = async () => {
  try {
    const config: ApiConfig = {
      baseUrl: 'https://invalid-url.example.com',
      timeout: 1000,
      retryAttempts: 2,
      retryDelay: 500,
      authType: 'none'
    };
    
    // Test with mock client for development
    const mockClient = ApiClientFactory.createClient<RestApiClient>('rest', config, true);
    
    try {
      const mockUsers = await mockClient.get<{ id: number; name: string }[]>('/users');
      console.log('Mock client result:', mockUsers.data);
    } catch (error) {
      console.log('Mock client error:', error);
    }
    
    // Test error handling with real client
    const realClient = ApiClientFactory.createClient<RestApiClient>('rest', config);
    
    try {
      await realClient.get('/nonexistent-endpoint');
    } catch (error) {
      if (error instanceof NetworkError) {
        console.log('Network error caught:', error.message);
      } else if (error instanceof TimeoutError) {
        console.log('Timeout error caught:', error.message);
      } else if (error instanceof ApiError) {
        console.log('API error caught:', error.message, error.status);
      }
    }
    
    console.log('Edge case handling completed successfully');
  } catch (error) {
    console.error('Error in edge case handling:', error);
  }
};

// Export for module usage
export {
  ApiClient,
  ApiConfig,
  ApiResponse,
  ApiType,
  AuthType,
  ApiClientFactory as ApiClientFactoryClass,
  BaseApiClient,
  RestApiClient,
  GraphQLApiClient,
  MockApiClient,
  ApiError,
  NetworkError,
  TimeoutError
};

// Run examples
if (require.main === module) {
  (async () => {
    await example1();
    await example2();
    await example3();
  })();
}
