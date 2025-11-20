# Follow-Up: Sum Root to Leaf Numbers

## Conceptual Analysis

Your solution in `mistakes.js` shows you understand the basic DFS approach and accumulating a sum, but there are critical issues with **null handling** and **the order of operations** in your recursive logic.

The main problems are:
1. **Missing null check** - You access `node.left` and `node.right` without first checking if `node` itself is null
2. **Incorrect order of operations** - You check if the node is a leaf BEFORE updating the sum with the current node's value
3. **Missing current node's value** - When you reach a leaf, you return `sum` instead of including the leaf node's value

---

## Socratic Questions

### Question 1: Execution Flow and Null Checks
When your function calls `dfs(node.left, sum)`, what happens if `node.left` is `null`? 

Walk through this scenario:
- You're at a leaf node (e.g., node with value 2)
- Your function checks `if (!node.left && !node.right)` and returns `sum`
- But then the next line tries to execute `return dfs(node.left, sum) + dfs(node.right, sum)`
- Both `node.left` and `node.right` are `null`

What will happen when `dfs(null, sum)` is called, and the very first line of your function tries to access `node.left` and `node.right`?

---

### Question 2: Building the Number
In your current code, when you reach a leaf node with value 2, and the accumulated sum is 1 (from the root), what value do you return?

Now think about what number the path `1 -> 2` should represent. Is there a mismatch? At what point should you incorporate the current node's value into the sum?

---

### Question 3: Order of Operations
Consider this tree:
```
    1
   /
  2
```

With your current logic:
- Start: `dfs(node=1, sum=0)`
- Check: Is node 1 a leaf? No.
- Update: `sum = 0 * 10 + 1 = 1`
- Return: `dfs(node.left=2, sum=1) + dfs(node.right=null, sum=1)`

Now at node 2:
- Check: Is node 2 a leaf? Yes!
- Return: `sum` which is `1`

But the path `1 -> 2` should give us `12`, not `1`. What's missing? When should we include node 2's value in our calculation?

---

## Test Scenario

Try solving this small test case mentally with your current code:

```javascript
// Tree:
//     4
//    / \
//   9   0

const tree = {
  val: 4,
  left: { val: 9, left: null, right: null },
  right: { val: 0, left: null, right: null }
}
```

**Expected output:** `49 + 40 = 89`

Walk through your code step by step:
1. What happens at the root (node 4)?
2. What happens at the left child (node 9)?
3. What value gets returned from the left subtree?
4. Can you spot where the logic breaks down?

After thinking through these questions, try to identify:
- Where should the null check go?
- When should you update the sum with the current node's value?
- What value should you return when you reach a leaf?

