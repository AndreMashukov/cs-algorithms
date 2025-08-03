Introduction
How to Answer ▼
Functional Requirements
How to Answer ▼
Core Requirements
Single User Editing: Single-user CRUD Operations in the Browser: Users can create, read, update, and delete documents directly in their web browser.

Multi-user Collaborative Editing: Users should be able to edit the same document concurrently and view each other's changes in real-time.

Out of Scope
Authentication and authorization
Document versioning and history
Document sharing and permissions management
Document comments and annotations
Document offline access
Scale Requirements
DAU: 1 million.
Traffic Spike: 5x during peak hours
Read to write ratio: 10:1
Average Document Size: 100KB. Assume each user has an average of 10 documents.
Edit Frequency: 1 edit per second per document during peak hours
Allow up to 100 concurrent users per document

System Design Problems
Work through common interview questions step-by-step with personalized feedback.
Try It Yourself
Non-Functional Requirements
How to Answer ▼
High availability: The system must be accessible at all times, minimizing downtime to ensure continuous collaboration.
Low latency: End-to-end latency should be under 200 milliseconds.
Eventual Consistency: All users should eventually see the same document state, even if edits arrive at different times.
Read-Your-Writes Consistency: Users should see their own edits immediately to confirm their changes have been registered.
API Endpoints
POST /api/documents
Create a new document

Request Body:

{
  "title": "My Document"
}
Response Body:

{
  "documentId": "doc-123",
  "title": "My Document"
}
GET /api/documents/{documentId}
Retrieve a document by ID

Response Body:

{
  "documentId": "doc-123",
  "title": "My Document",
  "content": "Document content"
}
PUT /api/documents/{documentId}
Update document metadata or content

Request Body:

{
  "title": "Updated Title",
  "content": "Updated content"
}
Response Body:

{
  "documentId": "doc-123",
  "title": "Updated Title"
}
POST /api/documents/{documentId}/operations
Apply editing operations to a document

Request Body:

{
  "operations": [
    {
      "type": "insert",
      "position": 10,
      "text": "new text"
    }
  ]
}
Response Body:

{
  "status": "success"
}
WS /api/documents/{documentId}/collaborate
WebSocket endpoint for real-time collaboration. After connection is established, messages are exchanged in both directions using the WebSocket protocol.

Example message from server: { "type": "operation", "userId": "user-789", "operation": { "type": "insert", "position": 10, "text": "new text" } }

Example message from client: { "type": "operation", "operation": { "type": "insert", "position": 15, "text": "client text" } }

Response Body:

Connection established
High Level Design
How to Answer ▼
1. Single User Editing
Single-user CRUD Operations in the Browser: Users can create, read, update, and delete documents directly in their web browser.

First, let's understand how file URLs are structured for a cloud editing tool.

File URL structure
In a typical operating system, a hierarchical file system is used. For example, on macOS, the URL structure is like this:

~/Documents/my-document.txt
~/Downloads/my-document.txt
~/Desktop/my-document.txt
In a typical cloud storage system, the URL structure is like this:

https://s3.amazonaws.com/bucket-name/user-id/document-id
However, in our collaborative editing system, we do not want a hierarchical URL structure because:

The file is meant to be shared with others, so we do not want to expose the folder structure to other users.
A long URL with folder structure is hard to type and share.
Therefore, we should use a flat structure. For example:

Google Docs: https://docs.google.com/document/d/1Ss4s93AGpdksZp1X3Gjzy717LCv8xY49G_PewUwmZ5A
Notion: https://www.notion.so/6b8b4565327b4c52b0bf765434a1210d
How to generate the document ID?
We want an ID that is:

Globally Unique: The ID should be unique across the entire system. No two documents should have the same ID ever.
Short: Ideally, the ID should be short because it needs to be part of the URL. However, this is not a hard requirement.
Let's take a look at what Google Docs and Notion do.

Google Docs: https://docs.google.com/document/d/1Ss4s93AGpdksZp1X3Gjzy717LCv8xY49G_PewUwmZ5A. Google Docs' ID is alphanumeric without strict formatting rules (like JWT or MD5).
Notion: https://www.notion.so/6b8b4565327b4c52b0bf765434a1210d. Notion's ID is a MD5 hash of the document name.
Refer to Unique ID Generation section of for more details.

How to Store Documents?
For a document, we need to store both the document metadata and the document content.

Document Metadata
The document metadata includes:

Document title, author, permissions, creation and last modified timestamps.
Access control data (e.g., roles like owner, editor, viewer).
Versioning pointers, references to document snapshots, and other attributes.
The metadata is typicall small and structured, and the typical queries we need to fulfill are:

