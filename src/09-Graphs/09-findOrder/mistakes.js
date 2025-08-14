/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  const preReq = new Map();
  const visit = new Set();
  const cycle = new Set();
  const output = [];

  for (let [c, pre] of prerequisites) {
    if (!preReq.has(c)) {
      preReq.set(c, [])
    }

    preReq.get(c).push(pre)
  }

  // console.log(preReq)

  const dfs = (crs) => {
    if (cycle.has(crs)) {
      return false
    }

    if (visit.has(crs)) {
      return true
    }

    cycle.add(crs)
    for (let c of preReq.get(crs) || []) {
      if (!dfs) {
        return false
      }
    }

    cycle.delete(crs);
    visit.add(crs);
    output.push(crs)
  }

  for (let c = 0; c < numCourses; c++) {
    if (!dfs(c)) {
      return []
    }
  }

  return output
};