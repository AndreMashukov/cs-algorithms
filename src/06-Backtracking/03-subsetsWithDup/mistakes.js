class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  subsetsWithDup(nums) {
      const res = [];
      
      const dfs = (i, cur) => {
          if (i >= nums.length) {
              res.push([...cur]);
              return;
          }

          cur.push(nums[i])
          dfs(i + 1, cur)
          cur.pop();
          while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
              i++
          }
         
          dfs(i + 1, cur)
      }

      dfs(0, [])
      return res
  }
}
