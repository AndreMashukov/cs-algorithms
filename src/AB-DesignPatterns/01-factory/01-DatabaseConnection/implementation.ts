// Design Pattern: Factory Pattern
// Real-World Use Case: Database Connection Factory
// Description: A factory that creates different types of database connections based on configuration
//
// Problem Statement:
// In enterprise applications, we need to connect to different databases (PostgreSQL, MySQL, MongoDB) 
// based on environment configuration. Creating database connections directly in business logic 
// creates tight coupling and makes it difficult to switch databases or manage connection pooling.
//
// Solution Overview:
// The Factory Pattern encapsulates database connection creation logic, allowing the application
// to request connections without knowing the specific implementation details. This enables
// easy switching between database types and centralized connection management.

// Interfaces and Types
interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: unknown[]): Promise<T[]>;
  transaction<T>(callback: (conn: DatabaseConnection) => Promise<T>): Promise<T>;
  getConnectionInfo(): ConnectionInfo;
}

interface ConnectionConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly poolSize?: number;
  readonly timeout?: number;
  readonly ssl?: boolean;
}

type DatabaseType = 'postgresql' | 'mysql' | 'mongodb';

type ConnectionInfo = {
  type: DatabaseType;
  host: string;
  database: string;
  isConnected: boolean;
  poolSize: number;
  activeConnections: number;
};

type DatabaseFactory<T extends DatabaseConnection> = {
  createConnection(config: ConnectionConfig): T;
  createPool(config: ConnectionConfig): ConnectionPool<T>;
};

// Enums for better type safety
enum DatabaseStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

enum QueryType {
  SELECT = 'SELECT',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

// Abstract base class for database connections
abstract class BaseConnection implements DatabaseConnection {
  protected status: DatabaseStatus = DatabaseStatus.DISCONNECTED;
  protected activeConnections: number = 0;
  
  constructor(
    protected readonly config: ConnectionConfig,
    protected readonly type: DatabaseType
  ) {}
  
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract query<T>(sql: string, params?: unknown[]): Promise<T[]>;
  
  public async transaction<T>(callback: (conn: DatabaseConnection) => Promise<T>): Promise<T> {
    await this.beginTransaction();
    try {
      const result = await callback(this);
      await this.commitTransaction();
      return result;
    } catch (error) {
      await this.rollbackTransaction();
      throw error;
    }
  }
  
  public getConnectionInfo(): ConnectionInfo {
    return {
      type: this.type,
      host: this.config.host,
      database: this.config.database,
      isConnected: this.status === DatabaseStatus.CONNECTED,
      poolSize: this.config.poolSize || 10,
      activeConnections: this.activeConnections
    };
  }
  
  protected abstract beginTransaction(): Promise<void>;
  protected abstract commitTransaction(): Promise<void>;
  protected abstract rollbackTransaction(): Promise<void>;
  
  protected validateConnection(): void {
    if (this.status !== DatabaseStatus.CONNECTED) {
      throw new Error(`Database connection is not established. Current status: ${this.status}`);
    }
  }
}

// Concrete PostgreSQL implementation
class PostgreSQLConnection extends BaseConnection {
  private client: any; // In real implementation, this would be pg.Client
  
  constructor(config: ConnectionConfig) {
    super(config, 'postgresql');
  }
  
  public async connect(): Promise<void> {
    try {
      this.status = DatabaseStatus.CONNECTING;
      // Simulate PostgreSQL connection
      this.client = {
        connected: true,
        query: async (sql: string, params?: unknown[]) => ({ rows: [] })
      };
      this.status = DatabaseStatus.CONNECTED;
      this.activeConnections++;
      console.log(`PostgreSQL connected to ${this.config.host}:${this.config.port}/${this.config.database}`);
    } catch (error) {
      this.status = DatabaseStatus.ERROR;
      throw new Error(`Failed to connect to PostgreSQL: ${error}`);
    }
  }
  
