# 61. Rotate List

[LeetCode Problem Link](https://leetcode.com/problems/rotate-list/description/?envType=problem-list-v2&envId=two-pointers)

## Problem Description

Given the `head` of a linked list, rotate the list to the right by `k` places.

### Examples

**Example 1:**
- **Input:** `head = [1,2,3,4,5]`, `k = 2`
- **Output:** `[4,5,1,2,3]`

**Example 2:**
- **Input:** `head = [0,1,2]`, `k = 4`
- **Output:** `[2,0,1]`

**Example 3:**
- **Input:** `head = [1]`, `k = 1`
- **Output:** `[1]`

### Constraints

- The number of nodes in the list is in the range `[0, 500]`.
- `-100 <= Node.val <= 100`
- `0 <= k <= 2 * 10^9`

---

## Solution Explanation

The core idea to solve this problem is to imagine the linked list as a circular track. If we connect the tail of the list to the head, we form a circle. Then, rotating the list is equivalent to finding a new head and a new tail in this circular list.

The number of rotations `k` can be very large, so we first need to optimize it. A full rotation of `length` places brings the list back to its original state. Therefore, we only need to perform `k % length` rotations.

After optimizing `k`, the node that was originally at position `length - k` becomes the new head. Its preceding node, at `length - k - 1`, becomes the new tail.

We can implement this logic using two main approaches.

### Approach 1: Calculate Length and Find New Tail

This is a straightforward approach where we first determine the list's properties and then perform the rotation.

#### Steps:

1.  **Handle Edge Cases:** If the list is empty (`!head`), has only one node (`!head.next`), or `k` is `0`, no rotation is needed. Return the original `head`.
2.  **Find Length and Tail:** Traverse the list to find its total `length` and get a reference to the `tail` node.
3.  **Optimize `k`:** Calculate `k = k % length`. If `k` is `0` after this, it means the number of rotations is a multiple of the list length, so the list remains unchanged. Return `head`.
4.  **Find the New Tail:** The new tail will be the node at index `length - k - 1`. We can find it by traversing from the `head` for `length - k - 1` steps.
5.  **Identify the New Head:** The node immediately after the `newTail` will be our `newHead`.
6.  **Perform Rotation:**
    -   Break the list by setting `newTail.next = null`.
    -   Form a circle by connecting the original `tail` to the original `head` (`tail.next = head`).
7.  **Return `newHead`:** The `newHead` is now the starting point of the rotated list.

```javascript
function rotateRightTwoPointers(head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }
  
  let length = 1;
  let tail = head;
  
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  
  k = k % length;
  if (k === 0) {
    return head;
  }
  
  let newTail = head;
  for (let i = 0; i < length - k - 1; i++) {
    newTail = newTail.next;
  }
  
  let newHead = newTail.next;
  
  newTail.next = null;
  tail.next = head;
  
  return newHead;
}
```

-   **Time Complexity:** `O(N)` - We traverse the list twice in the worst case: once to find the length and tail, and a second time to find the new tail.
-   **Space Complexity:** `O(1)` - We only use a few extra pointers, regardless of the list size.

---

### Approach 2: Alternative with Two Pointers (Fast and Slow)

This approach uses the classic "fast and slow pointer" technique to find the rotation point more directly after an initial pass to get the length.

#### Steps:

1.  **Handle Edge Cases & Get Length:** Similar to the first approach, handle edge cases and make an initial pass to calculate the `length` of the list.
2.  **Optimize `k`:** Calculate `k = k % length` and return `head` if `k` is `0`.
3.  **Set Up Pointers:** Initialize two pointers, `fast` and `slow`, both pointing to the `head`.
4.  **Advance Fast Pointer:** Move the `fast` pointer `k` steps forward. This creates a gap of `k` nodes between `fast` and `slow`.
5.  **Move Pointers Together:** Move both `fast` and `slow` pointers one step at a time until `fast` reaches the last node of the list (`fast.next === null`).
    -   Because of the initial gap, when `fast` is at the end, `slow` will be pointing to the node that needs to become the new tail.
6.  **Perform Rotation:**
    -   The `newHead` is the node after `slow` (`slow.next`).
    -   Break the list at the new tail: `slow.next = null`.
    -   Connect the original tail (now pointed to by `fast`) to the original head: `fast.next = head`.
7.  **Return `newHead`**.

```javascript
function rotateRightTwoPointersAlternative(head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }
  
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }
  
  k = k % length;
  if (k === 0) {
    return head;
  }
  
  let fast = head;
  let slow = head;
  
  for (let i = 0; i < k; i++) {
    fast = fast.next;
  }
  
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  
  let newHead = slow.next;
  slow.next = null;
  fast.next = head;
  
  return newHead;
}
```

-   **Time Complexity:** `O(N)` - We traverse the list to get the length, and then traverse it again with two pointers.
-   **Space Complexity:** `O(1)` - We only use a few extra pointers.
