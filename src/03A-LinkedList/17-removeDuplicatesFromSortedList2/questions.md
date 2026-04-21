# Problem: Remove Duplicates from Sorted List II (Two Pointers)

## Q1: Why is a dummy node essential for this problem compared to removing duplicates while keeping one copy?
1. It simplifies the algorithm's time complexity from O(n²) to O(n)
2. It handles the edge case where the head node itself needs to be removed due to duplicates
3. It prevents memory leaks when removing nodes
4. It ensures the linked list remains sorted after removal

## Q2: What is the key difference between the prev and current pointers in this algorithm?
1. prev points to duplicates, current points to unique values
2. prev points to the last confirmed unique node, current explores ahead for duplicates
3. prev traverses backwards, current traverses forwards
4. prev counts nodes, current removes nodes

## Q3: When we detect duplicates (current.val === current.next.val), what must we do differently than in the "keep one duplicate" version?
1. Remove only the second occurrence of the duplicate
2. Remove all occurrences of the duplicate value, including the first one
3. Keep the first occurrence and remove subsequent duplicates  
4. Mark the duplicates for later removal

## Q4: In the inner while loop that skips duplicates, what is the termination condition?
1. current becomes null OR current.val is different from duplicateValue
2. We've skipped exactly 2 nodes (the duplicate pair)
3. current.next becomes null
4. We reach the end of the linked list

## Q5: Why do we not advance the prev pointer when duplicates are found?
1. To maintain the connection to the last known unique node
2. To avoid skipping over important nodes
3. To keep track of the number of duplicates removed
4. To ensure proper memory deallocation

## Q6: What happens to prev.next after we skip all duplicate nodes?
1. It points to the first duplicate node that was found
2. It points to the first non-duplicate node after the duplicate sequence
3. It becomes null to terminate the list
4. It points back to the previous unique node

## Q7: How does the algorithm handle the case where all nodes in the list have duplicates?
1. It returns the original head unchanged
2. It returns null (empty list) since no unique nodes remain
3. It returns a list with one copy of each duplicate value
4. It throws an error due to invalid input

## Q8: In the condition "current.next && current.val === current.next.val", why do we check current.next first?
1. To optimize performance by reducing comparisons
2. To avoid null pointer exceptions when accessing current.next.val
3. To ensure we process nodes in the correct order
4. To maintain the sorted property of the list

## Q9: What is the purpose of checking "if (!head || !head.next)" at the beginning?
1. To handle lists that are too small to contain duplicates
2. To validate that the input is a valid linked list
3. To optimize performance for common edge cases
4. Both options 1 and 3

## Q10: If we have the list [1,1,2,2,3,3], what will be the final result?
1. [1,2,3] (keeping one copy of each)
2. [] (empty list since all values have duplicates)
3. [1,1,2,2,3,3] (no changes since all are duplicates)
4. null (invalid result)