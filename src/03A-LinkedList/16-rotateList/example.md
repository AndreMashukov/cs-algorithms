# Problem: Rotate List - Algorithm Walkthrough

## Input Example
head = [1, 2, 3, 4, 5], k = 2

## Step-by-Step Execution

### Initial State
- Linked List: 1 → 2 → 3 → 4 → 5 → null
- k = 2 (rotate right by 2 positions)
- Goal: Move last 2 nodes to the front

### Phase 1: Find List Length and Tail
**Purpose: Determine list length and locate the tail for later connection**

#### Step 1: Initialize Traversal
- length = 1
- tail = head (points to node 1)

#### Step 2: Traverse to End
```
Iteration 1: tail = 2, length = 2
Iteration 2: tail = 3, length = 3  
Iteration 3: tail = 4, length = 4
Iteration 4: tail = 5, length = 5
```

**Result: length = 5, tail points to node 5**

### Phase 2: Optimize k
```
k = k % length = 2 % 5 = 2
Since k ≠ 0, rotation is needed
```

### Phase 3: Find New Tail and New Head
**Purpose: Identify where to break the list for rotation**

#### Calculate New Tail Position
- New tail position = length - k - 1 = 5 - 2 - 1 = 2 (0-indexed)
- This means the 3rd node (index 2) becomes the new tail

#### Step 3: Find New Tail
- newTail = head (starts at node 1)
- Loop (length - k - 1) = 2 times:

```
Iteration 1: newTail = node 2
Iteration 2: newTail = node 3
```

**Result: newTail points to node 3**

#### Step 4: Identify New Head
- newHead = newTail.next = node 4

### Phase 4: Perform Rotation
**Purpose: Break and reconnect links to achieve rotation**

#### Before Rotation:
```
1 → 2 → 3 → 4 → 5 → null
    ↑       ↑       ↑
    │    newTail   tail
    │               
    head       newHead
```

#### Step 5: Break the Link
- newTail.next = null
- Result: 1 → 2 → 3 → null, 4 → 5 → null

#### Step 6: Connect Old Tail to Old Head  
- tail.next = head
- Result: 4 → 5 → 1 → 2 → 3 → null

### Visual Diagram: Complete Transformation
```
Original List:
1 → 2 → 3 → 4 → 5 → null

After k=2 right rotation:
4 → 5 → 1 → 2 → 3 → null
↑                       ↑
newHead              newTail

Transformation Process:
Step 1: Identify break point (after node 3)
        1 → 2 → 3 | 4 → 5
        
Step 2: Break and reconnect
        4 → 5 → 1 → 2 → 3
```

### Two-Pointer Alternative Approach

#### Step 1: Use Two Pointers with k Distance
```
Initial: fast = slow = node 1

Move fast k=2 positions ahead:
slow: 1 → 2 → 3 → 4 → 5
fast:      3 → 4 → 5
```

#### Step 2: Move Both Until Fast Reaches End
```
Iteration 1:
slow: 2, fast: 4

Iteration 2:  
slow: 3, fast: 5 (fast.next = null, stop)
```

**Result: slow = node 3 (new tail), fast = node 5 (old tail)**

## Key Implementation Details
1. **Length Optimization**: Use k % length to handle large k values efficiently
2. **Two-Pass vs One-Pass**: We can find length first or use two pointers with gap
3. **Link Management**: Carefully break at new tail and connect old tail to old head
4. **Edge Cases**: Handle empty lists, single nodes, and k=0 cases

## Edge Cases Handled
1. **Empty List**: Return null immediately
2. **Single Node**: Return same node (rotation doesn't change single node)
3. **k = 0**: No rotation needed
4. **k ≥ length**: Use modulo to find effective rotation
5. **k = length**: Results in original list (k % length = 0)

## Final Result
**Output: [4, 5, 1, 2, 3]**
- Original list rotated right by 2 positions
- Last 2 nodes (4, 5) moved to the front
- Remaining nodes (1, 2, 3) maintain their relative order