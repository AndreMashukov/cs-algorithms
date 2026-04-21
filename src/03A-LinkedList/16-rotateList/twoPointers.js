// 61. Rotate List
// https://leetcode.com/problems/rotate-list/description/?envType=problem-list-v2&envId=two-pointers
// https://www.youtube.com/watch?v=UcGtPs2LE_c
// Problem Description:
// Given the head of a linked list, rotate the list to the right by k places.
//
// Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]
//
// Example 2:
// Input: head = [0,1,2], k = 4
// Output: [2,0,1]
//
// Example 3:
// Input: head = [1], k = 1
// Output: [1]
//
// Constraints:
// - The number of nodes in the list is in the range [0, 500].
// - -100 <= Node.val <= 100
// - 0 <= k <= 2 * 10^9

// Alternative approach using two pointers to find the break point
function rotateRightTwoPointersAlternative(head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }
  
  // First pass: get length
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }
  
  // Optimize k
  k = k % length;
  if (k === 0) {
    return head;
  }
  
  // Use two pointers with k distance between them
  let fast = head;
  let slow = head;
  
  // Move fast pointer k steps ahead
  for (let i = 0; i < k; i++) {
    fast = fast.next;
  }
  
  // Move both pointers until fast reaches the last node
  // slow will be at the new tail position
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // Now slow is at the new tail, slow.next is the new head
  let newHead = slow.next;
  slow.next = null;  // Break the link
  fast.next = head;  // Connect old tail to old head
  
  return newHead;
}

// Helper function to create a linked list from array
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  
  let head = new ListNode(arr[0]);
  let current = head;
  
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  
  return head;
}

// Helper function to convert linked list to array for display
function linkedListToArray(head) {
  let result = [];
  let current = head;
  
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  
  return result;
}

// Example Usage:
const list1 = createLinkedList([1, 2, 3, 4, 5]);
const rotated1 = rotateRightTwoPointers(list1, 2);
console.log("Input: [1,2,3,4,5], k=2 -> Output:", linkedListToArray(rotated1)); // Expected: [4,5,1,2,3]

const list2 = createLinkedList([0, 1, 2]);
const rotated2 = rotateRightTwoPointers(list2, 4);
console.log("Input: [0,1,2], k=4 -> Output:", linkedListToArray(rotated2)); // Expected: [2,0,1]

const list3 = createLinkedList([1]);
const rotated3 = rotateRightTwoPointers(list3, 1);
console.log("Input: [1], k=1 -> Output:", linkedListToArray(rotated3)); // Expected: [1]

const list4 = createLinkedList([1, 2]);
const rotated4 = rotateRightTwoPointers(list4, 2);
console.log("Input: [1,2], k=2 -> Output:", linkedListToArray(rotated4)); // Expected: [1,2]