# Problem: Scramble String (Dynamic Programming)

## Algorithm Trace: isScramble_dp("abc", "acb")

### Step 1: Initialize
- `s1 = "abc"`, `s2 = "acb"`, `n = 3`
- Create 3D DP array: `dp[4][3][3]` (length 0-3, positions 0-2)

### Step 2: Fill base case (length = 1)
- `dp[1][0][0]`: s1[0]='a' == s2[0]='a' → `true`
- `dp[1][0][1]`: s1[0]='a' == s2[1]='c' → `false`  
- `dp[1][0][2]`: s1[0]='a' == s2[2]='b' → `false`
- `dp[1][1][0]`: s1[1]='b' == s2[0]='a' → `false`
- `dp[1][1][1]`: s1[1]='b' == s2[1]='c' → `false`
- `dp[1][1][2]`: s1[1]='b' == s2[2]='b' → `true`
- `dp[1][2][0]`: s1[2]='c' == s2[0]='a' → `false`
- `dp[1][2][1]`: s1[2]='c' == s2[1]='c' → `true`
- `dp[1][2][2]`: s1[2]='c' == s2[2]='b' → `false`

#### DP table after length 1:
```
dp[1] = [
  [T,F,F],
  [F,F,T],
  [F,T,F]
]
```

### Step 3: Fill length = 2

#### For dp[2][0][0] (s1[0:2]="ab" vs s2[0:2]="ac"):
- Try k=1: No-swap: `dp[1][0][0] && dp[1][1][1] = T && F = F`
- Try k=1: Swap: `dp[1][0][1] && dp[1][1][0] = F && F = F`
- Result: `dp[2][0][0] = false`

#### For dp[2][0][1] (s1[0:2]="ab" vs s2[1:3]="cb"):
- Try k=1: No-swap: `dp[1][0][1] && dp[1][1][2] = F && T = F`
- Try k=1: Swap: `dp[1][0][2] && dp[1][1][1] = F && F = F`
- Result: `dp[2][0][1] = false`

#### For dp[2][1][0] (s1[1:3]="bc" vs s2[0:2]="ac"):
- Try k=1: No-swap: `dp[1][1][0] && dp[1][2][1] = F && T = F`
- Try k=1: Swap: `dp[1][1][1] && dp[1][2][0] = F && F = F`
- Result: `dp[2][1][0] = false`

#### For dp[2][1][1] (s1[1:3]="bc" vs s2[1:3]="cb"):
- Try k=1: No-swap: `dp[1][1][1] && dp[1][2][2] = F && F = F`
- Try k=1: Swap: `dp[1][1][2] && dp[1][2][1] = T && T = T`
- Result: `dp[2][1][1] = true`

#### DP table after length 2:
```
dp[2] = [
  [F,F,X],
  [F,T,X],
  [X,X,X]
] (X = not computed)
```

### Step 4: Fill length = 3
For `dp[3][0][0]` (s1[0:3]="abc" vs s2[0:3]="acb"):
- Try k=1: No-swap: `dp[1][0][0] && dp[2][1][1] = T && T = T`
- Result: `dp[3][0][0] = true` (found valid split!)

### Step 5: Return result
- `dp[3][0][0] = true`

## Final Result
`true` (s2="acb" is a scrambled version of s1="abc")

### How the Algorithm Found the Solution
The algorithm found that "abc" can be scrambled to "acb" by:
1. Split "abc" at position 1: "a" + "bc"
2. Keep "a" in place, scramble "bc" to "cb"
3. Result: "a" + "cb" = "acb"
