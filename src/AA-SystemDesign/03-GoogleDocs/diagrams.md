### High-Level Architecture Diagram

This diagram shows the main components for handling real-time collaborative editing. Clients maintain a persistent WebSocket connection to the WebSocket Service. Edits are sent through this connection, queued in a message broker for reliability, processed by the Document Service, and then broadcasted back to all connected clients.

```
[Client 1] ←───────────┐                ┌───────────→ [Client 2]
     ↑                  │                │                  ↑
     │ (WebSocket)      │ (Broadcast)    │ (Broadcast)      │ (WebSocket)
     ↓                  │                │                  ↓
┌───────────────────┐   │                │   ┌───────────────────┐
│ WebSocket Service │   │                │   │ WebSocket Service │
└───────────────────┘   │                │   └───────────────────┘
           ↓            │                │            ↑
           │ (Publish Edit)              │            │
           ↓            │                │            │
     ┌───────────┐      │                │      ┌───────────┐
     │ Message   │      │                │      │ Message   │
     │  Broker   ├──────┘                └──────┤  Broker   │
     │  (Kafka)  │                              │  (Kafka)  │
     └───────────┘                              └───────────┘
           ↓
           │ (Consume Edit)
           ↓
┌───────────────────┐
│ Document Service  │
└───────────────────┘
      ↓        ↑
      ↓        ↑ (Metadata)
┌────────────┐ │ ┌────────────────┐
│ Cloud      │ ← │ Relational     │
│ Storage    │   │ Database       │
│ (Content)  │   │ (Metadata)     │
└────────────┘   └────────────────┘
```

### Database Schema Diagram

This diagram illustrates the database schema for storing document metadata. The `Documents` table holds core information, the `Users` table stores user data, and the `Permissions` table manages access control by linking users to documents with specific roles. The actual document content is stored in a separate cloud object storage, referenced by `content_storage_key`.

```
┌──────────────────┐      ┌──────────────────┐
│      Users       │      │   Permissions    │
├──────────────────┤      ├──────────────────┤
│ user_id (PK)     │───○──│ permission_id(PK)│
│ username         │      │ document_id (FK) │
│ email            │      │ user_id (FK)     │
│ created_at       │      │ role             │
└──────────────────┘      └──────────────────┘
                              ↑
                              │
┌───────────────────────────────┐
│           Documents           │
├───────────────────────────────┤
│ document_id (PK)              │
│ title                         │
│ owner_id (FK to Users)        │
│ content_storage_key (to S3)   │
│ created_at                    │
│ last_modified_at              │
└───────────────────────────────┘
```

### Data Flow for Collaborative Editing

This diagram shows the sequence of events when a user makes an edit. The operation is sent via WebSocket, processed asynchronously using a message queue, and the resulting change is broadcast to all collaborators, ensuring low latency for the editing client.

```
1. Insert "A"
[Client A]  ──────────────────→ ┌───────────────────┐
                                │ WebSocket Service │
                                └───────────────────┘
                                          │ 2. Publish {"op": "insert", "text": "A"}
                                          ↓
                                    ┌───────────┐
                                    │  Message  │
                                    │   Queue   │
                                    └───────────┘
                                          │ 3. Consume Operation
                                          ↓
                                ┌───────────────────┐
                                │ Document Service  │
                                │ - Apply OT        │
                                │ - Persist to DB   │
                                └───────────────────┘
                                          │ 4. Notify & Broadcast
                                          ↓
[Client A]  ←────────────────── ┌───────────────────┐ ←────────────────── [Client B]
(Confirm)   5. Broadcast        │ WebSocket Service │   5. Broadcast      (Update)
            {"op": "insert",..} └───────────────────┘   {"op": "insert",..}
```
