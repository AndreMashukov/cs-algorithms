A URL Shortener is a service that takes a long URL and generates a shorter, unique alias that redirects users to the original URL. This alias is often a fixed-length string of characters. The system should be able to handle millions of URLs, allowing users to create, store, and retrieve shortened URLs efficiently. Each shortened URL needs to be unique and persistent. Additionally, the service should be able to handle high traffic, with shortened URLs redirecting to the original links in near real-time. In some cases, the service may include analytics to track link usage, such as click counts and user locations.

Functional Requirements
How to Answer ▼
Core Requirements
URL Shortening: Users should be able to input a long URL and receive a unique, shortened alias. The shortened URL should use a compact format with English letters and digits to save space and ensure uniqueness.

URL Redirection: When users access a shortened URL, the service should redirect them seamlessly to the original URL with minimal delay.

Link Analytics: The system should be able to track the number of times each shortened URL is accessed to provide insights into link usage.

Out of Scope
Authentication and Authorization for users (e.g., who can create URLs or access certain analytics).
Expiration or deletion of URLs by users.
Advanced analytics beyond click counts (e.g., geographic tracking or device types).
Scale Requirements
100M Daily Active Users
Read:write ratio = 100: 1
Data retention for 5 years
Assuming 1 million write requests per day
Assuming each entry is about 500 bytes

System Design Problems
Work through common interview questions step-by-step with personalized feedback.
Try It Yourself
Non-Functional Requirements
How to Answer ▼
High Availability: The service should ensure that all URLs are accessible 24/7, with minimal downtime, so users can reliably reach their destinations.
Low Latency: URL redirections should occur almost instantly, ideally in under a few milliseconds, to provide a seamless experience for users.
High Durability: Shortened URLs should be stored reliably so they persist over time, even across server failures, ensuring long-term accessibility.
Security: The service must prevent malicious links from being created and protect user data, implementing safeguards against spam, abuse, and unauthorized access to sensitive information.
API Endpoints
POST /api/urls/shorten
Shorten a given long URL and return the shortened URL.

Request Body:

{
  "longUrl": "http://example.com"
}
Response Body:

{
  "shortUrl": "http://urlshort.ly/abcd"
}
GET /api/urls/{shortUrl}
Redirect to the original long URL using the shortened URL.

Response Body:

{
  "longUrl": "http://example.com"
}
High Level Design
How to Answer ▼
1. URL Shortening
Users should be able to input a long URL and receive a unique, shortened alias. The shortened URL should use a compact format with English letters and digits to save space and ensure uniqueness.

The design for URL shortening follows a basic two-tier architecture that processes requests quickly and scales to handle high volumes:

1. Client: The frontend application sends HTTP POST requests containing long URLs to the URL Shortening service.

2. URL Shortening Service: The backend receives requests and is responsible for creating and returning shortened URLs. It performs these key functions:

Generates a unique, short alias by encoding the URL or using hashing techniques to ensure uniqueness.
Stores the mapping of long URLs to short aliases in the database.
Manages errors and ensures each short URL is unique across all users.
3. Database: A highly available NoSQL database (e.g., DynamoDB or Cassandra) is used to persist mappings between long URLs and short aliases. NoSQL is preferred for its high write throughput, horizontal scalability, and key-value storage model, which aligns well with the structure of URL mappings.

URL Shortener Design Diagram 0 Shortening Flow

This design supports efficient and quick URL shortening with minimal data storage requirements per URL entry.

2. URL Redirection
When users access a shortened URL, the service should redirect them seamlessly to the original URL with minimal delay.

The URL redirection service ensures that users accessing a shortened URL are quickly redirected to the original URL with minimal delay. This design focuses on high read throughput and low latency, as the read traffic will be significantly higher than URL creation.

1. API Gateway: As we now have two request types, we need an API Gateway. This acts as the entry point for all incoming requests, routing POST requests to the URL Shortening Service and GET requests to the URL Redirection Handler.

2. URL Redirection Request Handler: Accepts GET requests with the shortened URL, retrieves the original URL from the cache or database, and responds with a 302 Found status and the original URL in the Location header to facilitate seamless redirection.

3. Caching Layer: To reduce latency and offload read requests from the database, we implement a caching layer (e.g., Redis) that stores frequently accessed URL mappings in memory, making retrieval almost instantaneous.

4. Database: In cases where a URL is not found in the cache, the system retrieves it from the NoSQL database (previously implemented for URL Shortening) and updates the cache to optimize future requests.

URL Shortener Design Diagram 1 Redirection Flow

This setup ensures efficient and reliable URL redirection at scale by combining the API Gateway, Request Handler, Caching Layer, and Database.

3. Link Analytics
The system should be able to track the number of times each shortened URL is accessed to provide insights into link usage.

To track the number of accesses for each shortened URL, we introduce an Analytics Service that counts and stores access events in real time. This setup provides useful insights into link usage patterns and is designed to scale for high traffic.

