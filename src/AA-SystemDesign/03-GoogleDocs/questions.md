Problem: Google Docs

Q1: What is the most critical functional requirement for the collaborative editing feature?
1. Document version history
2. Real-time display of concurrent edits
3. Offline document access
4. User authentication and authorization

Q2: Based on the scale requirements (1 million DAU, 10:1 read-to-write ratio),
 how many write operations per second should the system handle at peak (5x traffic)?
1. ~58 writes/sec
2. ~580 writes/sec
3. ~116 writes/sec
4. ~1160 writes/sec

Q3: Why is a relational database chosen for storing document metadata?
1. Because it is cheaper than NoSQL databases for large datasets.
2. To ensure transactional consistency for metadata operations 
and support complex queries.
3. Because it is easier to scale horizontally.
4. To store unstructured JSON data natively.

Q4: What is the primary reason for using a separate WebSocket Service instead 
of integrating WebSocket handling into the main Document Service?
1. To reduce the number of database connections.
2. To allow the Document Service to remain stateless and separate concerns.
3. To make the client-side code simpler.
4. To bypass the need for a load balancer.

Q5: Which communication protocol is most suitable for real-time collaborative editing 
and why?
1. HTTP Polling, because it is simple to implement and supported by all browsers.
2. Server-Sent Events (SSE), because it allows the server to push updates to the client efficiently.
3. WebSocket, because it provides a persistent, bidirectional communication channel.
4. HTTP/2, because it supports multiplexing and server push.

Q6: In the context of collaborative editing, what is the main purpose 
of Operational Transformation (OT)?
1. To reduce the latency of edit propagation.
2. To ensure all users see a consistent, final document state by transforming conflicting operations.
3. To encrypt the document content during transit.
4. To replace the need for a central server.

Q7: What is a significant drawback of the Last-Write-Wins (LWW) conflict resolution strategy?
1. It is computationally expensive.
2. It requires a complex server-side implementation.
3. It can lead to lost updates when users edit the same region concurrently.
4. It only works with plain text documents.

Q8: How does the system design support the "Read-Your-Writes" consistency model?
1. By using a globally distributed database.
2. The WebSocket service immediately broadcasts the change back to all clients, including the sender.
3. By implementing a strong consistency model in the database.
4. By using a client-side cache.

Q9: What is the role of the Message Queue (e.g., Kafka) in the high-level architecture?
1. To store the document content permanently.
2. To handle user authentication requests.
3. To decouple the WebSocket Service from the Document Service, improving reliability.
4. To serve as the primary database for the system.

Q10: Why is a flat URL structure (e.g., /document/d/{documentId}) preferred over a hierarchical one for this system?
1. It is more secure and prevents unauthorized access.
2. It is required by modern web browsers.
3. It simplifies sharing and avoids exposing internal folder structures.
4. It improves the SEO ranking of the documents.

Q11: According to the proposed document content structure, what is a `TextRun`?
1. An entire paragraph of text.
2. A contiguous string of text with the same styling.
3. A special character, like a page break.
4. A container for images and other media.

Q12: If two users simultaneously insert text at the same position, how does Operational Transformation (OT) handle the conflict?
1. It rejects the second operation to arrive.
2. It merges the two text insertions, with the final order determined by timestamps.
3. It transforms the position of the second operation based on the first, preserving both edits.
4. It asks the users to manually resolve the conflict.

Q13: What is a major scalability concern with Operational Transformation (OT)?
1. The transformation functions can become computationally expensive with many concurrent users.
2. It requires a large amount of memory to store the operations.
3. It is not compatible with modern programming languages.
4. It can only handle a limited number of document types.

Q14: For the API endpoint `POST /api/documents/{documentId}/operations`, why does it accept an array of operations?
1. To allow for bulk updates and reduce the number of network requests.
2. To make the API endpoint more RESTful.
3. To handle different types of documents.
4. To support both XML and JSON formats.

Q15: What is the primary benefit of storing document content in a cloud object storage service like AWS S3?
1. It provides strong transactional guarantees for content updates.
2. It is optimized for high throughput, scalability, and cost-effective storage of large, unstructured data.
3. It allows for complex SQL queries on the document content.
4. It has lower latency than a relational database for small files.

Q16: How can the system prevent server overload from a single user sending an extremely high frequency of edits?
1. By blocking the user's IP address.
2. By implementing rate limiting on the WebSocket connection or API endpoints.
3. By charging the user for excessive usage.
4. By automatically merging the user's edits into a single operation.

Q17: In the database schema, what is the purpose of the `Permissions` table?
1. To store the document content.
2. To manage the relationship between users, documents, and their access roles (e.g., editor, viewer).
3. To store the version history of the documents.
4. To cache frequently accessed documents.

Q18: If the Document Service fails while processing an edit from the message queue, what happens to the edit?
1. The edit is lost and the user must re-submit it.
2. The WebSocket Service attempts to process the edit itself.
3. The message remains in the queue and will be re-processed by another Document Service instance or when the service recovers.
4. The client is immediately notified of the failure.

Q19: What is a suitable strategy for implementing document version history that balances storage and retrieval speed?
1. Storing a complete snapshot of the document for every single change.
2. Storing only the deltas (changes) from the original version.
3. A hybrid approach: storing periodic snapshots and the deltas between them.
4. Storing all versions in the relational database.

Q20: Why is eventual consistency an acceptable trade-off for this system?
1. Because real-time collaboration does not require any consistency.
2. Because users do not expect to see others' changes immediately.
3. It allows for higher availability and lower latency, and OT ensures all users converge to the same state.
4. Because strong consistency is impossible to achieve in a distributed system.
