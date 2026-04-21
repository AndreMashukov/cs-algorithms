# Problem: Find the Duplicate Number - Algorithm Walkthrough

## Input Example
nums = [1, 3, 4, 2, 2]

## Step-by-Step Execution

### Initial State
- Array: [1, 3, 4, 2, 2] (indices: 0, 1, 2, 3, 4)
- We'll treat this as an implicit linked list where nums[i] points to index nums[i]
- Starting point: index 0

### Implicit Linked List Structure
```
Index: 0 → 1 → 2 → 3 → 4
Value: 1   3   4   2   2
Points to index: 1 → 3 → 2 → 4 → 2 (cycle!)
```

### Phase 1: Cycle Detection (Find Intersection)
**Goal: Detect that a cycle exists and find any point within the cycle**

#### Step 1: Initialize Pointers
- slow = nums[0] = 1
- fast = nums[0] = 1

#### Step 2: First Iteration
- slow = nums[slow] = nums[1] = 3
- fast = nums[nums[fast]] = nums[nums[1]] = nums[3] = 2

```
Current state: slow = 3, fast = 2
Implicit path: 0 → 1 → 3, 0 → 1 → 3 → 2
```

#### Step 3: Second Iteration  
- slow = nums[3] = 2
- fast = nums[nums[2]] = nums[4] = 2

```
Current state: slow = 2, fast = 2 (INTERSECTION FOUND!)
```

**Intersection Point: Both pointers meet at value 2**

### Phase 2: Find Cycle Entrance (Find Duplicate)
**Goal: Find the entrance to the cycle, which is the duplicate number**

#### Step 4: Reset Slow Pointer
- slow = nums[0] = 1 (reset to beginning)
- fast = 2 (keep at intersection point)

#### Step 5: Move Both Pointers One Step at a Time

**Iteration 1:**
- slow = nums[1] = 3
- fast = nums[2] = 4

```
Current state: slow = 3, fast = 4
```

**Iteration 2:**
- slow = nums[3] = 2  
- fast = nums[4] = 2

```
Current state: slow = 2, fast = 2 (ENTRANCE FOUND!)
```

### Visual Diagram: Complete Cycle Structure
```
       Start
         ↓
    Index: 0 → 1 → 2 ← 4
           ↓    ↓    ↓ ↗ ↑
       Value: 1 → 3 → 4 → 2
                      ↓   ↑
                   Index 3
                      ↓   ↑
                   Value 2 → (points back to index 2)
                             ↑________________↓
                                  CYCLE!
```

**Cycle Analysis:**
- Cycle nodes: indices 2 → 4 → 2 (values 4 → 2 → 4)
- Cycle entrance: index 2 (value 4? NO!)
- Wait - let me recalculate...

**Correct Analysis:**
```
Index path: 0 → 1 → 3 → 2 → 4 → 2 (cycle: 2 ↔ 4)
Value path: 1 → 3 → 2 → 4 → 2 → 4
```

The cycle is between indices 2 and 4, but the duplicate VALUE is 2.
The entrance to the cycle in terms of values visited is when we first encounter the value 2.

## Key Implementation Details
1. **Implicit Linked List**: We use array values as pointers to indices, creating a linked list structure without explicit nodes.

2. **Cycle Guarantee**: Since we have n+1 numbers in range [1,n], by pigeonhole principle, one number must appear twice, creating a cycle.

3. **Two-Phase Detection**: 
   - Phase 1 finds ANY point in the cycle
   - Phase 2 finds the ENTRANCE to the cycle

4. **Mathematical Property**: The distance from start to cycle entrance equals the distance from intersection point to cycle entrance.

## Edge Cases Handled
1. **Minimum case** (nums = [1,1]): Algorithm correctly identifies 1 as duplicate
2. **All same values** (nums = [2,2,2,2]): Correctly finds 2 as the duplicate
3. **Large arrays**: O(n) time complexity scales efficiently
4. **Cycle at beginning**: Works when duplicate creates immediate cycle

## Final Result
The duplicate number is **2**, found where both pointers meet in Phase 2.