// You are given an array of integers nums and an integer target.

// For each number in the array, you can choose to either add or subtract it to a total sum.

// For example, if nums = [1, 2], one possible sum would be "+1-2=-1".
// If nums=[1,1], there are two different ways to sum the input numbers to get a sum of 0: "+1-1" and "-1+1".

// Return the number of different ways that you can build the expression such that the total sum equals target.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  findTargetSumWays(nums, target) {
    const dp = new Map();

    const dfs = (index, total) => {
      const key = `${index} - ${total}`;
      if (index === nums.length) {
        return total === target ? 1 : 0;
      }

      if (dp.has(key)) {
        return dp.get(key);
      }

      const ways =
        dfs(index + 1, total + nums[index]) +
        dfs(index + 1, total - nums[index]);
      dp.set(key, ways);
      return ways;
    };

    return dfs(0, 0);
  }
}

// Example usage
console.log(new Solution().findTargetSumWays([1, 1, 1, 1, 1], 3)); // 5