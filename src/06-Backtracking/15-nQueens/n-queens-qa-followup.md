## ❌ Bug Analysis: n-Queens Column Tracking Error

**Your Code:** `col.add(r)` and `col.delete(r)` on lines 26 and 31
**Correct Code:** `col.add(c)` and `col.delete(c)`
**Concept:** Variable confusion in backtracking constraint tracking

### 🚫 Why Using `r` Instead of `c` is Incorrect

The bug occurs because you're tracking the **row number** (`r`) in the column set instead of the **column number** (`c`). This fundamentally breaks the collision detection system.

**What happens with the bug:**
- When placing a queen at position `(r=0, c=2)`, the code adds `r=0` to the column set
- When checking if column `c=2` is available, it looks for `c=2` in the set, but finds `r=0` instead
- The algorithm thinks column 2 is free when it's actually occupied
- This leads to multiple queens being placed in the same column, violating the n-Queens constraint

**Why this mistake is easy to make:**
- Both `r` and `c` are single-letter variables that look similar
- The pattern `col.add(c)` appears right after checking `col.has(c)`, making it easy to accidentally use the wrong variable
- The row-based iteration (`for (let c = 0; c < n; c++)`) can make you think about rows when you should think about columns

### ✅ Understanding the Correct Approach

The n-Queens problem requires tracking three types of constraints:
1. **Columns**: Only one queen per column (tracked by column index `c`)
2. **Positive Diagonals**: Only one queen per diagonal going top-left to bottom-right (tracked by `r + c`)
3. **Negative Diagonals**: Only one queen per diagonal going top-right to bottom-left (tracked by `r - c`)

Since we place queens row by row (one queen per row is guaranteed by the algorithm structure), we only need to track columns and diagonals. The column set stores **which column indices are occupied**, not row indices.

#### Diagram 1: Constraint Tracking System Overview

```
┌─────────────────────────────────────────────────────────┐
│              n-Queens Constraint Tracking                │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Column Set   │  │ Pos Diag Set │  │ Neg Diag Set │
│              │  │              │  │              │
│ Tracks: c    │  │ Tracks: r+c  │  │ Tracks: r-c  │
│              │  │              │  │              │
│ Example:     │  │ Example:     │  │ Example:     │
│ {0, 2, 3}    │  │ {1, 3, 5}    │  │ {-1, 0, 2}   │
│              │  │              │  │              │
│ ❌ Bug: {r}  │  │ ✅ Correct   │  │ ✅ Correct   │
│ ✅ Fix: {c}  │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Queen Placement       │
              │  at (r, c)            │
              │                       │
              │  Check all 3 sets     │
              │  before placing       │
              └───────────────────────┘
```

**Explanation:** This diagram shows the three constraint tracking sets. The column set must track **column indices** (`c`), not row indices (`r`). Each set serves a different purpose: columns prevent vertical attacks, positive diagonals prevent one diagonal direction, and negative diagonals prevent the other diagonal direction.

#### Diagram 2: Step-by-Step Execution Showing the Bug

```
Placement Sequence (n=4):

Step 1: Place Queen at (r=0, c=0)
─────────────────────────────────────
Board:          Column Set:         Expected:        Actual (Bug):
Q . . .         {0}                 {0} ✅           {0} ✅
. . . .         
. . . .         
. . . .         

Step 2: Place Queen at (r=1, c=2)
─────────────────────────────────────
Board:          Column Set:         Expected:        Actual (Bug):
Q . . .         {0, 2}              {0, 2} ✅        {0, 1} ❌
. . Q .         
. . . .         
. . . .         

Step 3: Try to place at (r=2, c=2)
─────────────────────────────────────
Check: col.has(2)?
Expected: true  (column 2 is occupied)
Actual:   false (set has {0,1}, not {0,2}) ❌

Result: Algorithm incorrectly places queen at (r=2, c=2)
─────────────────────────────────────
Board:          Column Set:         Status:
Q . . .         {0, 1, 2}           ❌ INVALID!
. . Q .         (should be {0,2,2}) Two queens in column 2!
. . Q .         
. . . .         

═══════════════════════════════════════════════════════════

Correct Execution (with fix):

Step 1: Place Queen at (r=0, c=0)
─────────────────────────────────────
col.add(c) → col.add(0) → {0} ✅

Step 2: Place Queen at (r=1, c=2)
─────────────────────────────────────
col.add(c) → col.add(2) → {0, 2} ✅

Step 3: Try to place at (r=2, c=2)
─────────────────────────────────────
col.has(2)? → true ✅ (correctly detects collision)
Result: Skip column 2, try next column ✅
```

**Explanation:** This diagram demonstrates how the bug manifests during execution. When you use `col.add(r)` instead of `col.add(c)`, the column set tracks row numbers instead of column numbers. This causes the collision detection to fail, allowing multiple queens in the same column. The correct version tracks column indices, properly preventing column collisions.

### 🎯 Key Takeaways

1. **Core Principle:** When tracking constraints in backtracking, always use the variable that represents the constraint being tracked. For columns, use `c` (column index), not `r` (row index).

2. **Common Mistake:** Variable name confusion between similar single-letter variables (`r` vs `c`). Always double-check that you're using the correct variable that matches the constraint being tracked.

3. **Memory Aid:** 
   - **C**olumn set tracks **C**olumns → use `c`
   - **R**ow iteration doesn't need tracking (one queen per row is guaranteed by algorithm structure)
   - When in doubt, ask: "What am I tracking?" → Answer: "Column positions" → Use: `c`

4. **Debugging Tip:** When debugging backtracking problems, print the constraint sets after each placement to verify they contain the expected values. If you see row numbers in the column set, you've found the bug!

═══════════════════════════════════════════════════════════

