Problem: Google Docs - Answers

Q1: What is the most critical functional requirement for the collaborative editing feature?
1. Document version history
2. Real-time display of concurrent edits
3. Offline document access
4. User authentication and authorization

**Answer: 2**
**Explanation:** The core of a collaborative editing system like Google Docs is the ability for multiple users to edit a document simultaneously and see each other's changes as they happen. This is the most critical feature that defines the product.
**Reference:** The "Multi-user Collaborative Editing" section explicitly states this as a core requirement.

---

Q2: Based on the scale requirements (1 million DAU, 10:1 read-to-write ratio), how many write operations per second should the system handle at peak (5x traffic)?
1. ~58 writes/sec
2. ~580 writes/sec
3. ~116 writes/sec
4. ~1160 writes/sec

**Answer: 1**
**Explanation:** Calculation: (1,000,000 DAU / (24 hours * 60 min * 60 sec)) * (1/11 writes) * 5 (peak) ≈ 57.9 writes/sec. The total requests per second is ~11.6 req/sec. With a 10:1 read-to-write ratio, there is 1 write for every 11 requests. Peak traffic is 5x the average.
**Reference:** The "Scale Requirements" section provides the numbers for this calculation.

---

Q3: Why is a relational database chosen for storing document metadata?
1. Because it is cheaper than NoSQL databases for large datasets.
2. To ensure transactional consistency for metadata operations and support complex queries.
3. Because it is easier to scale horizontally.
4. To store unstructured JSON data natively.

**Answer: 2**
**Explanation:** Document metadata, such as permissions and titles, requires strong consistency and the ability to perform complex queries (e.g., finding all documents a user can edit). Relational databases provide ACID-compliant transactions and are optimized for such structured data and queries.
**Reference:** The "Document Metadata" section details the reasoning for choosing a relational database.

---

Q4: What is the primary reason for using a separate WebSocket Service instead of integrating WebSocket handling into the main Document Service?
1. To reduce the number of database connections.
2. To allow the Document Service to remain stateless and separate concerns.
3. To make the client-side code simpler.
4. To bypass the need for a load balancer.

**Answer: 2**
**Explanation:** Separating the WebSocket Service allows the Document Service to be a stateless component focused solely on business logic (processing and persisting edits). This separation of concerns improves scalability, maintainability, and allows each service to be scaled independently.
**Reference:** The "High Level Design" section explains the rationale for separating these services.

---

Q5: Which communication protocol is most suitable for real-time collaborative editing and why?
1. HTTP Polling, because it is simple to implement and supported by all browsers.
2. Server-Sent Events (SSE), because it allows the server to push updates to the client efficiently.
3. WebSocket, because it provides a persistent, bidirectional communication channel.
4. HTTP/2, because it supports multiplexing and server push.

**Answer: 3**
**Explanation:** WebSocket is the best choice because it establishes a persistent, low-latency, bidirectional communication channel between the client and server. This allows for true real-time interaction, where both the client can send edits and the server can push updates without the overhead of repeated HTTP requests.
**Reference:** The "Synchronization Protocol Options" section compares different protocols and concludes WebSocket is the most suitable.

---

Q6: In the context of collaborative editing, what is the main purpose of Operational Transformation (OT)?
1. To reduce the latency of edit propagation.
2. To ensure all users see a consistent, final document state by transforming conflicting operations.
3. To encrypt the document content during transit.
4. To replace the need for a central server.

**Answer: 2**
**Explanation:** The core purpose of OT is to resolve conflicts in a way that preserves the intent of all users' edits. It transforms operations based on others that have occurred concurrently, ensuring that all clients eventually converge to the identical document state.
**Reference:** The "Operational Transformation" section provides a detailed explanation and example of this concept.

---

Q7: What is a significant drawback of the Last-Write-Wins (LWW) conflict resolution strategy?
1. It is computationally expensive.
2. It requires a complex server-side implementation.
3. It can lead to lost updates when users edit the same region concurrently.
4. It only works with plain text documents.

