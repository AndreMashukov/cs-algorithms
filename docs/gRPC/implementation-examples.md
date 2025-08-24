# gRPC Implementation Examples for AFFHAUSEN Tech Stack

This document provides concrete examples showing how to implement the gRPC use cases mentioned in the project description, with detailed ASCII diagrams and code examples.

## Table of Contents
1. [Microservices Communication](#microservices-communication)
2. [gRPC-Web for Frontend Communication](#grpc-web-for-frontend-communication)
3. [Real-time Bidirectional Streaming](#real-time-bidirectional-streaming)
4. [Cross-Platform API Consistency](#cross-platform-api-consistency)
5. [Complete Architecture Overview](#complete-architecture-overview)

---

## 1. Microservices Communication

### Use Case: User Management Service communicating with Content Processing Service

```
┌─────────────────┐    gRPC Call     ┌─────────────────┐
│   User Service  │ ================▶│ Content Service │
│                 │                  │                 │
│ - Authentication│                  │ - Process Docs  │
│ - User Profile  │                  │ - Store Content │
│ - Permissions   │                  │ - Extract Meta  │
└─────────────────┘                  └─────────────────┘
         │                                    │
         │          gRPC Response             │
         │ ◀══════════════════════════════════│
         │                                    │
         ▼                                    ▼
┌─────────────────┐                  ┌─────────────────┐
│   Database      │                  │   File Storage  │
│   (User Data)   │                  │   (Documents)   │
└─────────────────┘                  └─────────────────┘
```

### Protocol Definition (.proto file)

```protobuf
// user_content.proto
syntax = "proto3";

package affhausen.userservice;

service UserContentService {
  rpc ProcessUserDocument(DocumentRequest) returns (ProcessingResponse);
  rpc GetUserPermissions(UserRequest) returns (PermissionResponse);
}

message DocumentRequest {
  string user_id = 1;
  string document_id = 2;
  bytes document_content = 3;
  string content_type = 4;
}

message ProcessingResponse {
  bool success = 1;
  string processed_document_url = 2;
  repeated string extracted_tags = 3;
  int64 processing_time_ms = 4;
}
```

### Implementation Flow

```
=== Step 1: User uploads document ===
Frontend → User Service: Document + User Token
User Service: Validates token, extracts user_id

=== Step 2: gRPC Internal Communication ===
User Service → Content Service: 
┌────────────────────────────────┐
│ DocumentRequest {              │
│   user_id: "user_123"          │
│   document_id: "doc_456"       │
│   document_content: [binary]   │
│   content_type: "text/plain"   │
│ }                              │
└────────────────────────────────┘

=== Step 3: Content Processing ===
Content Service:
├─ Extract text and metadata
├─ Generate tags and keywords
├─ Store in file system
└─ Return processing results

=== Step 4: Response Flow ===
Content Service → User Service:
┌────────────────────────────────┐
│ ProcessingResponse {           │
│   success: true                │
│   processed_document_url:      │
│     "https://storage/doc_456"  │
│   extracted_tags: ["tech",     │
│     "proposal", "urgent"]      │
│   processing_time_ms: 1250     │
│ }                              │
└────────────────────────────────┘
```

---

## 2. gRPC-Web for Frontend Communication

### Architecture: React Frontend ↔ gRPC Services

```
┌─────────────────┐    HTTP/1.1     ┌─────────────────┐    HTTP/2      ┌─────────────────┐
│  React Frontend │ ===============▶│  Envoy Proxy    │ =============▶│  gRPC Service   │
│                 │                 │                 │               │                 │
│ - gRPC-Web      │                 │ - Protocol      │               │ - Go/Node.js    │
│ - JavaScript    │                 │   Translation   │               │ - Business      │
│ - User Interface│                 │ - Load Balancer │               │   Logic         │
└─────────────────┘                 └─────────────────┘               └─────────────────┘
         │                                   │                                │
         │                                   │                                │
         ▼                                   ▼                                ▼
┌─────────────────┐                 ┌─────────────────┐               ┌─────────────────┐
│   Browser       │                 │   Kubernetes    │               │   Database      │
│   (Chrome/      │                 │   Service Mesh  │               │   (MongoDB/     │
│   Firefox/      │                 │   (Istio)       │               │   PostgreSQL)   │
│   Safari)       │                 │                 │               │                 │
└─────────────────┘                 └─────────────────┘               └─────────────────┘
```

### Frontend Implementation Example

```javascript
// Generated from .proto files
import { UserServiceClient } from './generated/user_service_grpc_web_pb';
import { GetUserProfileRequest, UpdateProfileRequest } from './generated/user_service_pb';

class UserProfileComponent {
  constructor() {
    // gRPC-Web client setup
    this.client = new UserServiceClient('https://api.affhausen.com', null, null);
  }

  async getUserProfile(userId) {
    const request = new GetUserProfileRequest();
    request.setUserId(userId);

    try {
      const response = await this.client.getUserProfile(request, {});
      return {
        name: response.getName(),
        email: response.getEmail(),
        preferences: response.getPreferencesList()
      };
    } catch (error) {
      console.error('gRPC Error:', error);
      throw error;
    }
  }
}
```

### Request/Response Flow

```
=== Frontend to Backend Communication ===

Step 1: User clicks "Load Profile"
Frontend: Creates gRPC-Web request
┌─────────────────────────────────────┐
│ GetUserProfileRequest {             │
│   user_id: "user_789"               │
│ }                                   │
└─────────────────────────────────────┘

Step 2: gRPC-Web → Envoy Proxy
HTTP/1.1 POST /UserService/GetUserProfile
Content-Type: application/grpc-web+proto
[Binary protobuf data]

Step 3: Envoy → gRPC Service  
HTTP/2 with gRPC protocol
┌─────────────────────────────────────┐
│ Native gRPC call with headers:      │
│ :method: POST                       │
│ :scheme: https                      │
│ :path: /UserService/GetUserProfile  │
│ content-type: application/grpc      │
│ grpc-encoding: identity             │
└─────────────────────────────────────┘

Step 4: Response Flow (reverse path)
gRPC Service → Envoy → Frontend
┌─────────────────────────────────────┐
│ UserProfileResponse {               │
│   name: "John Doe"                  │
│   email: "john@affhausen.com"       │
│   preferences: ["dark_mode",        │
│                 "notifications"]    │
│ }                                   │
└─────────────────────────────────────┘
```

---

## 3. Real-time Bidirectional Streaming

### Use Case: Collaborative Document Editing

```
┌─────────────────┐         Bidirectional Stream         ┌─────────────────┐
│   Client A      │ ◀════════════════════════════════════▶│  gRPC Server    │
│   (User 1)      │                                      │                 │
└─────────────────┘                                      │  Document       │
┌─────────────────┐                                      │  Coordination   │
│   Client B      │ ◀════════════════════════════════════▶│  Service        │
│   (User 2)      │                                      │                 │
└─────────────────┘                                      └─────────────────┘
┌─────────────────┐                                               │
│   Client C      │ ◀════════════════════════════════════════════│
│   (User 3)      │                                               │
└─────────────────┘                                               ▼
                                                          ┌─────────────────┐
                                                          │   Document      │
                                                          │   Storage       │
                                                          └─────────────────┘
```

### Protocol Definition for Real-time Collaboration

```protobuf
// collaboration.proto
syntax = "proto3";

package affhausen.collaboration;

service DocumentCollaborationService {
  rpc EditDocument(stream DocumentEdit) returns (stream DocumentUpdate);
  rpc JoinDocumentSession(JoinRequest) returns (stream SessionEvent);
}

message DocumentEdit {
  string document_id = 1;
  string user_id = 2;
  int32 position = 3;
  string operation = 4; // "insert", "delete", "format"
  string content = 5;
  int64 timestamp = 6;
}

message DocumentUpdate {
  string document_id = 1;
  string user_id = 2;
  repeated DocumentEdit applied_edits = 3;
  string current_document_state = 4;
  repeated string active_users = 5;
}
```

### Streaming Flow Visualization

```
=== Real-time Collaborative Editing Flow ===

Timeline:  0ms     100ms    200ms    300ms    400ms
           │        │        │        │        │
User A:    │ Type   │        │ Type   │        │ Receive
           │ "Hel"  │        │ "lo"   │        │ Update
           │   │    │        │   │    │        │   │
           ▼   │    ▼        ▼   │    ▼        ▼   │
Server:    Receive  │     Receive   │     Broadcast │
           Edit      │     Edit      │     Update    │
           │         │     │         │     │         │
           │         ▼     │         ▼     │         ▼
User B:    │      Receive  │      Receive  │      Apply
           │      Update   │      Update   │      Changes
           │         │     │         │     │         │
           │         ▼     │         ▼     │         ▼
Document:  "Hel"     │     "Hello"   │     "Hello"   │
                     │               │               │
                     └───────────────┼───────────────┘
                                     │
                     Conflict Resolution & 
                     Operational Transform
```

### Implementation Detail: Bidirectional Stream Handler

```go
func (s *DocumentService) EditDocument(stream pb.DocumentCollaborationService_EditDocumentServer) error {
    documentEdits := make(chan *pb.DocumentEdit)
    updates := make(chan *pb.DocumentUpdate)
    
    // Handle incoming edits from client
    go func() {
        for {
            edit, err := stream.Recv()
            if err != nil {
                close(documentEdits)
                return
            }
            documentEdits <- edit
        }
    }()
    
    // Process edits and broadcast updates
    go func() {
        for edit := range documentEdits {
            // Apply operational transform
            transformedEdit := s.transformEdit(edit)
            
            // Update document state
            s.applyEdit(transformedEdit)
            
            // Broadcast to all connected clients
            update := &pb.DocumentUpdate{
                DocumentId: edit.DocumentId,
                UserId: edit.UserId,
                AppliedEdits: []*pb.DocumentEdit{transformedEdit},
                CurrentDocumentState: s.getDocumentState(edit.DocumentId),
                ActiveUsers: s.getActiveUsers(edit.DocumentId),
            }
            
            updates <- update
        }
    }()
    
    // Send updates to client
    for update := range updates {
        if err := stream.Send(update); err != nil {
            return err
        }
    }
    
    return nil
}
```

---

## 4. Cross-Platform API Consistency

### Shared .proto Definition for Multiple Platforms

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Web Client     │         │  iOS Client     │         │ Android Client  │
│                 │         │                 │         │                 │
│ JavaScript      │         │ Swift           │         │ Kotlin          │
│ Generated from  │         │ Generated from  │         │ Generated from  │
│ .proto files    │         │ .proto files    │         │ .proto files    │
└─────────────────┘         └─────────────────┘         └─────────────────┘
         │                           │                           │
         │ gRPC-Web                  │ gRPC-Swift               │ gRPC-Kotlin
         │                           │                           │
         └───────────────────────────┼───────────────────────────┘
                                     │
                                     ▼
                           ┌─────────────────┐
                           │  gRPC Service   │
                           │                 │
                           │ Single API      │
                           │ Implementation  │
                           │ (Go/Node.js)    │
                           └─────────────────┘
```

### Unified API Definition

```protobuf
// affhausen_api.proto
syntax = "proto3";

package affhausen.api.v1;

// Document Management Service
service DocumentService {
  rpc CreateDocument(CreateDocumentRequest) returns (CreateDocumentResponse);
  rpc GetDocument(GetDocumentRequest) returns (GetDocumentResponse);
  rpc UpdateDocument(UpdateDocumentRequest) returns (UpdateDocumentResponse);
  rpc DeleteDocument(DeleteDocumentRequest) returns (DeleteDocumentResponse);
  rpc ListDocuments(ListDocumentsRequest) returns (ListDocumentsResponse);
}

// User Management Service  
service UserService {
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  rpc GetUserProfile(GetUserProfileRequest) returns (GetUserProfileResponse);
  rpc UpdateUserProfile(UpdateUserProfileRequest) returns (UpdateUserProfileResponse);
  rpc AuthenticateUser(AuthenticateUserRequest) returns (AuthenticateUserResponse);
}

// Common message types used across platforms
message Document {
  string id = 1;
  string title = 2;
  string content = 3;
  string author_id = 4;
  google.protobuf.Timestamp created_at = 5;
  google.protobuf.Timestamp updated_at = 6;
  repeated string tags = 7;
  DocumentStatus status = 8;
}

enum DocumentStatus {
  DOCUMENT_STATUS_UNSPECIFIED = 0;
  DOCUMENT_STATUS_DRAFT = 1;
  DOCUMENT_STATUS_PUBLISHED = 2;
  DOCUMENT_STATUS_ARCHIVED = 3;
}
```

### Platform-Specific Generated Code Examples

```javascript
// JavaScript/Web (gRPC-Web)
import { DocumentServiceClient } from './generated/affhausen_api_grpc_web_pb';
import { CreateDocumentRequest, Document } from './generated/affhausen_api_pb';

const client = new DocumentServiceClient('https://api.affhausen.com');

async function createDocument(title, content) {
  const request = new CreateDocumentRequest();
  request.setTitle(title);
  request.setContent(content);
  
  const response = await client.createDocument(request, {});
  return response.getDocument();
}
```

```swift
// Swift/iOS
import GRPC
import NIO

class DocumentService {
    private let client: Affhausen_Api_V1_DocumentServiceClient
    
    init(channel: GRPCChannel) {
        self.client = Affhausen_Api_V1_DocumentServiceClient(channel: channel)
    }
    
    func createDocument(title: String, content: String) -> EventLoopFuture<Affhausen_Api_V1_Document> {
        var request = Affhausen_Api_V1_CreateDocumentRequest()
        request.title = title
        request.content = content
        
        return client.createDocument(request).response.map { response in
            return response.document
        }
    }
}
```

```kotlin
// Kotlin/Android
import affhausen.api.v1.DocumentServiceGrpc
import affhausen.api.v1.CreateDocumentRequest
import affhausen.api.v1.Document

class DocumentService(private val channel: ManagedChannel) {
    private val stub = DocumentServiceGrpc.newBlockingStub(channel)
    
    fun createDocument(title: String, content: String): Document {
        val request = CreateDocumentRequest.newBuilder()
            .setTitle(title)
            .setContent(content)
            .build()
            
        val response = stub.createDocument(request)
        return response.document
    }
}
```

---

## 5. Complete Architecture Overview

### AFFHAUSEN gRPC-Based Tech Stack

```
                                    ┌─────────────────────────────────────────┐
                                    │              FRONTEND LAYER             │
                                    │                                         │
┌─────────────────┐                 │  ┌─────────────┐  ┌─────────────┐      │
│   Web Browser   │                 │  │   React     │  │   Vue.js    │      │
│                 │                 │  │   App       │  │   App       │      │
│ - React/Vue.js  │ ◀─────────────────▶│             │  │             │      │
│ - gRPC-Web      │                 │  │ gRPC-Web    │  │ gRPC-Web    │      │
│ - JavaScript    │                 │  │ Client      │  │ Client      │      │
└─────────────────┘                 │  └─────────────┘  └─────────────┘      │
                                    │                                         │
┌─────────────────┐                 │  ┌─────────────┐  ┌─────────────┐      │
│   iOS App       │                 │  │   iOS       │  │  Android    │      │
│                 │ ◀─────────────────▶│   Swift     │  │   Kotlin    │      │
│ - Swift         │                 │  │   gRPC      │  │   gRPC      │      │
│ - gRPC-Swift    │                 │  │   Client    │  │   Client    │      │
└─────────────────┘                 │  └─────────────┘  └─────────────┘      │
                                    └─────────────────────────────────────────┘
┌─────────────────┐                                     │
│  Android App    │                                     │ HTTP/2 + gRPC
│                 │                                     │
│ - Kotlin        │                                     ▼
│ - gRPC-Kotlin   │                 ┌─────────────────────────────────────────┐
└─────────────────┘                 │             API GATEWAY LAYER          │
                                    │                                         │
                                    │  ┌─────────────┐  ┌─────────────┐      │
                                    │  │   Envoy     │  │   Istio     │      │
                                    │  │   Proxy     │  │   Service   │      │
                                    │  │             │  │   Mesh      │      │
                                    │  │ - Load      │  │             │      │
                                    │  │   Balance   │  │ - Security  │      │
                                    │  │ - Protocol  │  │ - Observ.   │      │
                                    │  │   Convert   │  │ - Traffic   │      │
                                    │  └─────────────┘  └─────────────┘      │
                                    └─────────────────────────────────────────┘
                                                        │
                                                        │ gRPC Internal
                                                        │
                                                        ▼
                                    ┌─────────────────────────────────────────┐
                                    │           MICROSERVICES LAYER           │
                                    │                                         │
┌─────────────────┐                 │  ┌─────────────┐  ┌─────────────┐      │
│   User Service  │ ◀─────────────────▶│    Auth     │  │   Content   │      │
│                 │                 │  │   Service   │  │  Processing │      │
│ - User Mgmt     │                 │  │             │  │   Service   │      │
│ - Profile Data  │                 │  │ - JWT       │  │             │      │
│ - Preferences   │                 │  │ - OAuth     │  │ - Document  │      │
└─────────────────┘                 │  │ - Session   │  │   Analysis  │      │
                                    │  └─────────────┘  │ - Metadata  │      │
┌─────────────────┐                 │                   │   Extract   │      │
│ Collaboration   │                 │  ┌─────────────┐  └─────────────┘      │
│    Service      │ ◀─────────────────▶│   Search    │                       │
│                 │                 │  │   Service   │  ┌─────────────┐      │
│ - Real-time     │                 │  │             │  │ Notification│      │
│   Editing       │                 │  │ - Full Text │  │   Service   │      │
│ - Document      │                 │  │ - Semantic  │  │             │      │
│   Sync          │                 │  │ - Faceted   │  │ - Email     │      │
│ - Conflict      │                 │  └─────────────┘  │ - Push      │      │
│   Resolution    │                 │                   │ - WebSocket │      │
└─────────────────┘                 │                   └─────────────┘      │
                                    └─────────────────────────────────────────┘
                                                        │
                                                        │ Database Connections
                                                        │
                                                        ▼
                                    ┌─────────────────────────────────────────┐
                                    │             DATA LAYER                  │
                                    │                                         │
                                    │  ┌─────────────┐  ┌─────────────┐      │
                                    │  │  PostgreSQL │  │   MongoDB   │      │
                                    │  │             │  │             │      │
                                    │  │ - User Data │  │ - Documents │      │
                                    │  │ - Relations │  │ - Content   │      │
                                    │  │ - Sessions  │  │ - Metadata  │      │
                                    │  └─────────────┘  └─────────────┘      │
                                    │                                         │
                                    │  ┌─────────────┐  ┌─────────────┐      │
                                    │  │    Redis    │  │  File Store │      │
                                    │  │             │  │   (S3/GCS)  │      │
                                    │  │ - Cache     │  │             │      │
                                    │  │ - Sessions  │  │ - Documents │      │
                                    │  │ - Real-time │  │ - Media     │      │
                                    │  └─────────────┘  └─────────────┘      │
                                    └─────────────────────────────────────────┘
```

### Key Benefits Achieved

#### 1. **Low Latency Communication**
- HTTP/2 multiplexing reduces connection overhead
- Binary protobuf serialization is faster than JSON
- Connection pooling and reuse across services

#### 2. **Type Safety Across Platforms**
- Single source of truth (.proto files)
- Compile-time type checking on all platforms
- Automatic code generation ensures consistency

#### 3. **Scalability Features**
```
Load Balancing Strategy:
┌─────────────────┐    Round Robin     ┌─────────────────┐
│   Client Req    │ ─────────────────▶ │   Service A     │
│                 │                   └─────────────────┘
│                 │    Least Conn      ┌─────────────────┐
│                 │ ─────────────────▶ │   Service B     │
│                 │                   └─────────────────┘
│                 │    Health Check    ┌─────────────────┐
│                 │ ─────────────────▶ │   Service C     │
└─────────────────┘                   └─────────────────┘

Circuit Breaker Pattern:
CLOSED ──[failures > threshold]──▶ OPEN
  ▲                                  │
  │                                  │ [timeout]
  │                                  ▼
  └──[success]──── HALF-OPEN ◀───────┘
```

#### 4. **Real-time Capabilities**
- Bidirectional streaming for live collaboration
- Server-side events for notifications
- Low-latency document synchronization

#### 5. **Development Workflow**
```
=== gRPC Development Cycle ===

Step 1: Define API Contract (.proto)
┌─────────────────────────────────────┐
│ service DocumentService {           │
│   rpc CreateDocument(Request)       │
│     returns (Response);             │
│ }                                   │
└─────────────────────────────────────┘

Step 2: Generate Code (All Platforms)
protoc --go_out=. --js_out=. --swift_out=. --kotlin_out=. api.proto

Step 3: Implement Services
├─ Backend: Go/Node.js service implementation
├─ Frontend: React/Vue.js client integration  
├─ Mobile: iOS/Android client integration
└─ Testing: End-to-end gRPC testing

Step 4: Deploy & Monitor
├─ Kubernetes deployment with Istio mesh
├─ Metrics collection (Prometheus/Grafana)
├─ Distributed tracing (Jaeger/Zipkin)
└─ Health checking and circuit breakers
```

This implementation provides AFFHAUSEN with a robust, scalable, and maintainable architecture that supports real-time collaboration, cross-platform consistency, and high-performance communication between services.
