class Solution {
  /**
   * @param {number[]} temperatures
   * @return {number[]}
   */
  dailyTemperatures(temperatures) {
      const res = new Array(temperatures.length).fill(0);
      const stack = []; // pair: [temp, index]

      for (let i = 0; i < temperatures.length; i++) {
          const t = temperatures[i];
          while (stack.length > 0 && t > stack[stack.length - 1][0]) {
              const [stackT, stackInd] = stack.pop();
              res[stackInd] = i - stackInd;
          }
          stack.push([t, i]);
      }
      return res;
  }
}