**Answer: 3**
**Explanation:** LWW is simple but prone to data loss. If two users edit the same part of a document, the edit that arrives last will overwrite the other, effectively losing the first user's changes without any merging or resolution.
**Reference:** The "Last-Write-Wins" section explicitly lists "Can lead to lost updates" as a major con.

---

Q8: How does the system design support the "Read-Your-Writes" consistency model?
1. By using a globally distributed database.
2. The WebSocket service immediately broadcasts the change back to all clients, including the sender.
3. By implementing a strong consistency model in the database.
4. By using a client-side cache.

**Answer: 2**
**Explanation:** When a client sends an edit, the WebSocket service broadcasts the confirmed operation to all connected clients, including the original sender. This ensures that users immediately see their own changes reflected in their view, satisfying the Read-Your-Writes consistency model.
**Reference:** The "High Level Design" data flow shows the broadcast step going back to all clients.

---

Q9: What is the role of the Message Queue (e.g., Kafka) in the high-level architecture?
1. To store the document content permanently.
2. To handle user authentication requests.
3. To decouple the WebSocket Service from the Document Service, improving reliability.
4. To serve as the primary database for the system.

**Answer: 3**
**Explanation:** The message queue acts as a buffer between the WebSocket Service and the Document Service. This decoupling ensures that the WebSocket Service can quickly accept edits even if the Document Service is slow or temporarily unavailable, thus improving the system's overall availability and reliability.
**Reference:** The "High Level Design" section describes the use of a message queue for decoupling.

---

Q10: Why is a flat URL structure (e.g., /document/d/{documentId}) preferred over a hierarchical one for this system?
1. It is more secure and prevents unauthorized access.
2. It is required by modern web browsers.
3. It simplifies sharing and avoids exposing internal folder structures.
4. It improves the SEO ranking of the documents.

**Answer: 3**
**Explanation:** A flat URL is easier for users to share and does not expose the potentially private folder structure of the document's owner. This is crucial for a collaborative tool where documents are frequently shared with external users.
**Reference:** The "File URL structure" section explains the reasoning behind using a flat URL structure.

---

Q11: According to the proposed document content structure, what is a `TextRun`?
1. An entire paragraph of text.
2. A contiguous string of text with the same styling.
3. A special character, like a page break.
4. A container for images and other media.

**Answer: 2**
**Explanation:** A `TextRun` is the most granular element for styled text. It represents a piece of text where all characters share the exact same formatting (e.g., bold, italic, color). A single paragraph can be composed of multiple `TextRun` objects.
**Reference:** The "How to Represent Document Content?" section defines the `TextRun` object.

---

Q12: If two users simultaneously insert text at the same position, how does Operational Transformation (OT) handle the conflict?
1. It rejects the second operation to arrive.
2. It merges the two text insertions, with the final order determined by timestamps.
3. It transforms the position of the second operation based on the first, preserving both edits.
4. It asks the users to manually resolve the conflict.

**Answer: 3**
**Explanation:** OT is designed to preserve the intent of all edits. When two insertions occur at the same position, it applies the first one, then transforms the position of the second operation to be after the first insertion, ensuring both texts are added to the document.
**Reference:** The example in the "Operational Transformation" section illustrates this exact scenario.

---

Q13: What is a major scalability concern with Operational Transformation (OT)?
1. The transformation functions can become computationally expensive with many concurrent users.
2. It requires a large amount of memory to store the operations.
3. It is not compatible with modern programming languages.
4. It can only handle a limited number of document types.

**Answer: 1**
**Explanation:** As the number of concurrent users and the frequency of edits increase, the complexity of transforming operations against each other grows. This can lead to high CPU usage on the server, creating a potential performance bottleneck.
**Reference:** The "Operational Transformation" section lists this as a potential scalability limitation.

---

Q14: For the API endpoint `POST /api/documents/{documentId}/operations`, why does it accept an array of operations?
1. To allow for bulk updates and reduce the number of network requests.
2. To make the API endpoint more RESTful.
3. To handle different types of documents.
4. To support both XML and JSON formats.

