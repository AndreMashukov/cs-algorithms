# URL Shortener System Design Questions

Q1: What are the two essential properties required for the IDs in a URL shortener system?
1. Global uniqueness and predictability
2. Global uniqueness and shortness
3. Temporal validity and uniqueness
4. Compression ratio and encryption strength

Q2: Which encoding method was chosen for the URL shortener system and why?
1. Base64 - because it provides the most compact representation
2. Hexadecimal (Base16) - because it's widely recognized and straightforward to implement
3. Base62 - because it offers a balance of compactness without special characters
4. MD5 hashing - because it ensures uniqueness across all URLs

Q3: How many unique URLs can be represented with 6 characters in Base62 encoding?
1. 56 million
2. 5.6 billion
3. 56 billion
4. 62 million

Q4: Why is a NoSQL database preferred over a relational database for the URL shortener service?
1. Because NoSQL databases are always faster than relational databases
2. Because NoSQL databases support atomic operations better than relational databases
3. Because URL shortener mappings don't require complex relationships or joins
4. Because NoSQL databases have higher write throughput, horizontal scalability, and fit the key-value model needed

Q5: What is the primary advantage of using a caching layer in the URL redirection flow?
1. It reduces the need for database backups
2. It lowers latency and offloads read requests from the database
3. It prevents URL collisions in the system
4. It enables better data encryption for sensitive URLs

Q6: In the sharding approach described, what serves as the shard key?
1. The timestamp of URL creation
2. The hash of the long URL
3. The first character (prefix) of the shortened URL
4. The URL's access count

Q7: What is the read:write ratio mentioned in the scale requirements?
1. 1:100
2. 10:1
3. 100:1
4. 1:10

Q8: Which ID generation strategy was chosen for the URL shortener and why?
1. MD5 - because it's fast and produces fixed-length outputs
2. UUID - because it ensures global uniqueness
3. Snowflake IDs - because they include timestamps
4. Machine ID + Sequence Number - because it allows controlled scaling and shorter ID length

Q9: What is the purpose of the Analytics Service in the URL shortener architecture?
1. To encrypt sensitive URLs
2. To compress long URLs for storage efficiency
3. To track the number of times each shortened URL is accessed
4. To validate that URLs don't contain malicious content

Q10: Why might Request Handlers need more machines compared to ID Generator services?
1. Because they're more complex to develop and maintain
2. Because they're primarily I/O bound and need to handle high concurrency
3. Because they need more processing power for compression algorithms
4. Because they store more data than ID Generator services

Q11: What HTTP status code is used for URL redirection in this system?
1. 200 OK
2. 301 Moved Permanently
3. 302 Found
4. 404 Not Found

Q12: How does the system handle a cache miss during URL redirection?
1. It generates a new short URL
2. It returns an error to the user
3. It uses the prefix in the short URL to find the proper database shard
4. It broadcasts a request to all database shards

Q13: What is the estimated data storage requirement for 5 years, assuming 1 million write requests per day and 500 bytes per entry?
1. 912.5 GB
2. 91.25 TB
3. 9.125 TB
4. 912.5 TB

Q14: Which of these is NOT mentioned as a benefit of the sharding approach used in the system?
1. Scalability - easily adding more machines
2. Concurrency - independent write paths
3. Isolation - minimizing risk of system-wide failures
4. Geographical distribution - reducing latency for global users

Q15: What potential issue is mentioned with generating IDs on demand?
1. Security vulnerabilities
2. Becoming a bottleneck under high load
3. Excessive database lookups
4. Difficulty in managing distributed systems

Q16: What is the alternative suggested to address the ID generation bottleneck?
1. Using multiple hash functions
2. Pre-generating a batch of IDs periodically
3. Moving to a centralized ID generator
4. Increasing the length of the short URLs

Q17: Which component in the system directly interacts with the user when they access a shortened URL?
1. Analytics Service
2. Database
3. URL Redirection Request Handler
4. ID Generator

Q18: Why does the system use an in-memory database (like Redis) for analytics counters?
1. To make analytics available to users in real-time
2. To enable high-speed access counting and reduce load on the main database
3. To ensure analytics data is never lost
4. To comply with data privacy regulations

Q19: What happens when a new machine is added to the system with its unique prefix?
1. All existing machines need to be reconfigured
2. It can generate IDs and write to its own shard without impacting the existing setup
3. The database schema needs to be updated
4. All existing short URLs need to be regenerated

Q20: What schema fields are mentioned for the URL shortener database?
1. short_url, original_url, created_at
2. short_url, long_url, visit_count, user_id
3. url_id, original_url, short_code, timestamp
4. key, value, ttl, created_by
