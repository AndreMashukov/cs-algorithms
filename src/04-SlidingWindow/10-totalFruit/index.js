// 904. Fruit Into Baskets
// https://leetcode.com/problems/fruit-into-baskets/description/

// You are visiting a farm that has a single row of fruit trees arranged from left to right.
// The trees are represented by an integer array fruits where fruits[i]
// is the type of fruit the ith tree produces.

// You want to collect as much fruit as possible. However,
// the owner has some strict rules that you must follow:
// You only have two baskets, and each basket can only hold a single type of fruit.
// There is no limit on the amount of fruit each basket can hold.
// Starting from any tree of your choice, you must pick exactly one fruit
// from every tree (including the start tree) while moving to the right.
// The picked fruits must fit in one of your baskets.
// Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
// Given the integer array fruits, return the maximum number of fruits you can pick.

// Example 1:
// Input: fruits = [1,2,1]
// Output: 3
// Explanation: We can pick from all 3 trees.

/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function (fruits) {
  const count = new Map() // Map to store the frequency of fruits in the current window
  let l = 0 // Initialize the left pointer
  let res = 0 // Initialize the result
  let total = 0 // Initialize the total number of fruits in the current window

  for (let r = 0; r < fruits.length; r++) {
    // Add the current fruit to the count map
    count.set(fruits[r], (count.get(fruits[r]) || 0) + 1)
    total += 1

    // Shrink the window from the left until the total number of fruits is less than or equal to 2
    while (total > 2) {
      count.set(fruits[l], count.get(fruits[l]) - 1)
      if (count.get(fruits[l]) === 0) {
        count.delete(fruits[l])
      }
      l += 1
      total -= 1
    }

    // Update the result with the maximum number of fruits in the current window
    res = Math.max(res, r - l + 1)
  }
}
