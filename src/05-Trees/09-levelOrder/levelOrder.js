// Given the root of a binary tree,
// return the level order traversal of its nodes' values. (i.e.,
// from left to right, level by level).

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]

const levelOrder = (root) => {
  if (!root) return []

  const result = []
  const queue = [root]

  while (queue.length) {
    const level = []
    const size = queue.length

    // iterate through the current level
    for (let i = 0; i < size; i++) {
      // remove the first node from the queue
      const node = queue.shift()
      level.push(node.val)

      // add the left and right children of the node to the end of the queue
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    console.log({
      level,
      queue
    })

    result.push(level)
  }

  return result
}

console.log(
  levelOrder({
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
      val: 20,
      left: { val: 15, left: null, right: null },
      right: { val: 7, left: null, right: null }
    }
  })
)

// [[3],[9,20],[15,7]]

// We start a new level in the output when we have visited all the nodes
// in the current level. This can be tracked by recording the size of
// the queue before starting a new level,
// and then dequeueing that many nodes for the current level.
