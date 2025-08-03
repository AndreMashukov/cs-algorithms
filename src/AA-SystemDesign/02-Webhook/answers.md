
# System Design: Webhook Service - Answers

### Q1: What is the most critical non-functional requirement for this webhook service, as emphasized by the design?
1. Storing event data for 60 days for long-term analysis.
2. Ensuring end-to-end latency is under 50 milliseconds.
3. Guaranteeing at-least-once processing of every accepted event.
4. Providing a dashboard for clients to view webhook status.

**Answer: 3**
**Explanation:** The design document repeatedly emphasizes reliability and resilience. The entire architecture, with its message queue and acknowledgment mechanism, is built to ensure that once an event is accepted (HTTP 200), it is processed at least once, even if components fail. This is the most critical requirement for systems handling important events like payments.

***

### Q2: In the proposed high-level design, what does a successful HTTP 200 response from the `/webhook` endpoint signify to the external client?
1. The event has been fully processed and the corresponding business logic has been executed.
2. The event has been successfully received and buffered for asynchronous processing.
3. The event has been validated, and the database has been updated.
4. The event was authenticated, but processing has not yet started.

**Answer: 2**
**Explanation:** The Request Handler's job is to do the minimum work required before acknowledging receipt. In the proposed design, this means enqueuing the event into the message queue. The HTTP 200 response tells the client, "I have safely received your event and will process it," but the actual processing happens later, asynchronously.

***

### Q3: Based on the scale requirements (1 million events/day, 5KB/event, 30-day retention), what is the total estimated storage needed for the event data?
1. 1.5 GB
2. 15 GB
3. 150 GB
4. 1.5 TB

**Answer: 3**
**Explanation:** The calculation is: 1,000,000 events/day * 5 KB/event * 30 days = 150,000,000 KB. Converting to GB (1,000,000 KB ≈ 1 GB), this is approximately 150 GB. This capacity estimation is crucial for selecting the right database and storage solution.

***

### Q4: The primary architectural shift from the basic design to the high-level design involves introducing a message queue. What is the main problem this solves?
1. It reduces the number of database connections required.
2. It allows the service to handle different event types.
3. It decouples the initial request handling from the actual event processing, improving reliability and load buffering.
4. It simplifies the request handler's code by moving all logic to the consumer.

**Answer: 3**
**Explanation:** The message queue acts as a buffer. It allows the request handler to quickly accept incoming events without waiting for the slower processing and database-write steps to complete. This decoupling is key to handling traffic spikes (load buffering) and ensuring event processing can be retried if a consumer fails (reliability).

***

### Q5: What is the primary responsibility of the Request Handler in the final proposed architecture?
1. To process the event's business logic and update the database.
2. To validate the event schema, enqueue it into the message queue, and return a success response.
3. To hold the connection open until the Queue Consumer confirms the event has been processed.
4. To perform HMAC signature verification and then directly save the event to the database.

**Answer: 2**
**Explanation:** The Request Handler should be lightweight. Its main jobs are to receive the request, perform initial validation (like checking for a valid format), push the event to the message queue for later processing, and then immediately acknowledge receipt to the client.

***

### Q6: Which component is best suited for horizontal auto-scaling in response to a sudden spike in webhook events?
1. The Request Handler, as it is the public-facing entry point.
2. The Database, to handle more concurrent writes.
3. The Queue Consumer instances, based on the length of the message queue.
4. The Message Queue itself, by adding more topics.

**Answer: 3**
**Explanation:** The length of the message queue is a direct indicator of the processing backlog. If the queue grows, it means events are arriving faster than they are being processed. The most effective response is to scale out the number of Queue Consumers to increase the processing throughput and work through the queue faster.

***

### Q7: How does the system ensure that an event is not lost if a Queue Consumer fails after fetching the event but before persisting the results?
1. The Request Handler will re-enqueue the event after a timeout.
2. The message is only dequeued after the consumer successfully processes it and stores the result, so another consumer can pick it up.
3. The database uses a transaction log to recover the failed operation.
4. The client service is responsible for retrying the request until it receives a confirmation of processing.

