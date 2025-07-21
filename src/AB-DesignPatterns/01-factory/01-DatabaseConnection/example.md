# Factory Pattern - Database Connection Factory Example

## Overview
This example demonstrates how the Factory Pattern encapsulates database connection creation logic, enabling enterprise applications to work with multiple database types (PostgreSQL, MySQL, MongoDB) without tight coupling to specific implementations.

## Scenario
An e-commerce platform needs to support different database backends based on deployment environment. Development uses PostgreSQL, production uses MySQL for transactional data, and analytics uses MongoDB for document storage. The application needs to switch between these databases without code changes, manage connection pools efficiently, and provide consistent interfaces for all database operations.

## Step-by-Step Implementation

### Step 1: Interface Design
```typescript
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

type DatabaseFactory<T extends DatabaseConnection> = {
  createConnection(config: ConnectionConfig): T;
  createPool(config: ConnectionConfig): ConnectionPool<T>;
};
```

**Explanation:** The interfaces define contracts that all database implementations must follow. `DatabaseConnection` provides a unified API for database operations regardless of the underlying technology. `ConnectionConfig` standardizes configuration parameters across all database types. The generic `DatabaseFactory<T>` interface ensures type safety while allowing different factory implementations for each database type.

### Step 2: Abstract Base Class
```typescript
abstract class BaseConnection implements DatabaseConnection {
  protected status: DatabaseStatus = DatabaseStatus.DISCONNECTED;
  protected activeConnections: number = 0;
  
  constructor(
    protected readonly config: ConnectionConfig,
    protected readonly type: DatabaseType
  ) {}
  
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
  
  protected abstract beginTransaction(): Promise<void>;
  protected abstract commitTransaction(): Promise<void>;
  protected abstract rollbackTransaction(): Promise<void>;
}
```

**Explanation:** The abstract base class implements common functionality like transaction management and connection state tracking while defining abstract methods for database-specific operations. This follows the Template Method pattern, providing a consistent transaction interface while allowing each database to implement its specific transaction syntax (BEGIN vs START TRANSACTION).

### Step 3: Concrete Implementation
```typescript
class PostgreSQLConnection extends BaseConnection {
  private client: any; // pg.Client in real implementation
  
  constructor(config: ConnectionConfig) {
    super(config, 'postgresql');
  }
  
  public async connect(): Promise<void> {
    try {
      this.status = DatabaseStatus.CONNECTING;
      this.client = { connected: true, query: async (sql, params) => ({ rows: [] }) };
      this.status = DatabaseStatus.CONNECTED;
      this.activeConnections++;
    } catch (error) {
      this.status = DatabaseStatus.ERROR;
      throw new Error(`Failed to connect to PostgreSQL: ${error}`);
    }
  }
  
  protected async beginTransaction(): Promise<void> {
    await this.query('BEGIN');
  }
}
```

**Explanation:** Concrete implementations handle database-specific connection logic and query execution. Each implementation manages its own client library interface while providing the standardized DatabaseConnection interface. PostgreSQL uses "BEGIN" for transactions, while MySQL would use "START TRANSACTION", demonstrating how the pattern accommodates database-specific differences.

### Step 4: Factory Pattern Implementation
```typescript
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
  
  public static registerFactory<T extends DatabaseConnection>(
    type: DatabaseType,
    factory: DatabaseFactory<T>
  ): void {
    this.factories.set(type, factory);
  }
}
```

**Explanation:** The main factory maintains a registry of database-specific factories and provides a unified interface for creating connections. The static Map enables efficient factory lookup and the `registerFactory` method allows runtime extension with new database types. Generic constraints ensure type safety throughout the creation process.

### Step 5: Advanced Features - Connection Pooling
```typescript
class ConnectionPool<T extends DatabaseConnection> {
  private pool: T[] = [];
  private usedConnections: Set<T> = new Set();
  
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
}
```

**Explanation:** Connection pooling demonstrates advanced enterprise features that work seamlessly with the factory pattern. The pool manages connection lifecycle, prevents resource exhaustion, and provides efficient connection reuse. The generic design allows pools to work with any database type created by the factory.

## Execution Flow