1. API Gateway: Routes GET requests to both the URL Redirection Handler (for redirection) and the Analytics Service (for tracking access).

2. Analytics Service: Tracks each URL access by incrementing a counter associated with the short URL. This service logs access events and can be optimized by using a lightweight in-memory counter before periodically updating the database.

3. In-Memory Database: For high-speed access counting, we use an in-memory data store like Redis to cache the counters for each short URL. This enables real-time tracking and reduces the load on the main database.

4. Database: Periodically, the Analytics Service flushes the in-memory counters to the main NoSQL database to ensure persistent storage of access counts.

URL Shortener Design Diagram 2 Link Analytics Flow

This architecture enables efficient, real-time analytics collection, combining the speed of in-memory storage with the durability of a NoSQL database.

Deep Dive Questions
What are the two properties we need for the IDs?
The two properties we need for the IDs are:

Global Uniqueness: It has to be globally unique across our system. We obviously do not want two long URLs to map the same the short URL.
Shortness: It has to be "short". This is a relative concept. The URL shorteners used in production are around 5-8 characters long. For example, https://shorturl.at/xLMPr, https://t.ly/ecgGp and https://tinyurl.com/e9enh3uz.
The basic idea behind URL generation involves creating a unique integer ID for each URL, followed by encoding that ID into a shorter, human-readable format. Let's discuss each one in detail.

URL shortener ID generation

How can we generate unique IDs for each URL?
There are several options for generating unique integer IDs:

Note that when we say "integer" in programming and computer science, we typically mean a whole number that can be represented in different number systems. For example, 123456 in decimal is 123456 in decimal, 123456 in hexadecimal is 0x1e240, and 123456 in binary is 0b1111000100100000.

Option 1: Hash Functions

MD5: MD5 produces a 128-bit hash value and is fast, but it's prone to collisions, which reduces its suitability for unique ID generation.
Example: md5 results in c984d06aafbecf6bc55569f964148ea3, or 267864437531868025902444334967583706787 in decimal.
SHA256: Produces a 256-bit hash, which is more secure than MD5 and collision-resistant. However, its length (64 characters) is impractical for URL shortening.
Example: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.
Double Hashing or Longer Hashes can reduce collisions but increase the ID length, making them unsuitable for our requirements.
Option 2: UUID

UUIDv4 relies on randomness and offers a large ID space (122 bits), which makes collisions extremely unlikely. However, the resulting 36-character ID is still too long for our URL shortener.
Example: f47ac10b-58cc-4372-a567-0e02b2c3d479.
UUIDv1 uses a timestamp and the machine's MAC address, ensuring uniqueness, but it can leak information about the machine and time of generation.
Option 3: Snowflake IDs

Structure: Combines a timestamp, machine ID, and sequence number into a 64-bit ID, making it suitable for distributed systems.
Example: 130267849091223552 in decimal (converted from binary).
Drawback: Snowflake IDs are unique and timestamp-based, but still too long for "short" URLs.
Option 4: Machine ID + Sequence Number (Chosen Solution)

Method: Uses a Machine (or Shard) ID and an incrementing sequence number. Each machine is assigned a unique prefix (Machine ID), and it increments its sequence number for each URL generated.
Example: If Machine ID is A1 and Sequence Number is 0001, the ID could be A10001.
Benefits: We can control the length by adjusting the size of the Machine ID and sequence number, allowing us to scale by adding more shards (machines) with unique prefixes. This ensures unique IDs without long, complex strings.
We choose Option 4 because it allows controlled scaling and produces a shorter ID length suitable for URL shortening.

How can we encode the unique IDs into short, user-friendly URLs?
After generating a unique integer ID for each URL, we need to encode it into a shorter, readable string to create a user-friendly shortened URL. The encoding method must balance shortness with usability, avoiding special characters that might be confusing or hard to type.

Several encoding options were considered:

Option 1: Hexadecimal (Base16)

Characters: Uses digits 0-9 and letters a-f, making 16 possible characters.
Example: The integer 123456 is encoded as 1e240 in hex.
Pros: Widely recognized and straightforward to implement.
Cons: Not compact enough for URL shortening; a 64-bit integer in hex would result in a 16-character string, which is too long for our needs.
Option 2: Base64

Characters: Uses A-Z, a-z, 0-9, +, /, and =, making 64 possible characters.
Example: The integer 123456 is encoded as MTIzNDU2 in Base64.
Pros: More compact than hex, resulting in shorter strings.
Cons: Uses special characters (+, /, =), which can cause issues in URLs and make typing more difficult.
Option 3: Base62 (Chosen Solution)

Characters: Uses A-Z, a-z, and 0-9, totaling 62 characters.
Example: The integer 123456 would be encoded as W7E in Base62.
Pros: Shorter strings without special characters, making it ideal for URLs. A Base62 encoding of 6 characters can represent over 56 billion unique IDs, which meets our system's requirements.
Cons: Slightly more complex encoding/decoding process since 62 is not a power of 2, but manageable.
Why Base62?

