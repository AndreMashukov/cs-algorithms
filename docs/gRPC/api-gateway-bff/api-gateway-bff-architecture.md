# API Gateway, gRPC-Web, and BFF Architecture Guide

This document explains how API Gateways interact with React gRPC-Web clients and Backend for Frontend (BFF) applications in a gRPC-based architecture.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [API Gateway Role and Responsibilities](#api-gateway-role-and-responsibilities)
3. [React gRPC-Web Client Integration](#react-grpc-web-client-integration)
4. [Backend for Frontend (BFF) Pattern](#backend-for-frontend-bff-pattern)
5. [Protocol Translation and Routing](#protocol-translation-and-routing)
6. [Complete Request Flow](#complete-request-flow)
7. [Implementation Examples](#implementation-examples)

---

## 1. Architecture Overview

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                  │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   React Web     │  │   iOS Native    │  │  Android Native │            │
│  │     Client      │  │     Client      │  │     Client      │            │
│  │                 │  │                 │  │                 │            │
│  │ - gRPC-Web      │  │ - gRPC-Swift    │  │ - gRPC-Kotlin   │            │
│  │ - HTTP/1.1      │  │ - HTTP/2        │  │ - HTTP/2        │            │
│  │ - JavaScript    │  │ - Swift         │  │ - Kotlin        │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘
           │                        │                        │
           │ HTTP/1.1               │ HTTP/2                 │ HTTP/2
           │ gRPC-Web               │ gRPC                   │ gRPC
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            API GATEWAY LAYER                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                      Envoy Proxy                                │       │
│  │                                                                 │       │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │       │
│  │  │   gRPC-Web      │  │   Protocol      │  │   Load          │ │       │
│  │  │   Translator    │  │   Router        │  │   Balancer      │ │       │
│  │  │                 │  │                 │  │                 │ │       │
│  │  │ HTTP/1.1 ↔      │  │ Route by        │  │ Round Robin     │ │       │
│  │  │ HTTP/2          │  │ Service/Method  │  │ Health Check    │ │       │
│  │  │                 │  │                 │  │ Circuit Break   │ │       │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘ │       │
│  │                                                                 │       │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │       │
│  │  │   Security      │  │   Rate          │  │   Observability │ │       │
│  │  │   & Auth        │  │   Limiting      │  │   & Metrics     │ │       │
│  │  │                 │  │                 │  │                 │ │       │
│  │  │ JWT Validation  │  │ Token Bucket    │  │ Prometheus      │ │       │
│  │  │ CORS Handling   │  │ Client Limits   │  │ Jaeger Tracing  │ │       │
│  │  │ TLS Termination │  │ Service Quotas  │  │ Access Logs     │ │       │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘ │       │
│  └─────────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/2 gRPC
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BFF & SERVICE LAYER                               │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Web BFF       │  │   Mobile BFF    │  │  Microservices  │            │
│  │   Service       │  │   Service       │  │                 │            │
│  │                 │  │                 │  │                 │            │
│  │ - Aggregation   │  │ - Aggregation   │  │ - User Service  │            │
│  │ - Composition   │  │ - Composition   │  │ - Auth Service  │            │
│  │ - Caching       │  │ - Caching       │  │ - Content Svc   │            │
│  │ - Web-specific  │  │ - Mobile-opt    │  │ - Search Svc    │            │
│  │   Logic         │  │   Logic         │  │ - Notification  │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. API Gateway Role and Responsibilities

### Core Functions in gRPC Environment

```
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY FUNCTIONS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PROTOCOL TRANSLATION                                        │
│     ┌─────────────────┐         ┌─────────────────┐            │
│     │   gRPC-Web      │ ======▶ │   Native gRPC   │            │
│     │   (HTTP/1.1)    │         │   (HTTP/2)      │            │
│     └─────────────────┘         └─────────────────┘            │
│                                                                 │
│  2. ROUTING & LOAD BALANCING                                    │
│     ┌─────────────────┐                                        │
│     │  /UserService/  │ ─────▶ User BFF ─────▶ User Service    │
│     │  GetProfile     │                                        │
│     └─────────────────┘                                        │
│     ┌─────────────────┐                                        │
│     │  /DocumentSvc/  │ ─────▶ Web BFF ─────▶ Content Service │
│     │  CreateDoc      │                                        │
│     └─────────────────┘                                        │
│                                                                 │
│  3. SECURITY & AUTHENTICATION                                   │
│     ┌─────────────────┐         ┌─────────────────┐            │
│     │   JWT Token     │ ======▶ │   Validated     │            │
│     │   Validation    │         │   Request       │            │
│     └─────────────────┘         └─────────────────┘            │
│                                                                 │
│  4. CROSS-CUTTING CONCERNS                                      │
│     - Rate Limiting                                             │
│     - CORS Handling                                             │
│     - Request/Response Logging                                  │
│     - Circuit Breaking                                          │
│     - Health Checking                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Envoy Proxy Configuration for gRPC-Web

```yaml
# envoy.yaml - API Gateway Configuration
static_resources:
  listeners:
  - name: grpc_web_listener
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 8080
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: grpc_web
          codec_type: AUTO
          route_config:
            name: local_route
            virtual_hosts:
            - name: web_service
              domains: ["*"]
              routes:
              # Route to Web BFF
              - match:
                  prefix: "/web.bff.v1/"
                route:
                  cluster: web_bff_cluster
              # Route to Mobile BFF  
              - match:
                  prefix: "/mobile.bff.v1/"
                route:
                  cluster: mobile_bff_cluster
              # Direct microservice access
              - match:
                  prefix: "/user.service.v1/"
                route:
                  cluster: user_service_cluster
              cors:
                allow_origin_string_match:
                - prefix: "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
          http_filters:
          # gRPC-Web filter for protocol translation
          - name: envoy.filters.http.grpc_web
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
          # CORS filter
          - name: envoy.filters.http.cors
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.cors.v3.Cors
          # Router filter
          - name: envoy.filters.http.router
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router

  clusters:
  # Web BFF Cluster
  - name: web_bff_cluster
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    load_assignment:
      cluster_name: web_bff_cluster
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: web-bff-service
                port_value: 9090
  
  # Mobile BFF Cluster  
  - name: mobile_bff_cluster
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    load_assignment:
      cluster_name: mobile_bff_cluster
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: mobile-bff-service
                port_value: 9091
```

---

## 3. React gRPC-Web Client Integration

### Client-Side Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    REACT APPLICATION                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   COMPONENT LAYER                          ││
│  │                                                             ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ ││
│  │  │   Dashboard     │  │   Document      │  │   Profile   │ ││
│  │  │   Component     │  │   Editor        │  │   Settings  │ ││
│  │  │                 │  │   Component     │  │   Component │ ││
│  │  └─────────────────┘  └─────────────────┘  └─────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                │                                │
│                                ▼                                │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    SERVICE LAYER                           ││
│  │                                                             ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ ││
│  │  │   User          │  │   Document      │  │   Auth      │ ││
│  │  │   Service       │  │   Service       │  │   Service   │ ││
│  │  │                 │  │                 │  │             │ ││
│  │  │ gRPC-Web        │  │ gRPC-Web        │  │ gRPC-Web    │ ││
│  │  │ Client          │  │ Client          │  │ Client      │ ││
│  │  └─────────────────┘  └─────────────────┘  └─────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTP/1.1 + gRPC-Web Protocol
                                │ Content-Type: application/grpc-web+proto
                                │
                                ▼
                    ┌─────────────────────────────┐
                    │        API GATEWAY         │
                    │       (Envoy Proxy)        │
                    └─────────────────────────────┘
```

### React Service Implementation

```typescript
// services/DocumentService.ts
import { 
  DocumentServiceClient,
  DocumentServicePromiseClient 
} from '../generated/document_service_grpc_web_pb';
import { 
  CreateDocumentRequest, 
  CreateDocumentResponse,
  GetDocumentRequest,
  GetDocumentResponse,
  Document 
} from '../generated/document_service_pb';

class DocumentService {
  private client: DocumentServicePromiseClient;
  private readonly baseUrl = process.env.REACT_APP_API_GATEWAY_URL || 'https://api.affhausen.com';

  constructor() {
    // gRPC-Web client pointing to API Gateway
    this.client = new DocumentServicePromiseClient(this.baseUrl, null, null);
  }

  async createDocument(title: string, content: string, authorId: string): Promise<Document> {
    const request = new CreateDocumentRequest();
    request.setTitle(title);
    request.setContent(content);
    request.setAuthorId(authorId);

    try {
      // This goes through API Gateway → Web BFF → Content Service
      const response = await this.client.createDocument(request, this.getMetadata());
      return response.getDocument()!;
    } catch (error) {
      console.error('Failed to create document:', error);
      throw this.handleGrpcError(error);
    }
  }

  async getDocument(documentId: string): Promise<Document> {
    const request = new GetDocumentRequest();
    request.setDocumentId(documentId);

    try {
      const response = await this.client.getDocument(request, this.getMetadata());
      return response.getDocument()!;
    } catch (error) {
      console.error('Failed to get document:', error);
      throw this.handleGrpcError(error);
    }
  }

  private getMetadata() {
    const token = localStorage.getItem('auth_token');
    return {
      'authorization': `Bearer ${token}`,
      'x-client-type': 'web',
      'x-client-version': process.env.REACT_APP_VERSION || '1.0.0'
    };
  }

  private handleGrpcError(error: any): Error {
    // Convert gRPC status codes to user-friendly errors
    const status = error.code;
    switch (status) {
      case 16: // UNAUTHENTICATED
        return new Error('Please log in to continue');
      case 7: // PERMISSION_DENIED
        return new Error('You do not have permission to perform this action');
      case 14: // UNAVAILABLE
        return new Error('Service temporarily unavailable. Please try again.');
      default:
        return new Error('An unexpected error occurred');
    }
  }
}

export default new DocumentService();
```

### React Component Integration

```typescript
// components/DocumentEditor.tsx
import React, { useState, useEffect } from 'react';
import DocumentService from '../services/DocumentService';
import { Document } from '../generated/document_service_pb';

interface DocumentEditorProps {
  documentId?: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId]);

  const loadDocument = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // API Gateway → Web BFF → Content Service → Database
      const doc = await DocumentService.getDocument(id);
      setDocument(doc);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDocument = async (title: string, content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const newDoc = await DocumentService.createDocument(
        title, 
        content, 
        'current-user-id'
      );
      setDocument(newDoc);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="document-editor">
      <h2>{document?.getTitle() || 'New Document'}</h2>
      <textarea
        value={document?.getContent() || ''}
        onChange={(e) => {
          if (document) {
            document.setContent(e.target.value);
            setDocument(document);
          }
        }}
        placeholder="Start writing..."
      />
      <button 
        onClick={() => saveDocument(
          document?.getTitle() || 'Untitled',
          document?.getContent() || ''
        )}
      >
        Save Document
      </button>
    </div>
  );
};

export default DocumentEditor;
```

---

## 4. Backend for Frontend (BFF) Pattern

### BFF Architecture and Responsibilities

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BFF LAYER ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐        │
│  │          WEB BFF            │    │        MOBILE BFF           │        │
│  │                             │    │                             │        │
│  │  ┌─────────────────────────┐ │    │ ┌─────────────────────────┐ │        │
│  │  │    AGGREGATION LAYER    │ │    │ │    AGGREGATION LAYER    │ │        │
│  │  │                         │ │    │ │                         │ │        │
│  │  │ ┌─────────────────────┐ │ │    │ │ ┌─────────────────────┐ │ │        │
│  │  │ │   Dashboard API     │ │ │    │ │ │   Sync API          │ │ │        │
│  │  │ │                     │ │ │    │ │ │                     │ │ │        │
│  │  │ │ getUserProfile() +  │ │ │    │ │ │ getOfflineData() +  │ │ │        │
│  │  │ │ getRecentDocs() +   │ │ │    │ │ │ syncChanges() +     │ │ │        │
│  │  │ │ getNotifications()  │ │ │    │ │ │ getMinimalUI()      │ │ │        │
│  │  │ │                     │ │ │    │ │ │                     │ │ │        │
│  │  │ │ = Single Response   │ │ │    │ │ │ = Optimized Mobile  │ │ │        │
│  │  │ └─────────────────────┘ │ │    │ │ └─────────────────────┘ │ │        │
│  │  └─────────────────────────┘ │    │ └─────────────────────────┘ │        │
│  │                             │    │                             │        │
│  │  ┌─────────────────────────┐ │    │ ┌─────────────────────────┐ │        │
│  │  │     CACHING LAYER       │ │    │ │     CACHING LAYER       │ │        │
│  │  │                         │ │    │ │                         │ │        │
│  │  │ - Redis Cache           │ │    │ │ - Redis Cache           │ │        │
│  │  │ - Session Storage       │ │    │ │ - Offline Support       │ │        │
│  │  │ - Response Caching      │ │    │ │ - Data Compression      │ │        │
│  │  └─────────────────────────┘ │    │ └─────────────────────────┘ │        │
│  │                             │    │                             │        │
│  │  ┌─────────────────────────┐ │    │ ┌─────────────────────────┐ │        │
│  │  │   TRANSFORMATION        │ │    │ │   TRANSFORMATION        │ │        │
│  │  │        LAYER            │ │    │ │        LAYER            │ │        │
│  │  │                         │ │    │ │                         │ │        │
│  │  │ - Rich Web Response     │ │    │ │ - Minimal Mobile Data   │ │        │
│  │  │ - Full Metadata         │ │    │ │ - Battery Optimization  │ │        │
│  │  │ - Complete HTML/CSS     │ │    │ │ - Network Efficiency    │ │        │
│  │  └─────────────────────────┘ │    │ └─────────────────────────┘ │        │
│  └─────────────────────────────┘    └─────────────────────────────┘        │
│                  │                                   │                     │
│                  │ gRPC calls to microservices       │                     │
│                  │                                   │                     │
└──────────────────┼───────────────────────────────────┼─────────────────────┘
                   │                                   │
                   ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MICROSERVICES LAYER                                 │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │    User     │  │   Content   │  │    Auth     │  │    Search   │       │
│  │   Service   │  │   Service   │  │   Service   │  │   Service   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Web BFF Implementation

```go
// web-bff/main.go
package main

import (
    "context"
    "log"
    "net"
    "sync"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"
    
    webbffpb "github.com/affhausen/web-bff/proto"
    userpb "github.com/affhausen/user-service/proto"
    contentpb "github.com/affhausen/content-service/proto"
    authpb "github.com/affhausen/auth-service/proto"
)

type WebBFFServer struct {
    webbffpb.UnimplementedWebBFFServiceServer
    
    // gRPC clients to microservices
    userClient    userpb.UserServiceClient
    contentClient contentpb.ContentServiceClient
    authClient    authpb.AuthServiceClient
    
    // Redis cache client
    cache RedisCache
}

// Dashboard API - Aggregates multiple service calls
func (s *WebBFFServer) GetDashboardData(ctx context.Context, req *webbffpb.GetDashboardRequest) (*webbffpb.GetDashboardResponse, error) {
    userID := req.GetUserId()
    
    // Validate user authentication
    authReq := &authpb.ValidateTokenRequest{
        Token: req.GetAuthToken(),
    }
    
    authResp, err := s.authClient.ValidateToken(ctx, authReq)
    if err != nil {
        return nil, status.Errorf(codes.Unauthenticated, "Invalid token: %v", err)
    }
    
    if authResp.GetUserId() != userID {
        return nil, status.Errorf(codes.PermissionDenied, "Token user mismatch")
    }
    
    // Check cache first
    cacheKey := fmt.Sprintf("dashboard:%s", userID)
    if cachedData, found := s.cache.Get(cacheKey); found {
        return cachedData.(*webbffpb.GetDashboardResponse), nil
    }
    
    // Parallel calls to multiple services
    var wg sync.WaitGroup
    var userProfile *userpb.GetUserProfileResponse
    var recentDocs *contentpb.GetRecentDocumentsResponse
    var userErr, docsErr error
    
    // Get user profile
    wg.Add(1)
    go func() {
        defer wg.Done()
        userReq := &userpb.GetUserProfileRequest{UserId: userID}
        userProfile, userErr = s.userClient.GetUserProfile(ctx, userReq)
    }()
    
    // Get recent documents
    wg.Add(1)
    go func() {
        defer wg.Done()
        docsReq := &contentpb.GetRecentDocumentsRequest{
            UserId: userID,
            Limit:  10,
        }
        recentDocs, docsErr = s.contentClient.GetRecentDocuments(ctx, docsReq)
    }()
    
    wg.Wait()
    
    // Handle errors
    if userErr != nil {
        return nil, status.Errorf(codes.Internal, "Failed to get user profile: %v", userErr)
    }
    if docsErr != nil {
        return nil, status.Errorf(codes.Internal, "Failed to get recent documents: %v", docsErr)
    }
    
    // Compose aggregated response
    response := &webbffpb.GetDashboardResponse{
        UserProfile: &webbffpb.UserProfile{
            Id:          userProfile.GetUser().GetId(),
            Name:        userProfile.GetUser().GetName(),
            Email:       userProfile.GetUser().GetEmail(),
            AvatarUrl:   userProfile.GetUser().GetAvatarUrl(),
            Preferences: userProfile.GetUser().GetPreferences(),
        },
        RecentDocuments: make([]*webbffpb.DocumentSummary, 0),
        Stats: &webbffpb.DashboardStats{
            TotalDocuments:   recentDocs.GetTotalCount(),
            DocumentsThisWeek: recentDocs.GetWeeklyCount(),
            LastActivity:     recentDocs.GetLastActivity(),
        },
    }
    
    // Transform document data for web UI
    for _, doc := range recentDocs.GetDocuments() {
        summary := &webbffpb.DocumentSummary{
            Id:          doc.GetId(),
            Title:       doc.GetTitle(),
            Excerpt:     s.generateExcerpt(doc.GetContent(), 150), // Web gets longer excerpts
            CreatedAt:   doc.GetCreatedAt(),
            UpdatedAt:   doc.GetUpdatedAt(),
            Tags:        doc.GetTags(),
            WordCount:   int32(len(strings.Fields(doc.GetContent()))),
            IsShared:    doc.GetIsShared(),
            ShareUrl:    doc.GetShareUrl(),
        }
        response.RecentDocuments = append(response.RecentDocuments, summary)
    }
    
    // Cache the response for 5 minutes
    s.cache.Set(cacheKey, response, 5*time.Minute)
    
    return response, nil
}

// Document creation with web-specific features
func (s *WebBFFServer) CreateDocument(ctx context.Context, req *webbffpb.CreateDocumentRequest) (*webbffpb.CreateDocumentResponse, error) {
    // Validate authentication
    authReq := &authpb.ValidateTokenRequest{Token: req.GetAuthToken()}
    authResp, err := s.authClient.ValidateToken(ctx, authReq)
    if err != nil {
        return nil, status.Errorf(codes.Unauthenticated, "Invalid token: %v", err)
    }
    
    // Create document via content service
    contentReq := &contentpb.CreateDocumentRequest{
        Title:    req.GetTitle(),
        Content:  req.GetContent(),
        AuthorId: authResp.GetUserId(),
        Tags:     req.GetTags(),
        // Web-specific features
        EnableVersioning:     true,  // Web clients get versioning
        EnableCollaboration: true,  // Web clients get real-time collab
        AutoSave:            true,  // Web clients get auto-save
    }
    
    contentResp, err := s.contentClient.CreateDocument(ctx, contentReq)
    if err != nil {
        return nil, status.Errorf(codes.Internal, "Failed to create document: %v", err)
    }
    
    // Invalidate dashboard cache
    cacheKey := fmt.Sprintf("dashboard:%s", authResp.GetUserId())
    s.cache.Delete(cacheKey)
    
    // Return web-optimized response
    return &webbffpb.CreateDocumentResponse{
        Document: &webbffpb.Document{
            Id:        contentResp.GetDocument().GetId(),
            Title:     contentResp.GetDocument().GetTitle(),
            Content:   contentResp.GetDocument().GetContent(),
            AuthorId:  contentResp.GetDocument().GetAuthorId(),
            CreatedAt: contentResp.GetDocument().GetCreatedAt(),
            UpdatedAt: contentResp.GetDocument().GetUpdatedAt(),
            Tags:      contentResp.GetDocument().GetTags(),
            // Web-specific fields
            EditUrl:            fmt.Sprintf("/documents/%s/edit", contentResp.GetDocument().GetId()),
            ShareUrl:           fmt.Sprintf("/documents/%s/share", contentResp.GetDocument().GetId()),
            VersionHistory:     []*webbffpb.DocumentVersion{}, // Populated separately
            CollaborationToken: s.generateCollabToken(contentResp.GetDocument().GetId()),
        },
    }, nil
}

func (s *WebBFFServer) generateExcerpt(content string, maxLength int) string {
    if len(content) <= maxLength {
        return content
    }
    return content[:maxLength] + "..."
}

func (s *WebBFFServer) generateCollabToken(documentID string) string {
    // Generate JWT token for real-time collaboration
    // Implementation details...
    return "collab_token_" + documentID
}
```

---

## 5. Protocol Translation and Routing

### Request Flow Through API Gateway

```
=== React gRPC-Web Request Flow ===

Step 1: React Component makes gRPC-Web call
┌─────────────────────────────────────────────────────────────┐
│ DocumentService.createDocument("My Doc", "Content", "user1") │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
Step 2: gRPC-Web Client generates HTTP/1.1 request
┌─────────────────────────────────────────────────────────────┐
│ POST /web.bff.v1.WebBFFService/CreateDocument HTTP/1.1     │
│ Host: api.affhausen.com                                     │
│ Content-Type: application/grpc-web+proto                   │
│ Authorization: Bearer <jwt_token>                           │
│ X-Client-Type: web                                          │
│                                                             │
│ [Binary protobuf payload]                                   │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
Step 3: API Gateway (Envoy) receives request
┌─────────────────────────────────────────────────────────────┐
│ Envoy Proxy Processing:                                     │
│                                                             │
│ 1. CORS Validation                                          │
│    ✓ Origin: https://app.affhausen.com allowed             │
│    ✓ Method: POST allowed                                   │
│    ✓ Headers: Content-Type, Authorization allowed          │
│                                                             │
│ 2. Route Matching                                           │
│    ✓ /web.bff.v1/ → web_bff_cluster                        │
│                                                             │
│ 3. Protocol Translation                                     │
│    HTTP/1.1 + gRPC-Web → HTTP/2 + gRPC                     │
│                                                             │
│ 4. Load Balancing                                           │
│    Round Robin → web-bff-service:9090                      │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
Step 4: Envoy forwards to Web BFF as native gRPC
┌─────────────────────────────────────────────────────────────┐
│ gRPC HTTP/2 Request to Web BFF:                             │
│                                                             │
│ :method: POST                                               │
│ :scheme: https                                              │
│ :path: /web.bff.v1.WebBFFService/CreateDocument             │
│ :authority: web-bff-service:9090                            │
│ content-type: application/grpc                              │
│ authorization: Bearer <jwt_token>                           │
│ x-client-type: web                                          │
│ grpc-encoding: identity                                     │
│                                                             │
│ [Binary protobuf payload - same as step 2]                 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
Step 5: Web BFF processes request and calls microservices
┌─────────────────────────────────────────────────────────────┐
│ Web BFF Internal Flow:                                      │
│                                                             │
│ 1. Validate JWT token → Auth Service                        │
│ 2. Extract user context                                     │
│ 3. Call Content Service to create document                  │
│ 4. Add web-specific features (versioning, collaboration)    │
│ 5. Compose response with web UI optimizations               │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
Step 6: Response flows back through same path
┌─────────────────────────────────────────────────────────────┐
│ Web BFF → Envoy → React Client                              │
│                                                             │
│ gRPC → gRPC-Web → JavaScript Promise                        │
└─────────────────────────────────────────────────────────────┘
```

### Protocol Translation Details

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROTOCOL TRANSLATION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INCOMING (gRPC-Web from Browser)                               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ POST /service/method HTTP/1.1                              ││
│  │ Content-Type: application/grpc-web+proto                   ││
│  │ Accept: application/grpc-web+proto                         ││
│  │                                                             ││
│  │ [gRPC-Web Frame]                                            ││
│  │ ┌─────────────────────────────────────────────────────────┐ ││
│  │ │ 0x00                    │ Compression Flag (1 byte)     │ ││
│  │ │ 0x00 0x00 0x00 0x10     │ Message Length (4 bytes)      │ ││
│  │ │ [protobuf binary data]  │ Serialized Message            │ ││
│  │ └─────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                │                                │
│                                │ Envoy Translation              │
│                                ▼                                │
│  OUTGOING (Native gRPC to Backend)                              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ POST /service/method HTTP/2                                 ││
│  │ :method: POST                                               ││
│  │ :scheme: https                                              ││
│  │ :path: /service/method                                      ││
│  │ content-type: application/grpc                              ││
│  │ grpc-encoding: identity                                     ││
│  │                                                             ││
│  │ [gRPC Frame]                                                ││
│  │ ┌─────────────────────────────────────────────────────────┐ ││
│  │ │ 0x00                    │ Compression Flag (1 byte)     │ ││
│  │ │ 0x00 0x00 0x00 0x10     │ Message Length (4 bytes)      │ ││
│  │ │ [protobuf binary data]  │ Same Serialized Message       │ ││
│  │ └─────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  KEY DIFFERENCES:                                               │
│  • HTTP/1.1 ↔ HTTP/2 protocol version                          │
│  • Header format (HTTP/1.1 vs HTTP/2 pseudo-headers)           │
│  • Connection handling (request/response vs stream)            │
│  • CORS support added for browser compatibility                │
│  • Content-Type translation for gRPC compatibility             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Complete Request Flow

### End-to-End Flow Visualization

```
USER ACTION: User clicks "Create Document" in React app
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STEP 1: CLIENT SIDE                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
React Component: DocumentEditor.tsx
├─ User fills form: title="My Document", content="Hello World"
├─ onClick handler calls: DocumentService.createDocument()
└─ gRPC-Web client generates protobuf request
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STEP 2: NETWORK LAYER                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
HTTP/1.1 Request to API Gateway:
┌─────────────────────────────────────────────────────────────────┐
│ POST /web.bff.v1.WebBFFService/CreateDocument HTTP/1.1         │
│ Host: api.affhausen.com                                         │
│ Content-Type: application/grpc-web+proto                       │
│ Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  │
│ Origin: https://app.affhausen.com                               │
│ X-Client-Type: web                                              │
│ X-Request-ID: req_12345                                         │
│                                                                 │
│ [Binary Protobuf Payload: CreateDocumentRequest]               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STEP 3: API GATEWAY                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
Envoy Proxy Processing:
├─ 1. CORS Pre-flight check ✓
├─ 2. Rate limiting check ✓ (within limits)
├─ 3. Route matching: /web.bff.v1/ → web_bff_cluster
├─ 4. Load balancing: Round robin → web-bff-instance-1
├─ 5. Protocol translation: gRPC-Web → gRPC
├─ 6. Security headers validation ✓
└─ 7. Forward request as HTTP/2 gRPC
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STEP 4: WEB BFF                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
Web BFF Service Processing:
├─ 1. Receive gRPC request
├─ 2. Extract JWT token from metadata
├─ 3. Validate token with Auth Service
│     │
│     └─ gRPC Call: auth.ValidateToken(token)
│        Response: user_id="user_123", valid=true
│
├─ 4. Check Redis cache for user permissions ✓
├─ 5. Prepare request for Content Service
└─ 6. Call Content Service with enriched context
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STEP 5: MICROSERVICES                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
Content Service Processing:
├─ 1. Receive CreateDocument request
├─ 2. Validate request parameters
├─ 3. Generate unique document ID: doc_789
├─ 4. Store document in database
│     │
│     └─ MongoDB Insert:
│        {
│          id: "doc_789",
│          title: "My Document", 
│          content: "Hello World",
│          author_id: "user_123",
│          created_at: "2024-01-15T10:30:00Z",
│          tags: [],
│          version: 1
│        }
│
├─ 5. Create search index entry
├─ 6. Initialize version history
└─ 7. Return document data
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STEP 6: RESPONSE FLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
Response flows back through same path:

Content Service → Web BFF:
┌─────────────────────────────────────────────────────────────────┐
│ CreateDocumentResponse {                                        │
│   document: {                                                   │
│     id: "doc_789",                                              │
│     title: "My Document",                                       │
│     content: "Hello World",                                     │
│     author_id: "user_123",                                      │
│     created_at: "2024-01-15T10:30:00Z"                          │
│   }                                                             │
│ }                                                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
Web BFF → API Gateway:
├─ Add web-specific fields (edit_url, share_url, collaboration_token)
├─ Invalidate dashboard cache for user
├─ Log successful creation event
└─ Return enriched response
                                │
                                ▼
API Gateway → React Client:
├─ Translate gRPC → gRPC-Web
├─ Add CORS headers
├─ Convert HTTP/2 → HTTP/1.1
└─ Return to browser
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STEP 7: CLIENT UPDATE                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
React Component Updates:
├─ Promise resolves with document data
├─ Component state updated with new document
├─ UI shows success message
├─ Document editor populated with saved content
├─ URL updated to /documents/doc_789/edit
└─ Dashboard cache invalidated (will refresh on next visit)

Final Result: User sees their document saved and can continue editing
```

---

## 7. Implementation Examples

### Complete React Application Setup

```typescript
// src/config/grpc.ts
export const GRPC_CONFIG = {
  apiGatewayUrl: process.env.REACT_APP_API_GATEWAY_URL || 'https://api.affhausen.com',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

// src/services/GrpcBaseService.ts
import { grpc } from '@improbable-eng/grpc-web';
import { GRPC_CONFIG } from '../config/grpc';

export abstract class GrpcBaseService {
  protected readonly baseUrl: string;
  protected readonly defaultMetadata: grpc.Metadata;

  constructor() {
    this.baseUrl = GRPC_CONFIG.apiGatewayUrl;
    this.defaultMetadata = this.createDefaultMetadata();
  }

  protected createDefaultMetadata(): grpc.Metadata {
    const metadata = new grpc.Metadata();
    metadata.set('x-client-type', 'web');
    metadata.set('x-client-version', process.env.REACT_APP_VERSION || '1.0.0');
    
    const token = this.getAuthToken();
    if (token) {
      metadata.set('authorization', `Bearer ${token}`);
    }
    
    return metadata;
  }

  protected getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  protected handleGrpcError(error: grpc.RpcError): Error {
    console.error('gRPC Error:', {
      code: error.code,
      message: error.message,
      metadata: error.metadata
    });

    switch (error.code) {
      case grpc.Code.Unauthenticated:
        // Redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
        return new Error('Please log in to continue');
      
      case grpc.Code.PermissionDenied:
        return new Error('You do not have permission to perform this action');
      
      case grpc.Code.NotFound:
        return new Error('The requested resource was not found');
      
      case grpc.Code.Unavailable:
        return new Error('Service temporarily unavailable. Please try again.');
      
      case grpc.Code.DeadlineExceeded:
        return new Error('Request timed out. Please try again.');
      
      default:
        return new Error(error.message || 'An unexpected error occurred');
    }
  }
}
```

### BFF Protocol Definitions

```protobuf
// web-bff/proto/web_bff.proto
syntax = "proto3";

package web.bff.v1;

import "google/protobuf/timestamp.proto";

// Web BFF Service - Optimized for web client needs
service WebBFFService {
  // Aggregated dashboard data for web UI
  rpc GetDashboardData(GetDashboardRequest) returns (GetDashboardResponse);
  
  // Document operations with web-specific features
  rpc CreateDocument(CreateDocumentRequest) returns (CreateDocumentResponse);
  rpc GetDocument(GetDocumentRequest) returns (GetDocumentResponse);
  rpc UpdateDocument(UpdateDocumentRequest) returns (UpdateDocumentResponse);
  
  // Web-specific batch operations
  rpc GetMultipleDocuments(GetMultipleDocumentsRequest) returns (GetMultipleDocumentsResponse);
  rpc BulkUpdateDocuments(BulkUpdateDocumentsRequest) returns (BulkUpdateDocumentsResponse);
  
  // Real-time collaboration
  rpc JoinCollaborationSession(JoinCollaborationRequest) returns (stream CollaborationUpdate);
}

// Dashboard aggregation - combines multiple service data
message GetDashboardRequest {
  string user_id = 1;
  string auth_token = 2;
  bool include_stats = 3;
  bool include_recent_activity = 4;
}

message GetDashboardResponse {
  UserProfile user_profile = 1;
  repeated DocumentSummary recent_documents = 2;
  DashboardStats stats = 3;
  repeated ActivityItem recent_activity = 4;
  repeated Notification notifications = 5;
}

// Web-optimized user profile
message UserProfile {
  string id = 1;
  string name = 2;
  string email = 3;
  string avatar_url = 4;
  repeated string preferences = 5;
  // Web-specific fields
  string dashboard_layout = 6;
  string theme = 7;
  bool email_notifications = 8;
}

// Web-optimized document summary
message DocumentSummary {
  string id = 1;
  string title = 2;
  string excerpt = 3; // Longer excerpt for web (150 chars vs 50 for mobile)
  google.protobuf.Timestamp created_at = 4;
  google.protobuf.Timestamp updated_at = 5;
  repeated string tags = 6;
  // Web-specific fields
  int32 word_count = 7;
  bool is_shared = 8;
  string share_url = 9;
  string edit_url = 10;
  int32 collaboration_count = 11; // Number of active collaborators
}

// Web-specific document creation
message CreateDocumentRequest {
  string title = 1;
  string content = 2;
  repeated string tags = 3;
  string auth_token = 4;
  // Web-specific options
  bool enable_collaboration = 5;
  bool enable_public_sharing = 6;
  string template_id = 7;
}

message CreateDocumentResponse {
  Document document = 1;
  string collaboration_token = 2; // JWT for real-time editing
  string edit_url = 3;
  string share_url = 4;
}

// Rich document object for web
message Document {
  string id = 1;
  string title = 2;
  string content = 3;
  string author_id = 4;
  google.protobuf.Timestamp created_at = 5;
  google.protobuf.Timestamp updated_at = 6;
  repeated string tags = 7;
  // Web-specific rich data
  repeated DocumentVersion version_history = 8;
  repeated Collaborator active_collaborators = 9;
  DocumentPermissions permissions = 10;
  DocumentStats stats = 11;
}

message DocumentVersion {
  int32 version = 1;
  google.protobuf.Timestamp created_at = 2;
  string author_id = 3;
  string change_summary = 4;
  int32 characters_added = 5;
  int32 characters_removed = 6;
}

message Collaborator {
  string user_id = 1;
  string name = 2;
  string avatar_url = 3;
  google.protobuf.Timestamp last_seen = 4;
  string cursor_position = 5; // For real-time cursor display
}

message DocumentPermissions {
  bool can_edit = 1;
  bool can_share = 2;
  bool can_delete = 3;
  bool can_invite_collaborators = 4;
}

message DocumentStats {
  int32 word_count = 1;
  int32 character_count = 2;
  int32 paragraph_count = 3;
  int32 view_count = 4;
  int32 share_count = 5;
  google.protobuf.Timestamp last_viewed = 6;
}

// Real-time collaboration
message JoinCollaborationRequest {
  string document_id = 1;
  string collaboration_token = 2;
}

message CollaborationUpdate {
  oneof update_type {
    TextEdit text_edit = 1;
    CursorPosition cursor_position = 2;
    UserJoined user_joined = 3;
    UserLeft user_left = 4;
    DocumentSaved document_saved = 5;
  }
}

message TextEdit {
  string user_id = 1;
  int32 position = 2;
  string operation = 3; // "insert", "delete", "replace"
  string content = 4;
  int32 length = 5; // For delete operations
  google.protobuf.Timestamp timestamp = 6;
}
```

This comprehensive guide shows how API Gateways, React gRPC-Web clients, and BFF services work together in a modern microservices architecture. The key benefits include:

1. **Protocol Translation**: Seamless conversion between gRPC-Web and native gRPC
2. **Client Optimization**: BFF services provide client-specific data aggregation and formatting
3. **Scalability**: Load balancing, caching, and circuit breaking at the gateway level
4. **Security**: Centralized authentication, CORS handling, and rate limiting
5. **Developer Experience**: Type-safe APIs across all platforms with single source of truth (.proto files)

The architecture enables efficient, type-safe communication between modern web applications and microservices while maintaining performance and scalability.
