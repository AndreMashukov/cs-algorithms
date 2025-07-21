# Factory Pattern - Database Connection Factory Questions

## Q1: What is the primary benefit of using the Factory Pattern for database connections in this implementation?
1. It improves database query performance by caching results
2. It encapsulates connection creation logic and enables easy switching between database types
3. It automatically handles database schema migrations
4. It provides built-in encryption for all database communications

## Q2: Why does the `DatabaseConnectionFactory` use a static Map to store factories instead of creating new factory instances each time?
1. To improve memory efficiency by reusing factory instances
2. To ensure thread safety in concurrent environments
3. To maintain a registry of available database types and avoid repeated instantiation overhead
4. To automatically load balance between different database instances

## Q3: What happens when you call `DatabaseConnectionFactory.createConnection()` with an unsupported database type?
1. It returns a default PostgreSQL connection
2. It throws an error with the message "Unsupported database type"
3. It creates a generic connection that works with any database
4. It automatically registers a new factory for that type

## Q4: In the `transaction` method of `BaseConnection`, why is the rollback called in the catch block?
1. To log the error details to the database
2. To ensure data consistency by undoing any partial changes made during the failed transaction
3. To automatically retry the transaction with different parameters
4. To close the database connection and prevent memory leaks

## Q5: How does the generic type constraint `<T extends DatabaseConnection>` in the factory interfaces help with type safety?
1. It prevents runtime errors by ensuring only valid database types are used
2. It ensures that factory methods return objects that implement the DatabaseConnection interface
3. It automatically converts between different database connection types
4. It provides compile-time optimization for database queries

## Q6: What is the purpose of the `ConnectionPool` class in this implementation?
1. To automatically backup database connections to prevent data loss
2. To distribute database load across multiple servers
3. To manage a reusable set of connections and prevent connection exhaustion
4. To encrypt database connections for security purposes

## Q7: Why does the `PostgreSQLConnection.query()` method call `this.validateConnection()` before executing the query?
1. To automatically reconnect if the connection was lost
2. To ensure the connection is established before attempting to execute the query
3. To log all queries for debugging purposes
4. To convert the query syntax to PostgreSQL-specific format

## Q8: What design principle allows new database types to be added without modifying existing factory code?
1. Dependency Injection principle
2. Open/Closed Principle - open for extension, closed for modification
3. Single Responsibility Principle
4. Interface Segregation Principle

## Q9: How does the `registerFactory` method enable runtime extensibility?
1. It allows dynamic loading of database drivers from external libraries
2. It enables registration of new database factory implementations at runtime without code changes
3. It automatically discovers available database types on the system
4. It provides hot-swapping of database connections during application runtime

## Q10: Why are the concrete connection classes (PostgreSQLConnection, MySQLConnection) extending `BaseConnection` rather than directly implementing `DatabaseConnection`?
1. To enforce a specific constructor signature across all implementations
2. To provide common functionality like transaction handling and connection validation while allowing database-specific implementations
3. To automatically handle connection pooling for all database types
4. To ensure all database connections use the same query syntax

## Q11: What happens in the `ConnectionPool.getConnection()` method when the pool is exhausted and maximum connections are reached?
1. It waits indefinitely until a connection becomes available
2. It creates a new connection anyway, ignoring the pool limit
3. It throws an error "Connection pool exhausted"
4. It automatically scales up the pool size

## Q12: Why does the `MongoDBConnection.query()` method have different parameter handling compared to SQL-based connections?
1. MongoDB uses a document-based query language instead of SQL syntax
2. MongoDB connections are inherently faster and need different optimization
3. MongoDB doesn't support parameterized queries
4. MongoDB requires special authentication for each query

## Q13: How does the factory pattern implementation handle database-specific transaction syntax differences?
1. It uses a universal transaction syntax that works across all databases
2. Each concrete connection class implements database-specific transaction methods (BEGIN vs START TRANSACTION)
3. It converts all transactions to stored procedures
4. It disables transactions for non-SQL databases

## Q14: What would happen if you tried to call `query()` on a disconnected connection?
1. It would automatically reconnect and execute the query
2. The `validateConnection()` method would throw an error about the connection status
3. It would queue the query until the connection is reestablished
4. It would return an empty result set

## Q15: Why does the implementation use TypeScript generics in the `query<T>()` method signature?
1. To improve query execution performance
2. To provide type safety for query results and enable proper IntelliSense support
3. To automatically validate query parameters
4. To enable automatic query result caching

## Q16: What is the advantage of having separate factory classes (PostgreSQLFactory, MySQLFactory) instead of one unified factory?
1. Better performance due to specialized implementations
2. Separation of concerns and easier maintenance of database-specific logic
3. Automatic failover between database types
4. Reduced memory usage for each database type

## Q17: How does the `ConnectionPool.releaseConnection()` method prevent connection leaks?
1. It automatically closes connections after a timeout period
2. It moves used connections back to the available pool for reuse
3. It validates connection integrity before releasing
4. It logs all connection usage for monitoring

## Q18: What role does the `DatabaseStatus` enum play in connection management?
1. It provides performance metrics for database operations
2. It tracks the current state of connections and enables proper error handling
3. It automatically optimizes query execution based on connection status
4. It enables automatic database failover capabilities

## Q19: Why is the constructor of concrete connection classes (like PostgreSQLConnection) calling `super(config, 'postgresql')`?
1. To register the connection with a global connection registry
2. To initialize the base class with configuration and database type information
3. To automatically establish the database connection
4. To enable connection pooling for that specific database type

## Q20: What happens during the `ConnectionPool.closeAll()` method execution?
1. It gracefully disconnects all connections in both the pool and active use
2. It only closes pooled connections, leaving active ones running
3. It forces immediate termination of all database operations
4. It transfers all connections to a backup pool for later use
