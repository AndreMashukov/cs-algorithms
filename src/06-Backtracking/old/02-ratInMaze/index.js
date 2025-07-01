/**
 * A concise solution to the Rat in Maze problem.
 * The rat needs to find a path from top-left (0,0) to bottom-right (n-1,n-1)
 * @param {number[][]} maze - The maze with 1s as valid paths and 0s as walls
 * @returns {number[][]} - The solution path marked with 1s
 */
function findPath(maze) {
    const n = maze.length;
    const board = Array(n).fill().map(() => Array(n).fill(0));
    
    // Possible movements: right and down only (for simplicity)
    const moves = [[0, 1], [1, 0]]; // [x, y] coordinates for right and down
    
    function isValid(x, y) {
        return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1;
    }
    
    function solve(x, y) {
        // Base case: reached destination
        if (x === n - 1 && y === n - 1) {
            board[x][y] = 1;
            return true;
        }
        
        // Check if current position is valid
        if (isValid(x, y)) {
            // Mark current cell as part of solution
            board[x][y] = 1;
            
            // Try each possible movement
            for (const [dx, dy] of moves) {
                const nextX = x + dx;
                const nextY = y + dy;
                
                if (solve(nextX, nextY)) {
                    return true;
                }
            }
            
            // If no movement works, backtrack
            board[x][y] = 0;
        }
        
        return false;
    }
    
    // Start from top-left corner
    if (solve(0, 0)) {
        return board;
    }
    return null; // No path found
}

// Example usage:
const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
];

console.log("Maze:");
console.log(maze);
console.log("\nSolution path (1 represents the path):");
console.log(findPath(maze));

module.exports = { findPath };

// Maze:
// [ [ 1, 0, 0, 0 ],
//  [ 1, 1, 0, 1 ],
//  [ 0, 1, 0, 0 ],
//  [ 1, 1, 1, 1 ] ]

// Solution path (1 represents the path):
// [ [ 1, 0, 0, 0 ],
//  [ 1, 1, 0, 0 ],
//  [ 0, 1, 0, 0 ],
//  [ 0, 1, 1, 1 ] ]