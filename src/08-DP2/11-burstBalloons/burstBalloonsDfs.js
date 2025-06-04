// You are given an array of integers nums of size n.
// The ith element represents a balloon with an integer value of nums[i].
// You must burst all of the balloons.

// If you burst the ith balloon,
// you will receive nums[i - 1] * nums[i] * nums[i + 1] coins.
// If i - 1 or i + 1 goes out of bounds of the array,
// then assume the out of bounds value is 1.

// Return the maximum number of coins
// you can receive by bursting all of the balloons.

const maxCoinsDfs = (nums) => {
  const n = nums.length;
  const map = new Map();
  // Add 1 to both ends of the nums array to handle edge cases
  const newNums = [1, ...nums, 1];

  // Helper function to perform depth-first search
  const dfs = (left, right) => {
    // Base case: no balloons to burst between left and right
    if (left + 1 === right) {
      return 0;
    }

    const key = `${left},${right}`;
    // Check if the result is already computed and stored in memo
    if (map.has(key)) {
      return map.get(key);
    }

    let coins = 0;
    // Iterate through all possible balloons to burst between left and right
    for (let i = left + 1; i < right; i++) {
      // Calculate the maximum coins by bursting the ith balloon last
      coins = Math.max(
        coins,
        newNums[left] * newNums[i] * newNums[right] +
          dfs(left, i) +
          dfs(i, right)
      );
    }

    // Store the result in memo
    map.set(key, coins);
    return coins;
  };

  // Start the DFS from the full range of the newNums array
  return dfs(0, n + 1);
};

console.log(maxCoinsDfs([3, 1, 5, 8])); // 167
console.log(maxCoinsDfs([1, 5])); // 10

//   0 1 2 3
// 1 3 1 5 8 1
// dfs(END) = max (
//  1 * 3 * 1 + 0 + dfs(1, 3),
//  1 * 1 * 1 + dfs(0, 0) + dfs(2, 3),
//  1 * 5 * 1 + dfs(0, 1) + dfs(3, 3),
//  1 * 8 * 1 + dfs(0, 2)
// )
// dfs(1, 3) = max (
//  3 * 1 * 1 + dfs(2, 3),
//  3 * 5 * 1 + dfs(1, 2) + dfs(3, 3),
//  3 * 8 * 1 + dfs(1, 2)
