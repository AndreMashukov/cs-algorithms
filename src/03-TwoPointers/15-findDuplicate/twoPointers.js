// 287. Find the Duplicate Number
// https://leetcode.com/problems/find-the-duplicate-number/description/?envType=problem-list-v2&envId=two-pointers
// Problem Description:
// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
// There is only one repeated number in nums, return this repeated number.
// You must solve the problem without modifying the array nums and uses only constant extra space.
//
// Example 1:
// Input: nums = [1,3,4,2,2]
// Output: 2
//
// Example 2:
// Input: nums = [3,1,3,4,2]
// Output: 3
//
// Constraints:
// - 1 <= n <= 10^5
// - nums.length == n + 1
// - 1 <= nums[i] <= n
// - All the integers in nums appear only once except for one integer which appears exactly twice.

/**
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicateTwoPointers(nums) {
  // Use Floyd's Cycle Detection Algorithm (Tortoise and Hare)
  // Since values are in range [1, n] and array has n+1 elements,
  // we can treat the array as a linked list where nums[i] points to index nums[i]
  
  // Phase 1: Find intersection point in the cycle
  // Initialize slow pointer (tortoise) - moves one step at a time
  let slow = nums[0];
  // Initialize fast pointer (hare) - moves two steps at a time
  let fast = nums[0];
  
  // Move pointers until they meet inside the cycle
  // This loop will always terminate because there's guaranteed to be a cycle
  do {
    // Slow pointer moves one step: follows nums[slow]
    slow = nums[slow];
    // Fast pointer moves two steps: follows nums[nums[fast]]
    fast = nums[nums[fast]];
  } while (slow !== fast);
  
  // Phase 2: Find the entrance to the cycle (which is the duplicate number)
  // Reset slow pointer to the beginning
  slow = nums[0];
  
  // Move both pointers one step at a time until they meet
  // The meeting point will be the start of the cycle (duplicate number)
  while (slow !== fast) {
    // Both pointers now move at the same speed
    slow = nums[slow];
    fast = nums[fast];
  }
  
  // The meeting point is the duplicate number
  return slow;
}

// Key Insights:
// 1. We can model this as a cycle detection problem in a linked list
// 2. Each number points to an index, creating implicit links
// 3. The duplicate number creates a cycle because multiple indices point to it
// 4. Floyd's algorithm finds cycles in O(n) time with O(1) space
// 5. The entrance to the cycle is always the duplicate number

// Example Usage:
console.log(findDuplicateTwoPointers([1, 3, 4, 2, 2])); // Expected: 2
console.log(findDuplicateTwoPointers([3, 1, 3, 4, 2])); // Expected: 3
console.log(findDuplicateTwoPointers([1, 1])); // Expected: 1
console.log(findDuplicateTwoPointers([2, 2, 2, 2, 2])); // Expected: 2