Fast queries and filtering: For example, we may want to query all documents created by a specific user or retrieve documents that a user has permission to edit.
Data Integrity: We want to make sure the metadata is consistent and correct. For example, the relationship between users, documents, and permissions should be strictly enforced.
Transactional Consistency: Operations like adding or updating metadata (e.g., changing permissions or titles) should be atomic.
Based on the above requirements, we should use a relational database to store the document metadata because:

It has strong consistency and ACID-compliant transactions.
Relational databases are optimized for fast complex queries, making it easy for filtering and sorting.
The constraints that comes with relational databases make it difficult to insert incorrect data and therefore ensure data integrity.
Document Content
Document content tends to be larger and less structured than metadata, especially for text documents, images, and other rich media. Additionally, the system may need to store multiple snapshots or versions of the content for version history, which increases storage needs over time.

Cloud object storage services (e.g., AWS S3, Google Cloud Storage) are designed to handle massive amounts of unstructured data. They are optimized for high throughput, scalability, and durability. They are also cost effective for large amounts of data. Therefore, we should use a cloud object storage service to store the document content.

Check out this video on File vs Object Storage if you need more details.

Here's design diagram for single-user CRUD operations-storing the document metadata in a relational database and storing the document content in a cloud storage service:

Google Docs System Design - Document CRUD

How to Represent Document Content?
First, let's take a look at the requirements for the document content:

The document content is a rich text document, which means it contains formatting information like bold, italic, underline, etc.
The document content may also contain media like images, videos, bullet points, etc.
Users need to be able to edit the document content in high granularity.
Support bulk editing of the document content, like deleting a paragraph or replacing all the text with a new text.
Let's take a look at Google Docs's official document structure. Google Docs represents the document content as a tree of objects.

The top level structure is a document object, which contains:

document: {
  title: String,
  documentId: String,
  body: Body
}
The body is an array of StructuralElement objects. Each StructuralElement object can be a Paragraph, Table, Equation, etc.

Body
└── StructuralElement[]
    ├── Paragraph
    │   ├── ParagraphStyle (formatting)
    │   ├── Bullet (if part of list)
    │   └── ParagraphElement[]
    │       ├── TextRun (text with same styling)
    │       ├── AutoText (dynamic content like page numbers)
    │       ├── PageBreak
    │       ├── ColumnBreak
    │       └── Equation
    ├── Table
    ├── TableOfContents
    └── SectionBreak
A Paragraph object contains an array of ParagraphElement objects. Each ParagraphElement object contains a TextRun object, which contains the text and its formatting.

A TextRun is a type of ParagraphElement that represents a contiguous string of text with all the same text style. A paragraph can contain multiple text runs but text runs never cross paragraph boundaries. Contents are split after a newline character to form separate text runs.

Google Docs System Design - Document Structure

For example, the following document:

Hello World! This is a simple *italic text* document.
- First bullet item
- Second bullet item
Goodbye World!
Would be represented as:

Paragraph
└── TextRun ("Hello World! This is a simple ")
└── TextRun (Italic): ("italic text")
└── TextRun ("document.")
Paragraph
└── Bullet ("-")
└── TextRun ("First bullet item")
Paragraph
└── Bullet ("-")
└── TextRun ("Second bullet item")
Paragraph
└── TextRun ("Goodbye World!")
This structure fulfills the requirements:

The document elements are represented as a tree of objects, which allows for rich formatting and complex document structures at node level.
Editing is granular at the text run level, which allows for high granularity editing.
Bulk editing can be done by selecting a range of objects.
Additionally, this structure also enables collaboration features like real-time collaboration and version history. We will discuss this in the next section.

2. Multi-user Collaborative Editing
Users should be able to edit the same document concurrently and view each other's changes in real-time.

Synchronizing Document State
To support multi-user collaborative editing, we need to solve the following problems:

How to synchronize the document state for different users?
How to handle conflicts when multiple users edit the same document?
First, let's assume there is no conflict in editing between different users. Imagine different users are editing different parts of the document independently, and we only need to synchronize the part edited by each user to other users. Let's compare our options for synchronizing the document state for different users.

Synchronization Protocol Options
HTTP Polling
WebSocket
Server-Sent Events (SSE)
HTTP Polling
Not Suitable
Client periodically requests updates from server

How it works:
The client sends regular HTTP requests to the server at fixed intervals to check for updates. If there are changes, the server responds with the latest document state.

Pros:
Simple to implement
Works with standard HTTP infrastructure
Supported by all browsers
Cons:
High latency: Updates are delayed until next poll
Server overhead: Many requests may return no changes
Bandwidth intensive: Full headers sent with each request
Conclusion:
Not suitable for real-time collaboration due to high latency and server overhead.

Websocket is the best option for our system because it supports bidirectional communication and is suitable for real-time collaborative editing.

We want to add a Websocket Service in front of Document Service to support bidirectional communication. We could include the websocket service in Document Service, but it would be better to have a separate service because to separate the concerns of document storage and document synchronization and to make the Document Service stateless.