Base62 offers a compact format that avoids special characters, resulting in short, user-friendly URLs. With 6 Base62 characters, we can represent up to 56 billion unique IDs, more than sufficient for our expected 1.8 billion URLs over five years.
Calculation: A Base62 encoded string of length n has 62^n possible combinations. With n = 6, we have 62^6 ≈ 56 billion unique possibilities, which exceeds our requirement.
Sample Code for Base62 Encoding

Here's a simple Python function that encodes an integer ID into Base62:
import string

CHARS = string.ascii_lowercase + string.ascii_uppercase + string.digits

def base62_encode(num):
    """Encodes a number using Base62 encoding."""
    if num == 0:
        return CHARS[0]
    encoding = ''
    while num > 0:
        num, remainder = divmod(num, 62)
        encoding = CHARS[remainder] + encoding
    return encoding
This Base62 encoding allows us to convert our generated integer IDs into shorter, human-readable strings for easy sharing and typing.

How can we scale the system to handle high traffic?
To support high traffic and ensure scalability, we implement a sharding strategy that distributes data and load across multiple machines. Sharding allows us to scale horizontally, so as traffic increases, we can add more machines without reconfiguring the entire system.

Scaling with Sharding
With ID generation in place, the next step is to scale the system. Request handlers can be easily scaled as they function as independent HTTP servers. However, scaling the ID generator requires a bit more consideration.

Machine ID (Prefix) as Shard Key
To horizontally scale the system, we need to shard the service. We already have a solution from the previous section: using 1 character for the machine ID. This "prefix" serves as the shard key for our ID Generator service. By sharding the database and ID Generator using the same shard key, each machine corresponds to exactly one database shard. This is a common design pattern. The approach ensures that write paths are completely independent and concurrent so we can scale the entire system by adding more servers without affecting existing ones.

URL shortener sharding

The primary benefits of this approach:

Scalability: Adding more machines to the system is straightforward. Each new machine is assigned a unique prefix, allowing it to generate IDs and write to its own shard without impacting the existing setup. This allows the system to handle increased load seamlessly.

Concurrency: Independent write paths mean that multiple machines can perform write operations simultaneously without conflicting with each other. This parallelism enhances the system's overall throughput and efficiency.

Additionally, we also get some side benefits.

Isolation: Each machine and its corresponding database shard operate independently, minimizing the risk of system-wide failures. If one machine or shard encounters an issue, it does not affect the others, ensuring higher system reliability.

Simplicity in Data Management: With each machine handling a distinct shard, data management becomes simpler. Maintenance tasks such as backups, indexing, and scaling can be performed on individual shards without disrupting the entire system.

For the read request, if there is a cache miss, we can use the prefix in the short url to find the proper database shard to find the data. For example, if the short url is a82c7w, the request handler would go to shard a to find the long url. We could go even further to shard the cache using the same shard key if it becomes necessary

URL shortener sharding reading path

Scaling Request Handlers and ID Generator Independently
One question you may ask is why not make request handlers and ID generators 1:1 as well?

In general, the Request Handlers would likely need more machines compared to the URL Generation Service. This is due to the nature of their roles and the specific workloads they handle.

Request Handler Load:

Primarily I/O bound (handling HTTP requests, checking cache, holding open sockets).
May require more instances to handle high concurrency and low latency.
URL Generation Service Load:

More CPU and I/O bound (generating IDs, writing to the database).
May require fewer instances if each instance can handle a higher number of generation tasks efficiently.
In general, the Request Handlers would likely need more machines compared to the URL Generation Service. This is due to the nature of their roles and the specific workloads they handle. This is why we scale them differently. The request handlers can randomly pick an ID Generator machine to evenly distribute the load or pick the one with the lowest load if we want to use the more complex logic.

### Database Considerations

- **Storage**: A NoSQL database like Cassandra or DynamoDB is ideal, as these databases support horizontal scaling and partitioning.
- **Schema**:
  - `short_url`
  - `original_url`
  - `created_at`
- **Shard Key**: The `short_url` field includes the Machine ID as the shard key, making lookups efficient within each shard.
- **Replication and Durability**: Enable database replication across shards. Each shard can have replicas on different machines, reducing the risk of data loss.

### Pre-Generating Unique IDs in Bulk

One potential issue with the current design of generating IDs on demand is that it could become a bottleneck under high load. Generating a unique ID for each new URL as requests come in and saving it to the database may overwhelm the system.

This leads us to consider pre-generating a batch of IDs periodically or when the system starts up, and then handing them out as needed.

**Advantages**:
- Handle sudden influx of requests.
- Lower latency, since IDs are pre-generated and do not need to be computed on-demand.

**Disadvantages**:
- Increased complexity in managing the ID batch (monitoring exhaustion and replenishing).
- Potential for generating more IDs than needed, leading to resource inefficiencies.