  public async disconnect(): Promise<void> {
    if (this.client?.connected) {
      this.client.connected = false;
      this.status = DatabaseStatus.DISCONNECTED;
      this.activeConnections--;
    }
  }
  
  public async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    this.validateConnection();
    try {
      const result = await this.client.query(sql, params);
      return result.rows as T[];
    } catch (error) {
      throw new Error(`PostgreSQL query failed: ${error}`);
    }
  }
  
  protected async beginTransaction(): Promise<void> {
    await this.query('BEGIN');
  }
  
  protected async commitTransaction(): Promise<void> {
    await this.query('COMMIT');
  }
  
  protected async rollbackTransaction(): Promise<void> {
    await this.query('ROLLBACK');
  }
}

// Concrete MySQL implementation
class MySQLConnection extends BaseConnection {
  private connection: any; // In real implementation, this would be mysql2.Connection
  
  constructor(config: ConnectionConfig) {
    super(config, 'mysql');
  }
  
  public async connect(): Promise<void> {
    try {
      this.status = DatabaseStatus.CONNECTING;
      // Simulate MySQL connection
      this.connection = {
        connected: true,
        execute: async (sql: string, params?: unknown[]) => ([[], {}])
      };
      this.status = DatabaseStatus.CONNECTED;
      this.activeConnections++;
      console.log(`MySQL connected to ${this.config.host}:${this.config.port}/${this.config.database}`);
    } catch (error) {
      this.status = DatabaseStatus.ERROR;
      throw new Error(`Failed to connect to MySQL: ${error}`);
    }
  }
  
  public async disconnect(): Promise<void> {
    if (this.connection?.connected) {
      this.connection.connected = false;
      this.status = DatabaseStatus.DISCONNECTED;
      this.activeConnections--;
    }
  }
  
  public async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    this.validateConnection();
    try {
      const [rows] = await this.connection.execute(sql, params);
      return rows as T[];
    } catch (error) {
      throw new Error(`MySQL query failed: ${error}`);
    }
  }
  
  protected async beginTransaction(): Promise<void> {
    await this.query('START TRANSACTION');
  }
  
  protected async commitTransaction(): Promise<void> {
    await this.query('COMMIT');
  }
  
  protected async rollbackTransaction(): Promise<void> {
    await this.query('ROLLBACK');
  }
}

// Concrete MongoDB implementation
class MongoDBConnection extends BaseConnection {
  private client: any; // In real implementation, this would be mongodb.MongoClient
  
  constructor(config: ConnectionConfig) {
    super(config, 'mongodb');
  }
  
  public async connect(): Promise<void> {
    try {
      this.status = DatabaseStatus.CONNECTING;
      // Simulate MongoDB connection
      this.client = {
        connected: true,
        db: () => ({
          collection: () => ({
            find: () => ({ toArray: async () => [] }),
            insertOne: async () => ({ insertedId: 'mockId' })
          })
        })
      };
      this.status = DatabaseStatus.CONNECTED;
      this.activeConnections++;
      console.log(`MongoDB connected to ${this.config.host}:${this.config.port}/${this.config.database}`);
    } catch (error) {
      this.status = DatabaseStatus.ERROR;
      throw new Error(`Failed to connect to MongoDB: ${error}`);
    }
  }
  
  public async disconnect(): Promise<void> {
    if (this.client?.connected) {
      this.client.connected = false;
      this.status = DatabaseStatus.DISCONNECTED;
      this.activeConnections--;
    }
  }
  
  public async query<T>(operation: string, params?: unknown[]): Promise<T[]> {
    this.validateConnection();
    try {
      // MongoDB uses different operations, so we simulate a query interface
      const db = this.client.db(this.config.database);
      const collection = db.collection('default');
      
      if (operation.includes('find')) {
        const result = await collection.find().toArray();
        return result as T[];
      }
      return [] as T[];
    } catch (error) {
      throw new Error(`MongoDB operation failed: ${error}`);
    }
  }
  
  protected async beginTransaction(): Promise<void> {
    // MongoDB transaction logic would go here
    console.log('MongoDB transaction started');
  }
  
