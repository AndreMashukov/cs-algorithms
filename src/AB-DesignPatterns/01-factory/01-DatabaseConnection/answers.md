# Factory Pattern - Database Connection Factory Answers

## Q1: 2
The Factory Pattern encapsulates the object creation logic, allowing the application to request database connections without knowing the specific implementation details. This enables easy switching between database types (PostgreSQL, MySQL, MongoDB) based on configuration while maintaining loose coupling between the client code and concrete database implementations.

## Q2: 3
The static Map maintains a registry of available database types and avoids the overhead of repeatedly instantiating factory objects. Since factories are typically stateless and reusable, storing them in a registry provides efficient access while allowing runtime registration of new database types through the `registerFactory` method.

## Q3: 2
The `createConnection` method checks if a factory exists for the given database type using `this.factories.get(type)`. If no factory is found, it throws an error with the message "Unsupported database type: {type}", ensuring that invalid database types are caught early rather than failing silently.

## Q4: 2
The rollback operation in the catch block ensures data consistency by undoing any partial changes that were made during the transaction before the error occurred. This prevents the database from being left in an inconsistent state when a transaction fails partway through execution.

## Q5: 2
The generic constraint `<T extends DatabaseConnection>` ensures that factory methods can only return objects that implement the DatabaseConnection interface. This provides compile-time type safety, ensuring that all created connections have the required methods (connect, disconnect, query, transaction) and proper type checking.

## Q6: 3
The ConnectionPool manages a reusable set of database connections to prevent connection exhaustion and improve performance. Instead of creating new connections for every request, it maintains a pool of active connections that can be borrowed and returned, reducing the overhead of connection establishment and preventing resource exhaustion.

## Q7: 2
The `validateConnection()` method checks if the connection status is CONNECTED before attempting to execute queries. This prevents runtime errors that would occur if queries were attempted on disconnected or failed connections, providing clear error messages about the connection state.

## Q8: 2
The Open/Closed Principle allows the system to be open for extension (new database types can be added by creating new factory implementations) while being closed for modification (existing factory code doesn't need to change). New database types are added through the `registerFactory` method without modifying core factory logic.

## Q9: 2
The `registerFactory` method allows new database factory implementations to be registered at runtime without requiring code changes to the main factory class. This enables dynamic extensibility where new database types can be added by simply registering their factories, supporting plugin-like architecture.

## Q10: 2
Extending `BaseConnection` provides common functionality like transaction handling, connection validation, and connection info management while allowing each database type to implement database-specific connection logic. This follows the Template Method pattern, reducing code duplication while maintaining flexibility for database-specific implementations.

## Q11: 3
When the connection pool is exhausted (all connections are in use) and the maximum number of connections is reached, the `getConnection()` method throws an error "Connection pool exhausted". This prevents the application from creating unlimited connections that could overwhelm the database server.

## Q12: 1
MongoDB uses a document-based query language and operations (like find, insertOne) instead of SQL syntax. The MongoDBConnection class adapts the SQL-like query interface to MongoDB's document operations, simulating SQL queries with MongoDB's native operations while maintaining the same interface contract.

## Q13: 2
Each concrete connection class implements database-specific transaction methods in the protected abstract methods (`beginTransaction`, `commitTransaction`, `rollbackTransaction`). PostgreSQL uses "BEGIN", MySQL uses "START TRANSACTION", and MongoDB has its own transaction syntax, allowing each implementation to use the appropriate syntax for their database.

## Q14: 2
The `query()` method calls `validateConnection()` which checks if the connection status is CONNECTED. If the connection is not established, it throws an error with a descriptive message about the current connection status, preventing silent failures and providing clear debugging information.

## Q15: 2
TypeScript generics in `query<T>()` provide type safety for query results, allowing developers to specify the expected return type and get proper IntelliSense support. This enables compile-time type checking of query results and better developer experience with autocomplete and type validation.

## Q16: 2
Separate factory classes follow the Single Responsibility Principle, where each factory is responsible for creating connections for one specific database type. This makes the code easier to maintain, test, and extend, as database-specific logic is isolated in dedicated factories rather than mixed in a single large factory class.

## Q17: 2
The `releaseConnection()` method moves connections from the `usedConnections` set back to the available `pool` array, making them available for reuse. This prevents connection leaks by ensuring that borrowed connections are properly returned to the pool rather than being lost or held indefinitely.

## Q18: 2
The `DatabaseStatus` enum tracks connection states (DISCONNECTED, CONNECTING, CONNECTED, ERROR) enabling proper error handling and connection management. It allows the system to provide meaningful error messages, prevent operations on invalid connections, and manage connection lifecycle effectively.

## Q19: 2
The `super()` call initializes the `BaseConnection` parent class with the configuration object and database type. This sets up common properties and behavior that all database connections share, while allowing the concrete class to add database-specific implementation details.

## Q20: 1
The `closeAll()` method retrieves all connections from both the available pool and the set of used connections, then calls `disconnect()` on each one using `Promise.all()`. This ensures that all connections are properly closed regardless of their current state, preventing resource leaks when shutting down the connection pool.