**Answer: 1**
**Explanation:** Accepting an array of operations allows the client to batch multiple changes (e.g., typing several characters, applying a style, and inserting an image) into a single API call. This is more efficient as it reduces network overhead.
**Reference:** The `API Endpoints` section shows the request body with an array of operations.

---

Q15: What is the primary benefit of storing document content in a cloud object storage service like AWS S3?
1. It provides strong transactional guarantees for content updates.
2. It is optimized for high throughput, scalability, and cost-effective storage of large, unstructured data.
3. It allows for complex SQL queries on the document content.
4. It has lower latency than a relational database for small files.

**Answer: 2**
**Explanation:** Cloud object storage is specifically designed to handle large volumes of unstructured data like document content. It offers high durability, availability, and scalability at a lower cost than block storage or databases, making it ideal for this purpose.
**Reference:** The "Document Content" section explains the choice of cloud object storage.

---

Q16: How can the system prevent server overload from a single user sending an extremely high frequency of edits?
1. By blocking the user's IP address.
2. By implementing rate limiting on the WebSocket connection or API endpoints.
3. By charging the user for excessive usage.
4. By automatically merging the user's edits into a single operation.

**Answer: 2**
**Explanation:** Rate limiting is a standard technique to protect a service from being overwhelmed by too many requests from a single client in a short period. It's a fair and effective way to ensure service stability for all users.
**Reference:** This is a standard system design pattern for preventing abuse and ensuring stability, as mentioned in the "How to prevent server overload" deep dive question.

---

Q17: In the database schema, what is the purpose of the `Permissions` table?
1. To store the document content.
2. To manage the relationship between users, documents, and their access roles (e.g., editor, viewer).
3. To store the version history of the documents.
4. To cache frequently accessed documents.

**Answer: 2**
**Explanation:** The `Permissions` table acts as a join table, linking users to documents and defining their level of access (e.g., owner, editor, viewer). This is a standard way to implement role-based access control in a relational database.
**Reference:** The Database Schema Diagram shows the `Permissions` table connecting `Users` and `Documents`.

---

Q18: If the Document Service fails while processing an edit from the message queue, what happens to the edit?
1. The edit is lost and the user must re-submit it.
2. The WebSocket Service attempts to process the edit itself.
3. The message remains in the queue and will be re-processed by another Document Service instance or when the service recovers.
4. The client is immediately notified of the failure.

**Answer: 3**
**Explanation:** A key benefit of using a message queue like Kafka is message persistence. If a consumer fails to process a message, the message is not deleted from the queue and can be picked up by another consumer, ensuring that no data is lost.
**Reference:** This is a fundamental property of message queues, as described in the "High Level Design" section.

---

Q19: What is a suitable strategy for implementing document version history that balances storage and retrieval speed?
1. Storing a complete snapshot of the document for every single change.
2. Storing only the deltas (changes) from the original version.
3. A hybrid approach: storing periodic snapshots and the deltas between them.
4. Storing all versions in the relational database.

**Answer: 3**
**Explanation:** The hybrid approach offers a good compromise. Storing periodic snapshots makes reconstructing a recent version fast, while storing deltas between snapshots is much more storage-efficient than keeping full copies of every version.
**Reference:** The "How to implement document version history?" deep dive section recommends the hybrid approach.

---

Q20: Why is eventual consistency an acceptable trade-off for this system?
1. Because real-time collaboration does not require any consistency.
2. Because users do not expect to see others' changes immediately.
3. It allows for higher availability and lower latency, and OT ensures all users converge to the same state.
4. Because strong consistency is impossible to achieve in a distributed system.

**Answer: 3**
**Explanation:** Eventual consistency is acceptable because while there might be a brief delay for changes to propagate, the system is designed to ensure all users eventually see the same correct state. This model is chosen to achieve the low latency and high availability required for a good user experience, with OT guaranteeing convergence.
**Reference:** The "Non-Functional Requirements" section lists Eventual Consistency as a requirement.
