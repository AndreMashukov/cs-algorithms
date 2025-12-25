/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
  const map = new Map();

  const dfs = (i) => {
    if (i >= days.length) {
      return 0
    }

    if (map.has(i)) {
      return map.get(i)
    }

    res = Infinity;
    const durations = [1, 7, 30];
    for (let j = 0; j < costs.length; j++) {
      let nextDay = i;
      const expiry = days[i] + durations[j] - 1

      while (nextDay < days.length && days[nextDay] <= expiry) {
        nextDay++
      }

      res = Math.min(res, costs[j] + dfs(nextDay))
    }
    map.set(i, res)
    return res 
  }

  return dfs(0)
};