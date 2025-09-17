# Problem: Remove Duplicates from Sorted List II - Algorithm Walkthrough

## Input Example
head = [1, 2, 3, 3, 4, 4, 5]

## Step-by-Step Execution

### Initial State
- Original List: 1 → 2 → 3 → 3 → 4 → 4 → 5 → null
- Create dummy node: dummy → 1 → 2 → 3 → 3 → 4 → 4 → 5 → null
- prev = dummy (points to dummy node)
- current = head (points to node 1)

### Processing Each Node

#### Step 1: Process Node 1
- current = 1, current.next = 2
- Check: 1 === 2? No (no duplicates)
- Action: Move both pointers forward
  - prev = node 1
  - current = node 2

```
dummy → 1 → 2 → 3 → 3 → 4 → 4 → 5 → null
        ↑   ↑
       prev current
```

#### Step 2: Process Node 2  
- current = 2, current.next = 3
- Check: 2 === 3? No (no duplicates)
- Action: Move both pointers forward
  - prev = node 2  
  - current = node 3

```
dummy → 1 → 2 → 3 → 3 → 4 → 4 → 5 → null
            ↑   ↑
           prev current
```

#### Step 3: Process Node 3 (First Duplicate Detection)
- current = 3, current.next = 3
- Check: 3 === 3? Yes (duplicates found!)
- duplicateValue = 3
- Action: Skip ALL nodes with value 3

**Skip Loop:**
```
Iteration 1: current = first 3, current.val = 3 === duplicateValue ✓
            current = current.next (second 3)
            
Iteration 2: current = second 3, current.val = 3 === duplicateValue ✓  
            current = current.next (node 4)
            
Iteration 3: current = node 4, current.val = 4 ≠ duplicateValue ✗
            Exit loop
```

- Connect prev to current: prev.next = current (node 4)
- prev stays at node 2, current now at node 4

```
dummy → 1 → 2 → 4 → 4 → 5 → null
            ↑   ↑
           prev current
```

#### Step 4: Process Node 4 (Second Duplicate Detection)
- current = 4, current.next = 4  
- Check: 4 === 4? Yes (duplicates found!)
- duplicateValue = 4
- Action: Skip ALL nodes with value 4

**Skip Loop:**
```
Iteration 1: current = first 4, current.val = 4 === duplicateValue ✓
            current = current.next (second 4)
            
Iteration 2: current = second 4, current.val = 4 === duplicateValue ✓
            current = current.next (node 5)
            
Iteration 3: current = node 5, current.val = 5 ≠ duplicateValue ✗
            Exit loop
```

- Connect prev to current: prev.next = current (node 5)
- prev stays at node 2, current now at node 5

```
dummy → 1 → 2 → 5 → null
            ↑   ↑
           prev current
```

#### Step 5: Process Node 5
- current = 5, current.next = null
- Check: current.next exists? No
- Action: Move both pointers forward
  - prev = node 5
  - current = null (end of list)

### Visual Diagram: Complete Transformation
```
Original List:
1 → 2 → 3 → 3 → 4 → 4 → 5 → null

After removing all duplicates (3,3) and (4,4):
1 → 2 → 5 → null

Step-by-step removal:
Step 1: 1 → 2 → [3 → 3] → 4 → 4 → 5   (detect 3,3)
Step 2: 1 → 2 → 4 → 4 → 5               (skip 3,3)  
Step 3: 1 → 2 → [4 → 4] → 5             (detect 4,4)
Step 4: 1 → 2 → 5                       (skip 4,4)
```

### Alternative Example: All Duplicates
**Input: [1, 1, 2, 2, 3, 3]**

```
Step 1: [1 → 1] → 2 → 2 → 3 → 3    (detect 1,1)
Step 2: 2 → 2 → 3 → 3               (skip 1,1)
Step 3: [2 → 2] → 3 → 3             (detect 2,2)  
Step 4: 3 → 3                       (skip 2,2)
Step 5: [3 → 3]                     (detect 3,3)
Step 6: null                        (skip 3,3)

Result: [] (empty list)
```

## Key Implementation Details
1. **Dummy Node**: Essential for handling head removal cases
2. **Two-Pointer Technique**: prev maintains result, current explores ahead
3. **Complete Removal**: Unlike standard dedup, remove ALL occurrences of duplicates
4. **Pointer Management**: prev only advances for unique nodes

## Edge Cases Handled
1. **Empty List**: Return null immediately
2. **Single Node**: No duplicates possible, return as-is
3. **All Duplicates**: Result is empty list
4. **No Duplicates**: Return original list unchanged
5. **Head is Duplicate**: Dummy node handles head changes

## Final Result
**Output: [1, 2, 5]**
- Removed all nodes with value 3 (appeared twice)
- Removed all nodes with value 4 (appeared twice)  
- Kept nodes 1, 2, 5 (appeared once each)