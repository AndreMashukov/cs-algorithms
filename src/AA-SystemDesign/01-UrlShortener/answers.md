# URL Shortener System Design Answers

Q1: 2. Global uniqueness and shortness
Explanation: As stated in the description, the two key properties for IDs are global uniqueness (to prevent URL conflicts) and shortness (to fulfill the purpose of URL shortening). The system needs globally unique IDs to ensure no two long URLs map to the same short URL, while keeping them short enough for practical use.

Q2: 3. Base62 - because it offers a balance of compactness without special characters
Explanation: Base62 was chosen because it uses alphanumeric characters (A-Z, a-z, 0-9) without special characters that could cause issues in URLs. This creates shorter strings than Hex while being more URL-friendly than Base64, which uses characters like "+", "/", and "=".

Q3: 3. 56 billion
Explanation: The description explicitly calculates this: "A Base62 encoded string of length n has 62^n possible combinations. With n = 6, we have 62^6 ≈ 56 billion unique possibilities." This exceeds the system's requirement for handling URLs over five years.

Q4: 4. Because NoSQL databases have higher write throughput, horizontal scalability, and fit the key-value model needed
Explanation: The description states that "NoSQL is preferred for its high write throughput, horizontal scalability, and key-value storage model, which aligns well with the structure of URL mappings." This fits perfectly with the URL shortener's needs.

Q5: 2. It lowers latency and offloads read requests from the database
Explanation: The description explains that the caching layer is implemented "to reduce latency and offload read requests from the database" by storing frequently accessed URL mappings in memory, making retrieval almost instantaneous.

Q6: 3. The first character (prefix) of the shortened URL
Explanation: The system uses "1 character for the machine ID" as the prefix, which serves as the shard key. Each machine corresponds to one database shard, using this prefix to route requests appropriately.

Q7: 3. 100:1
Explanation: The scale requirements explicitly state "Read:write ratio = 100:1", indicating that for every write operation, there are 100 read operations, which is typical for URL shortener services where URLs are created once but accessed many times.

Q8: 4. Machine ID + Sequence Number - because it allows controlled scaling and shorter ID length
Explanation: The system chose the Machine ID + Sequence Number approach because "it allows controlled scaling and produces a shorter ID length suitable for URL shortening." This enables adding more shards with unique prefixes while maintaining short URLs.

Q9: 3. To track the number of times each shortened URL is accessed
Explanation: The Analytics Service is described as tracking "each URL access by incrementing a counter associated with the short URL" to provide "useful insights into link usage patterns."

Q10: 2. Because they're primarily I/O bound and need to handle high concurrency
Explanation: The description explains that Request Handlers are "Primarily I/O bound (handling HTTP requests, checking cache, holding open sockets)" and "may require more instances to handle high concurrency and low latency."

Q11: 3. 302 Found
Explanation: The description mentions that the URL Redirection Request Handler "responds with a 302 Found status and the original URL in the Location header to facilitate seamless redirection."

Q12: 3. It uses the prefix in the short URL to find the proper database shard
Explanation: The system description states: "For the read request, if there is a cache miss, we can use the prefix in the short url to find the proper database shard to find the data."

Q13: 1. 912.5 GB
Explanation: With 1 million writes per day, 500 bytes per entry, over 5 years: 1,000,000 × 500 × 365 × 5 = 912.5 GB. This calculation is based on the scale requirements specified in the description.

Q14: 4. Geographical distribution - reducing latency for global users
Explanation: While scalability, concurrency, and isolation are explicitly mentioned as benefits of the sharding approach, geographical distribution for reducing global latency is not mentioned among the benefits in the description.

Q15: 2. Becoming a bottleneck under high load
Explanation: The description notes that "generating a unique ID for each new URL as requests come in and saving it to the database may overwhelm the system" under high load, making it a potential bottleneck.

Q16: 2. Pre-generating a batch of IDs periodically
Explanation: The description suggests "pre-generating a batch of IDs periodically or when the system starts up, and then handing them out as needed" as a solution to the ID generation bottleneck.

Q17: 3. URL Redirection Request Handler
Explanation: The URL Redirection Request Handler is the component that "accepts GET requests with the shortened URL" and responds with a redirect to the original URL, making it the direct interface with users accessing shortened URLs.

Q18: 2. To enable high-speed access counting and reduce load on the main database
Explanation: The in-memory database is used "for high-speed access counting" to enable "real-time tracking and reduces the load on the main database" as described in the Link Analytics section.

Q19: 2. It can generate IDs and write to its own shard without impacting the existing setup
Explanation: The description states that "adding more machines to the system is straightforward. Each new machine is assigned a unique prefix, allowing it to generate IDs and write to its own shard without impacting the existing setup."

Q20: 1. short_url, original_url, created_at
Explanation: The Database Considerations section explicitly lists these three fields as the schema: "short_url", "original_url", and "created_at". These fields store all the essential information needed for the URL shortening service.
