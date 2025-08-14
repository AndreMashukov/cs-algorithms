# System Design: Google Docs
https://systemdesignschool.io/problems/google-doc/solution?utm_source=neetcode
---

## 1. Functional Requirements

### Core Requirements
- **Single User Editing:** Users can create, read, update, and delete documents directly in their web browser.
- **Multi-user Collaborative Editing:** Users should be able to edit the same document concurrently and view each other's changes in real-time.

### Out of Scope
- Authentication and authorization
- Document versioning and history
- Document sharing and permissions management
- Document comments and annotations
- Document offline access

---

## 2. Scale Requirements

- **DAU:** 1 million.
- **Traffic Spike:** 5x during peak hours.
- **Read to write ratio:** 10:1.
- **Average Document Size:** 100KB. Assume each user has an average of 10 documents.
- **Edit Frequency:** 1 edit per second per document during peak hours.
- **Concurrent Users:** Allow up to 100 concurrent users per document.

---

## 3. Non-Functional Requirements

- **High availability:** The system must be accessible at all times, minimizing downtime to ensure continuous collaboration.
- **Low latency:** End-to-end latency should be under 200 milliseconds.
- **Eventual Consistency:** All users should eventually see the same document state, even if edits arrive at different times.
- **Read-Your-Writes Consistency:** Users should see their own edits immediately to confirm their changes have been registered.

---

## 4. API Endpoints

### `POST /api/documents`
Create a new document.

**Request Body:**
```json
{
  "title": "My Document"
}
```

**Response Body:**
```json
{
  "documentId": "doc-123",
  "title": "My Document"
}
```

### `GET /api/documents/{documentId}`
Retrieve a document by ID.

**Response Body:**
```json
{
  "documentId": "doc-123",
  "title": "My Document",
  "content": "Document content"
}
```

### `PUT /api/documents/{documentId}`
Update document metadata or content.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Response Body:**
```json
{
  "documentId": "doc-123",
  "title": "Updated Title"
}
```

### `POST /api/documents/{documentId}/operations`
Apply editing operations to a document.

**Request Body:**
```json
{
  "operations": [
    {
      "type": "insert",
      "position": 10,
      "text": "new text"
    }
  ]
}
```

**Response Body:**
```json
{
  "status": "success"
}
```

### `WS /api/documents/{documentId}/collaborate`
WebSocket endpoint for real-time collaboration.

- **Connection:** After the connection is established, messages are exchanged in both directions using the WebSocket protocol.
- **Example message from server:**
  ```json
  {
    "type": "operation",
    "userId": "user-789",
    "operation": { "type": "insert", "position": 10, "text": "new text" }
  }
  ```
- **Example message from client:**
  ```json
  {
    "type": "operation",
    "operation": { "type": "insert", "position": 15, "text": "client text" }
  }
  ```

---

## 5. High Level Design

### 5.1. Single User Editing

#### File URL structure
Unlike a typical hierarchical file system (`~/Documents/my-document.txt`), a cloud editing tool benefits from a flat URL structure.

- **Hierarchical:** Exposes folder structure, long, and hard to share.
- **Flat (Preferred):** Cleaner, easier to share, and doesn't expose user-specific folder paths.

**Examples:**
- **Google Docs:** `https://docs.google.com/document/d/1Ss4s93AGpdksZp1X3Gjzy717LCv8xY49G_PewUwmZ5A`
- **Notion:** `https://www.notion.so/6b8b4565327b4c52b0bf765434a1210d`

#### How to generate the document ID?
The ID should be:
- **Globally Unique:** No two documents should ever have the same ID.
- **Short:** Ideally, but not a hard requirement.

