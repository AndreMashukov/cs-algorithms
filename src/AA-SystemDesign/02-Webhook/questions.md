
# System Design: Webhook Service

### Q1: What is the most critical non-functional requirement for this webhook service, as emphasized by the design?
1. Storing event data for 60 days for long-term analysis.
2. Ensuring end-to-end latency is under 50 milliseconds.
3. Guaranteeing at-least-once processing of every accepted event.
4. Providing a dashboard for clients to view webhook status.

### Q2: In the proposed high-level design, what does a successful HTTP 200 response from the `/webhook` endpoint signify to the external client?
1. The event has been fully processed and the corresponding business logic has been executed.
2. The event has been successfully received and buffered for asynchronous processing.
3. The event has been validated, and the database has been updated.
4. The event was authenticated, but processing has not yet started.

### Q3: Based on the scale requirements (1 million events/day, 5KB/event, 30-day retention), what is the total estimated storage needed for the event data?
1. 1.5 GB
2. 15 GB
3. 150 GB
4. 1.5 TB

### Q4: The primary architectural shift from the basic design to the high-level design involves introducing a message queue. What is the main problem this solves?
1. It reduces the number of database connections required.
2. It allows the service to handle different event types.
3. It decouples the initial request handling from the actual event processing, improving reliability and load buffering.
4. It simplifies the request handler's code by moving all logic to the consumer.

### Q5: What is the primary responsibility of the Request Handler in the final proposed architecture?
1. To process the event's business logic and update the database.
2. To validate the event schema, enqueue it into the message queue, and return a success response.
3. To hold the connection open until the Queue Consumer confirms the event has been processed.
4. To perform HMAC signature verification and then directly save the event to the database.

### Q6: Which component is best suited for horizontal auto-scaling in response to a sudden spike in webhook events?
1. The Request Handler, as it is the public-facing entry point.
2. The Database, to handle more concurrent writes.
3. The Queue Consumer instances, based on the length of the message queue.
4. The Message Queue itself, by adding more topics.

### Q7: How does the system ensure that an event is not lost if a Queue Consumer fails after fetching the event but before persisting the results?
1. The Request Handler will re-enqueue the event after a timeout.
2. The message is only dequeued after the consumer successfully processes it and stores the result, so another consumer can pick it up.
3. The database uses a transaction log to recover the failed operation.
4. The client service is responsible for retrying the request until it receives a confirmation of processing.

### Q8: What is the purpose of using HMAC signatures for securing the webhook service?
1. To encrypt the event payload so that its contents cannot be read during transit.
2. To verify that the incoming request is from an authorized provider and that the payload has not been tampered with.
3. To limit the number of requests a client can send in a given time frame.
4. To ensure that events are processed in the correct order.

### Q9: What is a key limitation of relying solely on IP Whitelisting for security?
1. It cannot prevent replay attacks from a compromised, whitelisted IP.
2. It is computationally expensive to check the IP address for every request.
3. It does not protect against Denial-of-Service (DoS) attacks.
4. It is not effective if the provider's IP addresses change, and it doesn't verify the message integrity.

### Q10: To handle duplicate requests, the design suggests using idempotency keys. How does this mechanism work?
1. By hashing the entire request payload and checking if the hash has been seen before.
2. By requiring the client to provide a unique token, which the service stores to ignore subsequent requests with the same token.
3. By using a message queue that automatically discards messages with identical content.
4. By rate-limiting requests from the same client to prevent them from sending duplicates.

### Q11: When designing the database schema for storing events, which two fields are most crucial for handling idempotency and out-of-order events?
1. `event_payload` and `processing_status`.
2. `event_id` and `event_timestamp`.
3. `client_ip` and `request_headers`.
4. `consumer_id` and `processing_duration`.

### Q12: How does the proposed system handle an `invoice.paid` event that arrives before the corresponding `invoice.created` event?
1. It rejects the `invoice.paid` event and asks the client to resend it later.
2. It queues the `invoice.paid` event in a separate, delayed queue until the `invoice.created` event arrives.
3. It processes the `invoice.paid` event by fetching the latest invoice data from the source of truth (e.g., Stripe's API) and then ignores the older `invoice.created` event when it arrives.
4. It assumes the invoice was created implicitly and processes the payment, risking data inconsistency.

### Q13: What is the primary benefit of making the webhook processing logic stateless?
1. It reduces the memory footprint of the Queue Consumers.
2. It allows any consumer instance to process any event, simplifying scaling and failure recovery.
3. It eliminates the need for a database.
4. It makes the service faster by avoiding network calls.

### Q14: If the message queue server crashes but uses durable queues, what happens to the events?
1. The events are lost, and clients must resend them.
2. The events are persisted to disk and will be available for processing once the queue server restarts.
3. The events are automatically rerouted to a backup database.
4. The Request Handler holds the events in memory until the queue is back online.

### Q15: What is the recommended strategy if a Queue Consumer fails to write to the database due to a transient error?
1. Immediately move the event to a dead-letter queue.
2. Discard the event and log the error.
3. Retry the write operation with an exponential backoff strategy.
4. Alert an operator to manually resolve the database issue.

### Q16: At the specified scale of 1 million events per day with a 5x peak, what is the approximate peak number of requests per second (RPS) the system must handle?
1. ~12 RPS
2. ~58 RPS
3. ~116 RPS
4. ~580 RPS

### Q17: Why is it beneficial for the Request Handler to return a `200 OK` response immediately after enqueuing the event?
1. It proves to the client that the event has been fully processed.
2. It frees up the client from waiting, improving the perceived performance and preventing client-side timeouts.
3. It reduces the load on the message queue.
4. It confirms that the database write was successful.

### Q18: In the context of failure handling, what is the primary purpose of running multiple Queue Consumer instances?
1. To process different types of events in parallel.
2. To provide fault tolerance and high availability, ensuring events are still processed if one instance fails.
3. To reduce the cost of the message queue.
4. To allow for different business logic to be applied to the same event.

### Q19: The design document states that the system should not make assumptions about the order of events. What does this imply for the processing logic?
1. The system must use a priority queue to re-order events before processing.
2. The processing logic must be idempotent and capable of handling events based on their state, not their arrival sequence.
3. The system should reject any event that arrives out of order.
4. The Request Handler is responsible for re-ordering events before enqueuing them.

### Q20: When implementing HMAC signature verification, who is responsible for generating the signature and who is responsible for verifying it?
1. The client generates it, and the message queue verifies it.
2. The webhook provider (e.g., Stripe) generates it, and our webhook service verifies it.
3. Our webhook service generates it upon receipt, and the Queue Consumer verifies it.
4. The database generates it upon write, and the client verifies it.
