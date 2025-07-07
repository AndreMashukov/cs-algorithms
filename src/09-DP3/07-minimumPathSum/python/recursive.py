from typing import List, Dict

def min_path_sum(grid: List[List[int]]) -> int:
    """
    Recursive solution with memoization for Minimum Path Sum.
    This approach uses DFS with memoization to find the minimum sum path.
    
    Args:
        grid: 2D grid with non-negative numbers
        
    Returns:
        int: Minimum sum from top-left to bottom-right
    """
    # Get grid dimensions
    m = len(grid)
    n = len(grid[0])
    
    # Create memoization cache to store computed minimum sums
    memo: Dict[str, int] = {}
    
    def find_min_sum(row: int, col: int) -> int:
        """
        Recursive helper function to find minimum path sum from current position to target.
        
        Args:
            row: Current row position
            col: Current column position
            
        Returns:
            int: Minimum sum from current position to bottom-right
        """
        # Base case: reached the target (bottom-right corner)
        if row == m - 1 and col == n - 1:
            return grid[row][col]
        
        # Base case: out of bounds (return large value to avoid this path)
        if row >= m or col >= n:
            return float('inf')
        
        # Create unique key for memoization
        key = f"{row}-{col}"
        
        # Check if result already computed and cached
        if key in memo:
            return memo[key]
        
        # Calculate minimum sum by exploring right and down moves
        right_path = find_min_sum(row, col + 1)
        down_path = find_min_sum(row + 1, col)
        
        # Current cell cost + minimum of right and down paths
        min_sum = grid[row][col] + min(right_path, down_path)
        
        # Cache the result for future use
        memo[key] = min_sum
        
        # Return minimum sum from current position
        return min_sum
    
    # Start the recursive search from top-left corner (0, 0)
    return find_min_sum(0, 0)

# Example usage:
# grid = [
#     [1,3,1],
#     [1,5,1],
#     [4,2,1]
# ]
# result = min_path_sum(grid)  # Output: 7