**Answer: 2**
**Explanation:** This is a fundamental principle of reliable message queue processing. The consumer "leases" the message, and only upon successful completion of its work does it send an acknowledgment (ACK) to the queue to permanently delete the message. If the consumer crashes, the lease expires, and the message becomes visible again for another consumer to process.

***

### Q8: What is the purpose of using HMAC signatures for securing the webhook service?
1. To encrypt the event payload so that its contents cannot be read during transit.
2. To verify that the incoming request is from an authorized provider and that the payload has not been tampered with.
3. To limit the number of requests a client can send in a given time frame.
4. To ensure that events are processed in the correct order.

**Answer: 2**
**Explanation:** HMAC (Hash-based Message Authentication Code) uses a shared secret to create a signature for the message payload. This allows the service to verify two things: the identity of the sender (authenticity) and that the message content hasn't been altered in transit (integrity). It does not encrypt the data.

***

### Q9: What is a key limitation of relying solely on IP Whitelisting for security?
1. It cannot prevent replay attacks from a compromised, whitelisted IP.
2. It is computationally expensive to check the IP address for every request.
3. It does not protect against Denial-of-Service (DoS) attacks.
4. It is not effective if the provider's IP addresses change, and it doesn't verify the message integrity.

**Answer: 4**
**Explanation:** IP whitelisting only validates the source of the request. It doesn't protect against payload tampering (integrity) or guarantee the sender is who they claim to be if the IP is spoofed or compromised. Furthermore, it can be brittle if the provider changes their sending IP addresses without notice.

***

### Q10: To handle duplicate requests, the design suggests using idempotency keys. How does this mechanism work?
1. By hashing the entire request payload and checking if the hash has been seen before.
2. By requiring the client to provide a unique token, which the service stores to ignore subsequent requests with the same token.
3. By using a message queue that automatically discards messages with identical content.
4. By rate-limiting requests from the same client to prevent them from sending duplicates.

**Answer: 2**
**Explanation:** An idempotency key is a unique identifier provided by the client (e.g., `event_id`). The server records this key upon first processing the request. If another request arrives with the same key, the server recognizes it as a duplicate and can safely skip processing it again, typically by returning a cached response.

***

### Q11: When designing the database schema for storing events, which two fields are most crucial for handling idempotency and out-of-order events?
1. `event_payload` and `processing_status`.
2. `event_id` and `event_timestamp`.
3. `client_ip` and `request_headers`.
4. `consumer_id` and `processing_duration`.

**Answer: 2**
**Explanation:** The `event_id` serves as the idempotency key to detect and discard duplicate events. The `event_timestamp` is essential for determining if an event is outdated (e.g., an `invoice.created` event arriving after the `invoice.paid` event for the same invoice) and should be skipped.

***

### Q12: How does the proposed system handle an `invoice.paid` event that arrives before the corresponding `invoice.created` event?
1. It rejects the `invoice.paid` event and asks the client to resend it later.
2. It queues the `invoice.paid` event in a separate, delayed queue until the `invoice.created` event arrives.
3. It processes the `invoice.paid` event by fetching the latest invoice data from the source of truth (e.g., Stripe's API) and then ignores the older `invoice.created` event when it arrives.
4. It assumes the invoice was created implicitly and processes the payment, risking data inconsistency.

**Answer: 3**
**Explanation:** The most robust approach is to not rely on the local state or the order of events. When a significant event like `invoice.paid` arrives, the consumer should use the event's ID to fetch the canonical, up-to-date state from the source of truth (the provider's API). This makes the processing stateless and resilient to ordering issues.

***

### Q13: What is the primary benefit of making the webhook processing logic stateless?
1. It reduces the memory footprint of the Queue Consumers.
2. It allows any consumer instance to process any event, simplifying scaling and failure recovery.
3. It eliminates the need for a database.
4. It makes the service faster by avoiding network calls.

**Answer: 2**
**Explanation:** If consumers are stateless, they don't hold any session-specific data. This means any available consumer can process any event from the queue. This simplifies load balancing, makes it easy to scale by adding more identical consumers, and ensures that if one consumer fails, another can seamlessly take over its work.

