Problem: Unique Binary Search Trees (Dynamic Programming)

Q1: What does dp[i] represent in the DP array?
1. The maximum height of BSTs with i nodes
2. The number of unique BSTs that can be formed with exactly i nodes
3. The sum of all node values in BSTs with i nodes
4. The minimum number of operations to create BSTs with i nodes

Q2: Why is dp[0] initialized to 1?
1. To represent that there's one way to create an empty BST
2. To avoid errors in multiplication operations
3. To match the mathematical definition of Catalan numbers
4. All of the above

Q3: In the DP approach, what is the order of filling the array?
1. From dp[n] down to dp[0]
2. From dp[0] up to dp[n]
3. Randomly, as states are independent
4. Fill even indices first, then odd indices

Q4: For dp[3] calculation, how many different root positions are tried?
1. 2 (positions 1 and 3)
2. 3 (positions 1, 2, and 3)
3. 4 (positions 0, 1, 2, and 3)
4. 1 (only position 2)

Q5: When calculating dp[4] with root at position 2, which previous DP values are used?
1. dp[1] and dp[2]
2. dp[0] and dp[3]
3. dp[2] and dp[2]
4. dp[1] and dp[1]

Q6: What is the recurrence relation for this DP problem?
1. dp[i] = dp[i-1] + dp[i-2]
2. dp[i] = sum of dp[j] * dp[i-1-j] for all valid j
3. dp[i] = max(dp[j] * dp[i-1-j]) for all valid j
4. dp[i] = dp[i-1] * 2

Q7: How does the DP solution compare to the recursive solution in terms of time complexity?
1. DP is slower due to array operations
2. Both have the same time complexity O(n²)
3. DP is faster because it avoids function call overhead
4. DP has better space complexity but same time complexity