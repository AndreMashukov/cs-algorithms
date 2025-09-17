# Problem: Rotate List (Two Pointers)

## Q1: What is the key insight for optimizing the rotation when k is larger than the list length?
1. We need to traverse the list k times regardless of its length
2. We can use k % length since rotating by the length results in the same list
3. We should create a new list instead of modifying the existing one
4. We need to reverse the list first before rotating

## Q2: In the two-pointer approach, what is the purpose of maintaining k distance between the fast and slow pointers?
1. To find the middle of the list for optimal rotation
2. To ensure the slow pointer ends up at the new tail position when fast reaches the end
3. To count the number of nodes in the list efficiently
4. To detect if there are any cycles in the linked list

## Q3: After finding the new tail and new head, what are the two critical link operations needed to complete the rotation?
1. Set new_tail.next = null and connect old_tail to old_head
2. Set new_head.next = old_head and new_tail.next = null
3. Reverse the entire list and then set the new connections
4. Create a copy of the list and modify the copy

## Q4: Why do we need to handle the case where k % length == 0 specially?
1. It would cause a division by zero error
2. No rotation is needed as the list would return to its original state
3. The algorithm would enter an infinite loop
4. It would create a cycle in the linked list

## Q5: In a list of length n, if we want to rotate right by k positions, which node becomes the new head?
1. The node at position k from the beginning
2. The node at position (n - k) from the beginning
3. The node at position (n - k - 1) from the beginning
4. The last node in the original list

## Q6: What happens if we try to rotate an empty list or a list with only one node?
1. The algorithm throws an error
2. The list remains unchanged as there's nothing meaningful to rotate
3. We create a new single-node list
4. The algorithm runs but produces incorrect results

## Q7: When connecting the old tail to the old head to complete the rotation, why is this step necessary?
1. To maintain the total length of the list
2. To ensure all original nodes remain in the rotated list
3. To prevent memory leaks in the linked list
4. All of the above

## Q8: In the first approach where we find the length first, why do we traverse to find both length and tail simultaneously?
1. To reduce time complexity from O(2n) to O(n) by avoiding two separate traversals
2. To ensure we don't lose the reference to the tail node
3. To validate that the list doesn't contain cycles
4. To count the number of rotations needed

## Q9: What is the time and space complexity of the optimal rotation algorithm?
1. Time: O(n²), Space: O(n)
2. Time: O(n), Space: O(1) 
3. Time: O(k), Space: O(1)
4. Time: O(n log n), Space: O(1)

## Q10: If we have a list [1,2,3,4,5] and k=7, how many actual rotations do we perform?
1. 7 rotations
2. 2 rotations (since 7 % 5 = 2)  
3. 5 rotations
4. 0 rotations since k > length