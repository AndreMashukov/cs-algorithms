/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pacific = Array.from({ length: m }, () => new Uint8Array(n))
  const atlantic = Array.from({ length: m }, () => new Uint8Array(n))
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const bfs = (starts, reachable) => {
    const queue = starts.slice();
    starts.forEach(([r, c]) => reachable[r][c] = 1)
    let i = 0;
    while (i < queue.length) {
      const [r, c] = queue[i++]
      for (const [dr, dc] of dirs) {
        const nr = r + dr
        const nc = c + dc
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && !reachable[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          reachable[nr][nc] = 1
          queue.push([nr, nc])
        }
      }
    }
  }

  const pacificStarts = [];
  const atlanticStarts = [];
  for (let r = 0; r < m; r++) {
    pacificStarts.push([r, 0])
    atlanticStarts.push([r, n - 1]);
  }
  
  for (let c = 0; c < n; c++) {
    pacificStarts.push([0, c]);
    atlanticStarts.push([m - 1, c])
  }

  bfs(pacificStarts, pacific)
  bfs(atlanticStarts, atlantic);

  const result = []
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) result.push([r, c])
    }
  }
  return result
};