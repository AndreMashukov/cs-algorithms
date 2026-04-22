// 146. LRU Cache — classic interview / LeetCode hard (design problem)
// https://leetcode.com/problems/lru-cache/description/?envType=problem-list-v2&envId=linked-list — official statement
// https://www.youtube.com/watch?v=S6IfqDXWa10 — optional video walkthrough linked from the exercise notes
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
// “LRU” means when space is needed, discard the item that has gone longest without a get/put touch.

// Implement the LRUCache class:
// You expose a type the online judge can instantiate and call methods on (no free functions required).

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists.
// Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity
// from this operation, evict the least recently used key.
// Eviction policy: the key that would be dropped is whichever is “stalest” in LRU order.

// The functions get and put must each run in O(1) average time complexity.
// Hence hash map + list (or ordered Map tricks)—no linear scans per operation.

/**
 * LRU order via Map insertion order: delete + set moves a key to the end (most recent).
 * The first key from the iterator is the least recently used.
 */
class LRUCache { // LeetCode expects this class name and these method signatures
  /**
   * @param {number} capacity
   */
  constructor(capacity) { // Called once when the judge constructs the cache
    this.capacity = capacity // Remember how many distinct keys may live in the cache at once
    /** @type {Map<number, number>} */
    this.cache = new Map() // Map gives O(1) average get/has/delete/set; keys iterate in insertion order
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) { // Read by key and promote that key to “most recently used” if it exists
    if (!this.cache.has(key)) return -1 // Cache miss: nothing to return per problem statement
    const value = this.cache.get(key) // Cache hit: snapshot value before mutating Map order
    this.cache.delete(key) // Removing breaks old insertion position (not necessarily O(1) worst-case, average O(1))
    this.cache.set(key, value) // Inserting again appends this key at the end = MRU side of the logical queue
    return value // Return the value associated with key on success
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) { // Upsert key; evict LRU first only when inserting a brand-new key at full capacity
    if (this.cache.has(key)) { // Key already present: we will overwrite and refresh recency
      this.cache.delete(key) // Pull it out so the final set() places it at the MRU tail
    } else if (this.cache.size >= this.capacity) { // New key but no room: must free one slot
      const oldest = this.cache.keys().next().value // Iterator’s first key is the LRU (least recently inserted/updated)
      this.cache.delete(oldest) // Drop LRU entry; size decreases by one before we add the new pair
    } // If new key and size < capacity, neither branch runs—room already exists
    this.cache.set(key, value) // Always ends with key at MRU with the latest value
  }
}