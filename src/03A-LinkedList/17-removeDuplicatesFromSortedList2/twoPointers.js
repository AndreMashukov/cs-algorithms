// 82. Remove Duplicates from Sorted List II
// https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/?envType=problem-list-v2&envId=two-pointers
// Problem Description:
// Given the head of a sorted linked list, delete all nodes that have duplicate numbers, 
// leaving only distinct numbers from the original list. Return the linked list sorted as well.
//
// Example 1:
// Input: head = [1,2,3,3,4,4,5]
// Output: [1,2,5]
//
// Example 2:
// Input: head = [1,1,1,2,3]
// Output: [2,3]
//
// Example 3:
// Input: head = [1,1]
// Output: []
//
// Constraints:
// - The number of nodes in the list is in the range [0, 300].
// - -100 <= Node.val <= 100
// - The list is guaranteed to be sorted in ascending order.

// Definition for singly-linked list node
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicatesTwoPointers(head) {
  // Create a dummy node to handle edge cases where head needs to be removed
  // This simplifies handling cases where the first nodes are duplicates
  let dummy = new ListNode(0);
  dummy.next = head;
  
  // prev: pointer to the last node in the result list (before potential duplicates)
  // current: pointer to traverse and examine nodes for duplicates
  let prev = dummy;
  let current = head;
  
  while (current) {
    // Check if current node has duplicates (current.val == current.next.val)
    if (current.next && current.val === current.next.val) {
      // Found duplicates - we need to skip ALL nodes with this value
      let duplicateValue = current.val;
      
      // Skip all nodes with the same value (including the first occurrence)
      while (current && current.val === duplicateValue) {
        current = current.next;
      }
      
      // Connect previous node to the first non-duplicate node
      // This effectively removes all duplicate nodes
      prev.next = current;
    } else {
      // No duplicates found for current node
      // Move prev pointer forward to include this node in result
      prev = current;
      current = current.next;
    }
  }
  
  // Return the result list (skip dummy node)
  return dummy.next;
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
const list1 = createLinkedList([1, 2, 3, 3, 4, 4, 5]);
const result1 = deleteDuplicatesTwoPointers(list1);
console.log("Input: [1,2,3,3,4,4,5] -> Output:", linkedListToArray(result1)); // Expected: [1,2,5]

const list2 = createLinkedList([1, 1, 1, 2, 3]);
const result2 = deleteDuplicatesTwoPointers(list2);
console.log("Input: [1,1,1,2,3] -> Output:", linkedListToArray(result2)); // Expected: [2,3]

const list3 = createLinkedList([1, 1]);
const result3 = deleteDuplicatesTwoPointers(list3);
console.log("Input: [1,1] -> Output:", linkedListToArray(result3)); // Expected: []

const list4 = createLinkedList([1, 2, 2]);
const result4 = deleteDuplicatesTwoPointers(list4);
console.log("Input: [1,2,2] -> Output:", linkedListToArray(result4)); // Expected: [1]

const list5 = createLinkedList([]);
const result5 = deleteDuplicatesTwoPointers(list5);
console.log("Input: [] -> Output:", linkedListToArray(result5)); // Expected: []