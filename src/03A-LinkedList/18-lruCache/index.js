// 146. LRU Cache
// https://leetcode.com/problems/lru-cache/description/?envType=problem-list-v2&envId=linked-list
// https://www.youtube.com/watch?v=S6IfqDXWa10
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. 
// Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity 
// from this operation, evict the least recently used key.

// The functions get and put must each run in O(1) average time complexity.

/**
 * LRU order via Map insertion order: delete + set moves a key to the end (most recent).
 * The first key from the iterator is the least recently used.
 */
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity
    /** @type {Map<number, number>} */
    this.cache = new Map()
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      const oldest = this.cache.keys().next().value
      this.cache.delete(oldest)
    }
    this.cache.set(key, value)
  }
}