// You are given two words, beginWord and endWord, and also a list of words wordList. All of the given words are of the same length, consisting of lowercase English letters, and are all distinct.

// Your goal is to transform beginWord into endWord by following the rules:

// You may transform beginWord to any word within wordList, provided that at exactly one position the words have a different character, and the rest of the positions have the same characters.
// You may repeat the previous step with the new word that you obtain, and you may do this as many times as needed.
// Return the minimum number of words within the transformation sequence needed to obtain the endWord, or 0 if no such sequence exists.

// Example 1:

// Input: beginWord = "cat", endWord = "sag",
// wordList = ["bat","bag","sag","dag","dot"]

// Output: 4
// Explanation: One possible transformation sequence is
// "cat" -> "bat" -> "bag" -> "dag" -> "dot" -> "sag"

class Solution {
  /**
   * @param {string} begin - The starting word
   * @param {string} end - The target word
   * @param {string[]} wordList - List of available words for transformation
   * @return {number} - The minimum number of transformations needed to reach endWord from beginWord
   */
  ladderLength (begin, end, wordList) {
    // Convert wordList to a set for O(1) lookups
    const words = new Set(wordList)

    // If endWord is not in wordList or beginWord is the same as endWord, return 0
    if (!words.has(end) || begin === end) {
      return 0
    }

    // Initialize the result counter
    let res = 0

    // Initialize the queue with the beginWord
    const q = [begin]

    // Perform BFS
    while (q.length) {
      // Increment the transformation count
      res++

      // Get the current level size
      const len = q.length

      // Process all nodes at the current level
      for (let i = 0; i < len; i++) {
        // Dequeue the first node
        const node = q.shift()

        // If the node is the endWord, return the result
        if (node === end) return res

        // Try changing each character of the node
        for (let j = 0; j < node.length; j++) {
          // Try all possible characters from 'a' to 'z'
          for (let c = 97; c < 123; c++) {
            // Skip if the character is the same as the current character
            if (String.fromCharCode(c) === node[j]) {
              continue
            }

            // Form the new word by changing the j-th character
            const nei = node.slice(0, j) + String.fromCharCode(c) + node.slice(j + 1)

            // If the new word is in the word list
            if (words.has(nei)) {
              // Enqueue the new word
              q.push(nei)

              // Remove the new word from the set to avoid revisiting
              words.delete(nei)
            }
          }
        }
      }
    }

    // If no transformation sequence is found, return 0
    return 0
  }
}
