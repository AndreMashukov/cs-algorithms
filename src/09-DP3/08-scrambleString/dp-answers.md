# Problem: Scramble String (Dynamic Programming)

## Answers

| Question | Answer | Description |
|----------|---------|-------------|
| Q1 | 2 | dp[len][i][j] represents whether s1.substring(i, i+len) can be scrambled to form s2.substring(j, j+len) |
| Q2 | 2 | Base case dp[1][i][j] is set to true if s1[i] == s2[j], false otherwise |
| Q3 | 1 | The no-swap case is represented by dp[1][i][j] && dp[2][i+1][j+1] |
| Q4 | 1 | For swap case, right part comparison uses indices dp[len-k][i+k][j] |
| Q5 | 1 | DP table is filled by processing all lengths from 1 to n, for each length filling all valid (i,j) pairs |
| Q6 | 2 | Both swap and no-swap cases are checked because the original scrambling algorithm allows both operations |
| Q7 | 3 | The final answer is found in dp[n][0][0] |
