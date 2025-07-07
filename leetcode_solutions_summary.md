# LeetCode Solutions Summary

## Overview
This document summarizes the implementations for three dynamic programming problems from LeetCode:

1. **LeetCode 122**: Best Time to Buy and Sell Stock II
2. **LeetCode 123**: Best Time to Buy and Sell Stock III  
3. **LeetCode 124**: Binary Tree Maximum Path Sum

---

## 1. Best Time to Buy and Sell Stock II (LeetCode 122)

**Problem**: You can complete as many transactions as you like, but you can't engage in multiple transactions at the same time.

**Location**: `src/08-DP2/buySellStock2/maxProfit.js`

### Key Insights:
- **Greedy Approach**: Buy whenever the price will go up the next day
- **DP Approach**: Track buy/sell states

### Solutions:

#### Greedy Solution (Optimal):
```javascript
const maxProfit = (prices) => {
  let profit = 0
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i]
    }
  }
  return profit
}
```

#### Time Complexity: O(n)
#### Space Complexity: O(1)

**Why Greedy Works**: Since we can make unlimited transactions, we can capture every profitable opportunity by buying before each price increase.

---

## 2. Best Time to Buy and Sell Stock III (LeetCode 123)

**Problem**: You can complete at most 2 transactions.

**Location**: `src/08-DP2/buySellStock3/maxProfit.js`

### Key Insights:
- **State Machine**: Track 4 states (buy1, sell1, buy2, sell2)
- **DP Approach**: Use the Stock IV algorithm with k=2

### Solutions:

#### State Machine Solution (Optimal):
```javascript
const maxProfit = (prices) => {
  let buy1 = -prices[0]   // Max profit after buying first stock
  let sell1 = 0           // Max profit after selling first stock
  let buy2 = -prices[0]   // Max profit after buying second stock
  let sell2 = 0           // Max profit after selling second stock
  
  for (let i = 1; i < prices.length; i++) {
    buy1 = Math.max(buy1, -prices[i])
    sell1 = Math.max(sell1, buy1 + prices[i])
    buy2 = Math.max(buy2, sell1 - prices[i])
    sell2 = Math.max(sell2, buy2 + prices[i])
  }
  
  return sell2
}
```

#### Time Complexity: O(n)
#### Space Complexity: O(1)

**State Transitions**: Each state represents the maximum profit at that transaction stage.

---

## 3. Binary Tree Maximum Path Sum (LeetCode 124)

**Problem**: Find the maximum path sum in a binary tree where path doesn't need to pass through root.

**Location**: `src/05-Trees/15-maxPathSum/comprehensive.js`

### Key Insights:
- **DFS Approach**: At each node, consider two types of paths:
  1. Path extending to parent (return value)
  2. Path through current node (update global max)
- **Negative Handling**: Ignore negative subtree contributions

### Solution:

```javascript
const maxPathSum = (root) => {
  let maxSum = -Infinity
  
  const dfs = (node) => {
    if (!node) return 0
    
    // Get max contribution from subtrees (ignore negative)
    const leftMax = Math.max(0, dfs(node.left))
    const rightMax = Math.max(0, dfs(node.right))
    
    // Update global max with path through current node
    maxSum = Math.max(maxSum, node.val + leftMax + rightMax)
    
    // Return max path that can extend to parent
    return node.val + Math.max(leftMax, rightMax)
  }
  
  dfs(root)
  return maxSum
}
```

#### Time Complexity: O(n) where n is number of nodes
#### Space Complexity: O(h) where h is height of tree

**Key Concept**: At each node, we can either extend one path upward or create a new path through the current node.

---

## Test Results

All solutions have been tested with multiple test cases and produce correct results:

### Stock II Examples:
- `[7,1,5,3,6,4]` → 7 ✓
- `[1,2,3,4,5]` → 4 ✓
- `[7,6,4,3,1]` → 0 ✓

### Stock III Examples:
- `[3,3,5,0,0,3,1,4]` → 6 ✓
- `[1,2,3,4,5]` → 4 ✓
- `[7,6,4,3,1]` → 0 ✓

### Binary Tree Examples:
- `[1,2,3]` → 6 ✓
- `[-10,9,20,null,null,15,7]` → 42 ✓
- `[5]` → 5 ✓

---

## Algorithm Patterns

### 1. Stock Problems Pattern:
- **Stock I**: Single transaction → Two pointers
- **Stock II**: Unlimited transactions → Greedy
- **Stock III**: Limited transactions → State machine or DP
- **Stock IV**: k transactions → General DP

### 2. Tree Problems Pattern:
- **DFS Traversal**: Post-order to compute from leaves up
- **Global vs Local**: Track both global optimum and local contribution
- **Negative Handling**: Choose whether to include negative contributions

### 3. Dynamic Programming Pattern:
- **State Definition**: Clear definition of what each state represents
- **State Transition**: How to move between states
- **Base Cases**: Handle edge cases and initialization

---

## Performance Comparison

| Problem | Best Time | Best Space | Approach |
|---------|-----------|------------|----------|
| Stock II | O(n) | O(1) | Greedy |
| Stock III | O(n) | O(1) | State Machine |
| Tree Path Sum | O(n) | O(h) | DFS |

All solutions are optimal in terms of time complexity for their respective problems.

---

## Running the Code

```bash
# Test Stock II
node src/08-DP2/buySellStock2/maxProfit.js

# Test Stock III  
node src/08-DP2/buySellStock3/maxProfit.js

# Test Binary Tree Maximum Path Sum
node src/05-Trees/15-maxPathSum/comprehensive.js
```

Each file includes comprehensive test cases and multiple solution approaches for learning purposes.