***

### Q14: If the message queue server crashes but uses durable queues, what happens to the events?
1. The events are lost, and clients must resend them.
2. The events are persisted to disk and will be available for processing once the queue server restarts.
3. The events are automatically rerouted to a backup database.
4. The Request Handler holds the events in memory until the queue is back online.

**Answer: 2**
**Explanation:** Durability is a key feature of reliable message queues. It means messages are written to persistent storage (like a hard drive). This ensures that even in the event of a server crash or restart, the messages are not lost and will be available for processing once the service recovers.

***

### Q15: What is the recommended strategy if a Queue Consumer fails to write to the database due to a transient error?
1. Immediately move the event to a dead-letter queue.
2. Discard the event and log the error.
3. Retry the write operation with an exponential backoff strategy.
4. Alert an operator to manually resolve the database issue.

**Answer: 3**
**Explanation:** Transient errors (like a brief network partition or a temporary database overload) are often resolved quickly. An exponential backoff strategy (retrying with increasing delays) is the standard, automated way to handle these without overwhelming the database or immediately giving up on the event.

***

### Q16: At the specified scale of 1 million events per day with a 5x peak, what is the approximate peak number of requests per second (RPS) the system must handle?
1. ~12 RPS
2. ~58 RPS
3. ~116 RPS
4. ~580 RPS

**Answer: 2**
**Explanation:** Calculation: (1,000,000 events / 24 hours / 3600 seconds/hour) ≈ 11.57 RPS on average. During peak hours, this is multiplied by 5: 11.57 * 5 ≈ 57.8 RPS. This helps in provisioning the Request Handler layer.

***

### Q17: Why is it beneficial for the Request Handler to return a `200 OK` response immediately after enqueuing the event?
1. It proves to the client that the event has been fully processed.
2. It frees up the client from waiting, improving the perceived performance and preventing client-side timeouts.
3. It reduces the load on the message queue.
4. It confirms that the database write was successful.

**Answer: 2**
**Explanation:** Webhook providers often have short timeouts. By responding quickly, our service ensures the provider knows the event was received successfully. This prevents the provider from assuming a failure and retrying, which would create unnecessary duplicate events. It makes the interaction efficient and reliable from the client's perspective.

***

### Q18: In the context of failure handling, what is the primary purpose of running multiple Queue Consumer instances?
1. To process different types of events in parallel.
2. To provide fault tolerance and high availability, ensuring events are still processed if one instance fails.
3. To reduce the cost of the message queue.
4. To allow for different business logic to be applied to the same event.

**Answer: 2**
**Explanation:** Having multiple consumers is a core principle of high availability. If one consumer instance crashes or becomes unresponsive, the other instances can continue to pull events from the queue, ensuring the processing pipeline doesn't halt. This provides resilience against individual component failures.

***

### Q19: The design document states that the system should not make assumptions about the order of events. What does this imply for the processing logic?
1. The system must use a priority queue to re-order events before processing.
2. The processing logic must be idempotent and capable of handling events based on their state, not their arrival sequence.
3. The system should reject any event that arrives out of order.
4. The Request Handler is responsible for re-ordering events before enqueuing them.

**Answer: 2**
**Explanation:** Since network delivery is inherently unreliable and can lead to out-of-order messages, a robust system cannot depend on the arrival sequence. The logic must be designed to handle this, for example, by checking timestamps or fetching the latest state from a source of truth, making the operation idempotent.

***

### Q20: When implementing HMAC signature verification, who is responsible for generating the signature and who is responsible for verifying it?
1. The client generates it, and the message queue verifies it.
2. The webhook provider (e.g., Stripe) generates it, and our webhook service verifies it.
3. Our webhook service generates it upon receipt, and the Queue Consumer verifies it.
4. The database generates it upon write, and the client verifies it.

**Answer: 2**
**Explanation:** The sender of the webhook (the provider, like Stripe or Shopify) uses a shared secret to generate the HMAC signature and includes it in the request headers. The receiver (our webhook service) uses the same shared secret to recalculate the signature and verify that it matches, thus authenticating the request.