Common approaches include generating a unique alphanumeric string (like Google Docs) or using a hash (like Notion's MD5 hash).

#### How to Store Documents?

**Document Metadata**
- **Content:** Title, author, permissions, timestamps, version pointers, etc.
- **Characteristics:** Small, structured, requires strong consistency and complex querying capabilities (e.g., find all docs for a user).
- **Storage Solution:** A **relational database** is ideal due to its support for ACID transactions, data integrity constraints, and efficient complex queries.

**Document Content**
- **Content:** The actual text, images, and rich media.
- **Characteristics:** Can be large, unstructured, and requires high durability and scalability.
- **Storage Solution:** A **cloud object storage service** (like AWS S3 or Google Cloud Storage) is best suited for handling large amounts of unstructured data cost-effectively.

**Design Diagram:**
![Single-user CRUD operations diagram](https://storage.googleapis.com/systemdesignschool/google-docs-crud.png)

#### How to Represent Document Content?
The content needs to support rich text, media, and granular edits. Google Docs uses a tree of objects.

**Top-level structure:**
```javascript
document: {
  title: String,
  documentId: String,
  body: Body
}
```

The `Body` is an array of `StructuralElement` objects.

```
Body
└── StructuralElement[]
    ├── Paragraph
    │   ├── ParagraphStyle (formatting)
    │   ├── Bullet (if part of list)
    │   └── ParagraphElement[]
    │       ├── TextRun (text with same styling)
    │       ├── AutoText (e.g., page numbers)
    │       └── ...
    ├── Table
    └── ...
```

A **TextRun** is a key concept: it's a contiguous string of text with the same style. A paragraph can contain multiple text runs.

**Example:**
The text "Hello *italic* world." would be:
- `Paragraph`
  - `TextRun` ("Hello ")
  - `TextRun` (*italic*: "italic")
  - `TextRun` (" world.")

This tree structure allows for rich formatting, granular editing, and forms the basis for collaboration features.

### 5.2. Multi-user Collaborative Editing

#### Synchronizing Document State
The main challenges are:
1. How to synchronize state between users in real-time?
2. How to handle conflicting edits?

#### Synchronization Protocol Options

| Protocol | Suitability | How it Works | Pros/Cons |
| :--- | :--- | :--- | :--- |
| **HTTP Polling** | **Not Suitable** | Client sends requests at fixed intervals. | **Pros:** Simple, universal support. <br> **Cons:** High latency, high server overhead. |
| **WebSocket** | **Best Option** | A single, persistent, bidirectional connection. | **Pros:** Low latency, efficient, real-time. <br> **Cons:** More complex than polling. |
| **Server-Sent Events (SSE)** | **Not Suitable** | Server pushes updates to the client (unidirectional). | **Pros:** Simple for server-to-client. <br> **Cons:** Not bidirectional, less suitable for client edits. |

**Conclusion:** **WebSocket** is the best choice for real-time, bidirectional communication.

We introduce a **WebSocket Service** and a **Message Queue** (e.g., Kafka, RabbitMQ) to decouple services and improve reliability.

**Updated Design Diagram:**
![Full system design diagram](https://storage.googleapis.com/systemdesignschool/google-docs-system-design.png)

**Workflow:**
1.  **Client 1 sends an edit** to the WebSocket Service.
2.  **WebSocket Service** adds the edit to the message queue.
3.  **Document Service** consumes the edit from the queue.
4.  **Document Service** processes and persists the edit to the database.
5.  **Document Service** notifies the WebSocket Service (via the queue).
6.  **WebSocket Service** broadcasts the update to all connected clients.

#### Handling Conflicts

**1. Last-Write-Wins (LWW)**
- **How it works:** Each edit is timestamped. The edit with the latest timestamp "wins" and overwrites others.
- **Pros:** Simple to implement.
- **Cons:** Can lead to lost updates and is not suitable for fine-grained collaboration.

**2. Operational Transformation (OT)**
- **Goal:** To ensure all users see the same final document state by transforming operations so they can be applied correctly, even if they arrive out of order.
- **Example:**
  1.  **Initial State:** "Hello World"
  2.  **User A** inserts " beautiful" at position 6. Document becomes "Hello beautiful World".
  3.  **User B** wanted to insert " amazing" at position 6 of the *original* document.
  4.  **Transformation:** OT transforms User B's operation. Since User A's insertion shifted the text, the new position for User B's edit is 16 (6 + length of " beautiful ").
  5.  **Apply Transformed Edit:** Insert " amazing" at position 16.
  6.  **Final State:** "Hello beautiful amazing World"
- **Pros:** Preserves user intent, suitable for fine-grained collaboration.
- **Cons:** Complex to implement, can have scalability limitations with many concurrent users.

---

## 6. Deep Dive Questions

### How to implement document version history?
A hybrid approach is recommended:
1.  **Periodic Snapshots:** Store a full snapshot of the document periodically (e.g., every 100 changes).
2.  **Delta-Based Versioning:** Between snapshots, store only the sequence of changes (deltas).

This provides a balance between storage efficiency and fast version reconstruction.

### How to prevent server overload from frequent edits?
- **Debouncing and Throttling:** Limit the rate of edits sent from the client.
- **Batching:** Group multiple small operations (e.g., typing characters) into a single request.
- **Message Queues:** Use a message queue to buffer incoming edits, allowing the backend services to process them at a sustainable rate and smoothing out traffic spikes.