  protected async commitTransaction(): Promise<void> {
    console.log('MongoDB transaction committed');
  }
  
  protected async rollbackTransaction(): Promise<void> {
    console.log('MongoDB transaction rolled back');
  }
}

// Connection Pool class
class ConnectionPool<T extends DatabaseConnection> {
  private pool: T[] = [];
  private usedConnections: Set<T> = new Set();
  
  constructor(
    private factory: DatabaseFactory<T>,
    private config: ConnectionConfig,
    private maxSize: number = 10
  ) {}
  
  public async getConnection(): Promise<T> {
    if (this.pool.length > 0) {
      const connection = this.pool.pop()!;
      this.usedConnections.add(connection);
      return connection;
    }
    
    if (this.usedConnections.size < this.maxSize) {
      const connection = this.factory.createConnection(this.config);
      await connection.connect();
      this.usedConnections.add(connection);
      return connection;
    }
    
    throw new Error('Connection pool exhausted');
  }
  
  public async releaseConnection(connection: T): Promise<void> {
    if (this.usedConnections.has(connection)) {
      this.usedConnections.delete(connection);
      this.pool.push(connection);
    }
  }
  
  public async closeAll(): Promise<void> {
    const allConnections = [...this.pool, ...this.usedConnections];
    await Promise.all(allConnections.map(conn => conn.disconnect()));
    this.pool = [];
    this.usedConnections.clear();
  }
}

// Factory classes
class PostgreSQLFactory implements DatabaseFactory<PostgreSQLConnection> {
  public createConnection(config: ConnectionConfig): PostgreSQLConnection {
    return new PostgreSQLConnection(config);
  }
  
  public createPool(config: ConnectionConfig): ConnectionPool<PostgreSQLConnection> {
    return new ConnectionPool(this, config, config.poolSize || 10);
  }
}

class MySQLFactory implements DatabaseFactory<MySQLConnection> {
  public createConnection(config: ConnectionConfig): MySQLConnection {
    return new MySQLConnection(config);
  }
  
  public createPool(config: ConnectionConfig): ConnectionPool<MySQLConnection> {
    return new ConnectionPool(this, config, config.poolSize || 10);
  }
}

class MongoDBFactory implements DatabaseFactory<MongoDBConnection> {
  public createConnection(config: ConnectionConfig): MongoDBConnection {
    return new MongoDBConnection(config);
  }
  
  public createPool(config: ConnectionConfig): ConnectionPool<MongoDBConnection> {
    return new ConnectionPool(this, config, config.poolSize || 10);
  }
}

// Main Database Factory
class DatabaseConnectionFactory {
  private static factories = new Map<DatabaseType, DatabaseFactory<any>>([
    ['postgresql', new PostgreSQLFactory()],
    ['mysql', new MySQLFactory()],
    ['mongodb', new MongoDBFactory()]
  ]);
  
  public static createConnection<T extends DatabaseConnection>(
    type: DatabaseType,
    config: ConnectionConfig
  ): T {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Unsupported database type: ${type}`);
    }
    return factory.createConnection(config) as T;
  }
  
  public static createPool<T extends DatabaseConnection>(
    type: DatabaseType,
    config: ConnectionConfig
  ): ConnectionPool<T> {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Unsupported database type: ${type}`);
    }
    return factory.createPool(config) as ConnectionPool<T>;
  }
  
  public static registerFactory<T extends DatabaseConnection>(
    type: DatabaseType,
    factory: DatabaseFactory<T>
  ): void {
    this.factories.set(type, factory);
  }
}

// Usage Examples
// Example 1: Basic Usage
const example1 = async () => {
  try {
    const config: ConnectionConfig = {
      host: 'localhost',
      port: 5432,
      database: 'myapp',
      username: 'user',
      password: 'password',
      poolSize: 5
    };
    
    const connection = DatabaseConnectionFactory.createConnection<PostgreSQLConnection>('postgresql', config);
    await connection.connect();
    
    const users = await connection.query<{id: number, name: string}>('SELECT * FROM users');
    console.log('Basic usage result:', users);
    
    await connection.disconnect();
  } catch (error) {
    console.error('Error in basic usage:', error);
  }
};

