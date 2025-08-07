/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
  const map = new Map();
  const ROWS = dungeon.length;
  const COLS = dungeon[0].length;

  const dfs = (i, j) => {
    if (i >= ROWS || j >= COLS) {
      return Infinity
    }

    if (i === ROWS - 1 && j === COLS - 1) {
      return Math.max(1, 1 - dungeon[i][j])
    }

    const key = `${i},${j}`
    if (map.has(key)) {
      return map.get(key);
    }

    const moveDown = dfs(i + 1, j);
    const moveRight = dfs(i, j + 1);

    const minHealthNeeded = Math.min(moveDown, moveRight);

    const currentMinHealth = Math.min(1, minHealthNeeded - dungeon[i][j]);

    map.set(key, currentMinHealth)
    return currentMinHealth
  }

  return dfs(0, 0)
};