src/09-Graphs/13-wordLadder/followup-wordLadder.md
### Conceptual Probe

Based on the errors in `mistakes.js`, the likely gap is BFS distance tracking by layers in an unweighted graph. 
In your code, `res` is incremented per neighbor and reset each round, and the success return happens when dequeuing `endWord`. Word Ladder requires increasing the level once per completed layer (starting at 1 for the `beginWord`), and marking visited at enqueue to preserve shortest-path guarantees.

- **Question 1**: In unweighted BFS, what does one full pass over the current queue size (a “layer”) represent, and when should the distance counter increase—per neighbor discovered or after finishing the layer?
- **Question 2**: Why do we mark a word visited (remove from the set) at enqueue time rather than at dequeue time? What shortest-path error can happen if we delay this?
- **Question 3**: Word Ladder’s length counts words, not edges. For `beginWord = "hit"`, `endWord = "hot"`, `wordList = ["hot"]`, what result should be returned, and exactly when in BFS should you return it?

### "What If" Scenario

Use these small inputs to practice layer-based counting and visited-at-enqueue:

- **Case A**
  - `beginWord = "hit"`
  - `endWord = "hot"`
  - `wordList = ["hot"]`
  - Tasks:
    - Determine the correct length.
    - Show queue contents layer by layer and indicate when the counter increments.
    - Specify whether you return upon generating `"hot"` as a neighbor or wait until dequeuing it—and why.

- **Case B**
  - `beginWord = "aaa"`
  - `endWord = "aab"`
  - `wordList = ["aab", "abb", "bbb"]`
  - Tasks:
    - Determine the correct length.
    - Explain what happens if you incorrectly increment the counter per neighbor vs. correctly per layer.