// Example 2: Advanced Usage with Connection Pool
const example2 = async () => {
  try {
    const config: ConnectionConfig = {
      host: 'localhost',
      port: 3306,
      database: 'ecommerce',
      username: 'admin',
      password: 'secret',
      poolSize: 10,
      timeout: 30000
    };
    
    const pool = DatabaseConnectionFactory.createPool<MySQLConnection>('mysql', config);
    
    // Simulate concurrent operations
    const operations = Array.from({ length: 5 }, async (_, i) => {
      const connection = await pool.getConnection();
      try {
        const result = await connection.transaction(async (conn) => {
          const products = await conn.query(`SELECT * FROM products WHERE category_id = ?`, [i + 1]);
          await conn.query(`UPDATE products SET last_accessed = NOW() WHERE category_id = ?`, [i + 1]);
          return products;
        });
        return result;
      } finally {
        await pool.releaseConnection(connection);
      }
    });
    
    const results = await Promise.all(operations);
    console.log('Advanced usage result:', results);
    
    await pool.closeAll();
  } catch (error) {
    console.error('Error in advanced usage:', error);
  }
};

// Example 3: Edge Cases and Error Handling
const example3 = async () => {
  try {
    const invalidConfig: ConnectionConfig = {
      host: 'invalid-host',
      port: 0,
      database: '',
      username: '',
      password: ''
    };
    
    // Test error handling for invalid configuration
    try {
      const connection = DatabaseConnectionFactory.createConnection<MongoDBConnection>('mongodb', invalidConfig);
      await connection.connect();
    } catch (error) {
      console.log('Expected error caught:', error.message);
    }
    
    // Test unsupported database type
    try {
      const connection = DatabaseConnectionFactory.createConnection('redis' as DatabaseType, invalidConfig);
    } catch (error) {
      console.log('Unsupported database error:', error.message);
    }
    
    // Test custom factory registration
    class RedisConnection implements DatabaseConnection {
      async connect() { console.log('Redis connected'); }
      async disconnect() { console.log('Redis disconnected'); }
      async query<T>(): Promise<T[]> { return [] as T[]; }
      async transaction<T>(callback: (conn: DatabaseConnection) => Promise<T>): Promise<T> {
        return callback(this);
      }
      getConnectionInfo(): ConnectionInfo {
        return {
          type: 'redis' as DatabaseType,
          host: 'localhost',
          database: 'redis',
          isConnected: true,
          poolSize: 1,
          activeConnections: 1
        };
      }
    }
    
    class RedisFactory implements DatabaseFactory<RedisConnection> {
      createConnection(config: ConnectionConfig): RedisConnection {
        return new RedisConnection();
      }
      createPool(config: ConnectionConfig): ConnectionPool<RedisConnection> {
        return new ConnectionPool(this, config);
      }
    }
    
    DatabaseConnectionFactory.registerFactory('redis' as DatabaseType, new RedisFactory());
    const redisConnection = DatabaseConnectionFactory.createConnection('redis' as DatabaseType, invalidConfig);
    await redisConnection.connect();
    await redisConnection.disconnect();
    
    console.log('Edge case handling completed successfully');
  } catch (error) {
    console.error('Error in edge case handling:', error);
  }
};

// Export for module usage
export {
  DatabaseConnection,
  ConnectionConfig,
  DatabaseType,
  ConnectionInfo,
  DatabaseFactory,
  DatabaseStatus,
  QueryType,
  BaseConnection,
  PostgreSQLConnection,
  MySQLConnection,
  MongoDBConnection,
  ConnectionPool,
  DatabaseConnectionFactory
};

// Run examples
if (require.main === module) {
  (async () => {
    await example1();
    await example2();
    await example3();
  })();
}
