// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes
// you can see ordered from top to bottom.

const rightSideView = (root) => {
  if (!root) return []

  const result = []
  const queue = [root]

  while (queue.length) {
    const size = queue.length

    for (let i = 0; i < size; i++) {
      const node = queue.shift()

      if (i === size - 1) {
        result.push(node.val)
      }

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }

  return result
}

console.log(
  rightSideView({
    val: 1,
    left: { val: 2, left: null, right: { val: 5, left: null, right: null } },
    right: { val: 3, left: null, right: { val: 4, left: null, right: null } }
  })
)

// [1, 3, 4]
