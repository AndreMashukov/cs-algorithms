Hi Andrey, thanks for your message. I have been looking to implement gRPC due to its low latency, aiming for a smooth user experience.



We are currently working on the web app. Later, I plan to expand it to macOS, Windows, and other platforms in the future.



Function of gRPC in the AFFHAUSEN Tech Stack
Backend services and API communication.



Microservices Communication:
Microservices architecture, user management, content processing, or database access
Low-latency and high-throughput capabilities for real-time features, such as live collaboration or content updates



API Backend for Web Clients
Backend APIs web frontend (likely built with a framework like React or Vue.js)
Using gRPC-Web, a JavaScript library to communicate directly with gRPC services from the browser, bridging the gap between HTTP/1.1 (browser) and HTTP/2 (gRPC server).



Scalability and Performance:
For cases where users need to handle large volumes of user-generated content or real-time interactions (gRPC’s efficient serialization and HTTP/2 multiplexing reduce server load and improve response times)
Bidirectional streaming - support features like real-time notifications or collaborative editing.



Cross-Platform Consistency:
Supports FUTURE multiple platforms (e.g., web, iOS, Android)
The same .proto file can generate client libraries for JavaScript (web), Swift (iOS), and Kotlin (Android), maintaining consistency.



Extensibility:
gRPC’s strongly typed .proto files will make it easy to evolve APIs over time while maintaining backward compatibility, crucial for iterative development.

Positioning in the Tech Stack
-Frontend: WRITAB’s web app (e.g., React) uses gRPC-Web to communicate with backend services.
-Backend: gRPC services (e.g., in Go, Python, or Node.js) handle business logic, database interactions, and real-time features.
-Transport Layer: HTTP/2 ensures efficient communication, with TLS for security.
-Data Layer: gRPC services integrate with WRITAB’s database (e.g., MongoDB for documents or PostgreSQL for user data).
-DevOps: gRPC works with Kubernetes or other orchestration tools for load balancing and scaling WRITAB’s services.



Feedback - When to Use gRPC in AFFHAUSEN web app
-Use gRPC: For internal microservices communication, real-time features, or performance-critical APIs.
-Avoid gRPC: For simple REST APIs where JSON over HTTP/1.1 is sufficient, or when browser compatibility is a concern (though gRPC-Web mitigates this).