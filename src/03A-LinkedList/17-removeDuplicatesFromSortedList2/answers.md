# Problem: Remove Duplicates from Sorted List II (Two Pointers)

## Q1: Why is a dummy node essential for this problem compared to removing duplicates while keeping one copy?
**Answer: 2**
It handles the edge case where the head node itself needs to be removed due to duplicates. When the first nodes in the list are duplicates, we need to remove them all, potentially changing the head. The dummy node provides a stable starting point before the actual head.

## Q2: What is the key difference between the prev and current pointers in this algorithm?
**Answer: 2**
prev points to the last confirmed unique node, current explores ahead for duplicates. The prev pointer maintains our position in the final result list, while current scouts ahead to detect and skip over duplicate sequences.

## Q3: When we detect duplicates (current.val === current.next.val), what must we do differently than in the "keep one duplicate" version?
**Answer: 2**
Remove all occurrences of the duplicate value, including the first one. Unlike the standard remove duplicates problem where we keep one copy, this problem requires removing every node that has any duplicates, leaving only truly unique values.

## Q4: In the inner while loop that skips duplicates, what is the termination condition?
**Answer: 1**
current becomes null OR current.val is different from duplicateValue. We continue skipping until we either reach the end of the list or find a node with a different value than the duplicates we're removing.

## Q5: Why do we not advance the prev pointer when duplicates are found?
**Answer: 1**
To maintain the connection to the last known unique node. The prev pointer needs to stay at the last unique node so it can connect directly to the next unique node, effectively skipping over all the duplicates.

## Q6: What happens to prev.next after we skip all duplicate nodes?
**Answer: 2**
It points to the first non-duplicate node after the duplicate sequence. By setting prev.next = current after skipping duplicates, we connect the last unique node to the next unique node, removing all duplicates from the linked list.

## Q7: How does the algorithm handle the case where all nodes in the list have duplicates?
**Answer: 2**
It returns null (empty list) since no unique nodes remain. When every value in the list appears more than once, all nodes get removed, and dummy.next becomes null, representing an empty result list.

## Q8: In the condition "current.next && current.val === current.next.val", why do we check current.next first?
**Answer: 2**
To avoid null pointer exceptions when accessing current.next.val. The && operator uses short-circuit evaluation, so if current.next is null, the second condition won't be evaluated, preventing errors.

## Q9: What is the purpose of checking "if (!head || !head.next)" at the beginning?
**Answer: 4**
Both options 1 and 3: to handle lists that are too small to contain duplicates and optimize performance for common edge cases. Lists with 0 or 1 nodes cannot have duplicates, so we can return immediately without processing.

## Q10: If we have the list [1,1,2,2,3,3], what will be the final result?
**Answer: 2**
[] (empty list since all values have duplicates). Since every value (1, 2, and 3) appears exactly twice, all nodes are considered duplicates and must be removed, resulting in an empty list.