Additionally, we want to add a Message Queue between Document Service and Websocket Service to decouple them and to improve the availability and reliability of the Document Service. This is the classic system design template for large scale system design we have been using throughout our courses.

Here's the updated design diagram:

Google Docs System Design Diagram

Here's how it works:

Client 1 Sends Edit: Client 1 sends an edit to the WebSocket Service over its WebSocket connection. We don't need to send the entire document. We can save space and send only the edits, similar to how Git works.
WebSocket Service Adds Edit to Queue: The WebSocket Service places the edit in the message broker queue (e.g., Kafka, RabbitMQ, or Redis Pub/Sub). This decoupling allows the WebSocket Service to quickly move on to handling other incoming messages.
Document Service Consumes Edit: The Document Service, acting as a consumer, reads the edit from the queue.
Document Service Processes and Persists Edit: The Document Service validates, processes, and persists the edit in the database.
Notify WebSocket Service: After updating the database, the Document Service can either:
Notify the WebSocket Service (possibly through the queue) that the update is complete.
Optionally, send the updated document state to the WebSocket Service for broadcasting.
WebSocket Service Broadcasts Update: Upon receiving the update or confirmation, the WebSocket Service broadcasts the updated state to all connected clients, including Client 1, Client 2.
Handling conflicts
Last-Write-Wins
First, let's keep it simple and use the Last-Write-Wins strategy. In this approach, each edit is timestamped, and when conflicts occur, the edit with the latest timestamp is chosen as the winner.

Here's an example:

Initial document state: "Hello World"
User A starts editing at position 6 at timestamp 100
User B starts editing at position 6 at timestamp 101
User A sends edit: insert " beautiful" → "Hello beautiful World"
User B sends edit: insert " amazing" → "Hello amazing World"
Since User B's edit has a later timestamp (101 > 100), the final state becomes "Hello amazing World"
Pros:

Simple to implement
Works well for basic collaborative scenarios
Low overhead in terms of storage and computation
Cons:

Can lead to lost updates
Not suitable for fine-grained collaboration where multiple users edit the same region
May result in unexpected behavior from the user's perspective
This approach is suitable for simple collaborative scenarios where conflicts are rare and losing occasional edits is acceptable. However, for a professional collaborative editing system like Google Docs, we need a more sophisticated approach like Operational Transformation, which we'll discuss next.

Operational Transformation
The primary goal of Operational Transformation (OT) is to ensure that all users see the same final document state after a series of edits, even if those edits are made out of order. It does this by applying transformation functions to modify the conflicting operation so that they can be applied in a way that preserves the intention of each user's changes.

Let's use the same example as above to illustrate how OT works. At step 6, instead of choosing the latest edit, the OT will transform the edit

Since A's edit comes first, it will be applied first.
After applying this operation, the document becomes "Hello beautiful World"
OT will then transform User B's Operation Based on User A's Edit

User B wanted to insert " amazing" at position 6 in the original document. However, User A's insertion of " beautiful" has shifted the text "World" to the right.
New Position for User B's Edit: After User A's insertion of " beautiful," position 6 becomes position 16 (because " beautiful" is 10 characters long).
Transformed User B's Operation: Insert " amazing" at position 16 in the updated document.
Now we can apply User B's transformed operation to the document.

The document state becomes "Hello beautiful amazing World" and this is the final state.
This is a simple example. In a real-world collaborative editing system, the operations can be much more complex.

Pros:

Preserves the intention of each user's changes
Suitable for fine-grained collaboration
Cons:

More complex to implement
OT may have scalability limitations, especially when many users are making edits simultaneously. The transformation functions can become computationally expensive as the number of operations and conflicts increases, potentially leading to performance bottlenecks.
This is one of the reason why collaborative editing systems typically allow only a small number of concurrent users to edit the same document.

Deep Dive Questions
How to implement document version history?
Document version history can be implemented using several strategies:

1. Snapshot-Based Versioning
Store complete document snapshots at regular intervals
Pros: Fast retrieval, simple to implement
Cons: Storage intensive
2. Delta-Based Versioning
Store initial state plus sequence of changes
More storage efficient but slower to reconstruct
interface DocumentVersion {
  versionId: string;
  timestamp: number;
  authorId: string;
  changes: Delta[];
  baseVersion: string;  // Previous version ID
}
3. Hybrid Approach (Recommended)
Store periodic snapshots (e.g., every 100 changes)
Store deltas between snapshots
Benefits:
Balanced storage vs. retrieval speed
Faster version reconstruction
Efficient storage
Implementation Considerations
Version Metadata

Author information
Timestamp
Version description/labels
Parent version reference
Storage Optimization

Compress snapshots
Implement retention policies
Use object storage for snapshots
Access Control

Version-specific permissions
Audit logging
How to prevent server overload from frequent edits?