# Follow-up: Dungeon Game

This document outlines a Socratic follow-up to address a common mistake in the "Dungeon Game" dynamic programming solution.

## Conceptual Probe

Based on the error in the initial solution, the fundamental concept of dynamic programming that seems to be missing is how to correctly incorporate the problem's core constraint (health must always be >= 1) into the state transition formula.

**Question 1:** When calculating the health needed at a cell `(i, j)`, you correctly determine the minimum health required for the *rest* of the path (`minHealthNeeded`). If the current cell `dungeon[i][j]` contains a large health potion (a large positive number), what is the absolute minimum health the knight must have *before* entering this cell, regardless of how big the potion is?

**Question 2:** The incorrect code uses `Math.min(1, minHealthNeeded - dungeon[i][j])`. Let's say `minHealthNeeded` (the health required for the optimal path from the next cell onwards) is 8, and the current cell `dungeon[i][j]` has a value of -3 (a demon). What health value does the incorrect formula calculate? What value should it logically be?

## "What If" Scenario

After understanding that the health must be clamped at a minimum of 1, the next step is to apply this logic to a new problem.

**Prompt:** That makes sense. I understand now that I should focus on ensuring the health is always at least 1 by using `Math.max(1, ...)`. Can you give me a new, small input for the Dungeon Game? Let me try to solve it.

**New Input:**
Try to calculate the minimum health needed for the following dungeon:

```
[[-2, -3],
 [10, -5]]
```

Walk through the calculation step-by-step, starting from the princess's location, to find the required health at the start `(0, 0)`.