### Scenario 1: Basic Database Connection Creation
1. Application calls `DatabaseConnectionFactory.createConnection('postgresql', config)`
2. Factory looks up PostgreSQL factory in the registry map
3. PostgreSQL factory creates a new `PostgreSQLConnection` instance
4. Connection is returned with compile-time type safety
5. Application calls `connect()` to establish the database connection
6. Application can now execute queries using the unified interface

**Code Flow:**
```typescript
const config = { host: 'localhost', port: 5432, database: 'myapp', username: 'user', password: 'pass' };
// 1. Factory lookup and creation
const connection = DatabaseConnectionFactory.createConnection<PostgreSQLConnection>('postgresql', config);
// 2. Connection establishment
await connection.connect();
// 3. Query execution with type safety
const users = await connection.query<{id: number, name: string}>('SELECT * FROM users');
```

### Scenario 2: Advanced Usage with Connection Pool and Transactions
1. Application creates a connection pool for MySQL database
2. Pool is initialized with factory reference and configuration
3. Multiple concurrent operations request connections from pool
4. Each operation uses transactions for data consistency
5. Connections are released back to pool after use
6. Pool manages connection lifecycle and prevents exhaustion

**Code Flow:**
```typescript
// 1. Pool creation with factory integration
const pool = DatabaseConnectionFactory.createPool<MySQLConnection>('mysql', config);

// 2. Concurrent operations using pool
const operations = Array.from({ length: 5 }, async (_, i) => {
  const connection = await pool.getConnection(); // Pool management
  try {
    const result = await connection.transaction(async (conn) => { // Transaction handling
      const products = await conn.query(`SELECT * FROM products WHERE category_id = ?`, [i + 1]);
      await conn.query(`UPDATE products SET last_accessed = NOW() WHERE category_id = ?`, [i + 1]);
      return products;
    });
    return result;
  } finally {
    await pool.releaseConnection(connection); // Resource cleanup
  }
});
```

## Benefits in This Use Case

- **Decoupling**: Application code is decoupled from specific database implementations, enabling easy switching between database types based on environment or requirements.

- **Consistency**: Unified interface provides consistent API across all database types, reducing learning curve and maintenance overhead.

- **Extensibility**: New database types can be added through factory registration without modifying existing code, supporting plugin-like architecture.

- **Type Safety**: TypeScript generics and interfaces provide compile-time type checking, preventing runtime errors and improving developer experience.

- **Enterprise Features**: Connection pooling, transaction management, and error handling work seamlessly across all database types.

## Common Pitfalls and Solutions

- **Pitfall:** Creating database connections directly in business logic
  **Solution:** Always use the factory to create connections, ensuring consistent configuration and enabling easy database switching.

- **Pitfall:** Not properly releasing connections from pools
  **Solution:** Use try/finally blocks or async resource management patterns to ensure connections are always returned to the pool.

- **Pitfall:** Ignoring database-specific transaction syntax
  **Solution:** Implement database-specific transaction methods in abstract base class, allowing each implementation to use appropriate syntax.

## Performance Considerations

Connection pooling significantly improves performance by reusing established connections rather than creating new ones for each request. The factory pattern adds minimal overhead while providing substantial benefits in maintainability and flexibility. Database-specific optimizations can be implemented in concrete classes without affecting the overall architecture.

## Testing Strategy

```typescript
// Mock factory for testing
class MockDatabaseFactory implements DatabaseFactory<MockConnection> {
  createConnection(config: ConnectionConfig): MockConnection {
    return new MockConnection(config);
  }
  
  createPool(config: ConnectionConfig): ConnectionPool<MockConnection> {
    return new ConnectionPool(this, config);
  }
}

// Register mock factory for tests
DatabaseConnectionFactory.registerFactory('mock' as DatabaseType, new MockDatabaseFactory());

// Test database operations without real database connections
const mockConnection = DatabaseConnectionFactory.createConnection('mock', testConfig);
```

## Integration with Other Patterns

The Factory Pattern integrates well with other enterprise patterns:

- **Repository Pattern**: Factories can create database-specific repositories that implement consistent data access interfaces
- **Dependency Injection**: Factories can be injected into services, enabling runtime configuration of database types
- **Observer Pattern**: Connection events can be published to observers for monitoring and logging
- **Strategy Pattern**: Different database optimization strategies can be applied based on the connection type created by the factory
