# Problem: Find the Duplicate Number (Two Pointers)

## Q1: What is the key insight that allows us to model the "Find the Duplicate Number" problem as a cycle detection problem?
**Answer: 2**
We can treat array values as indices, creating an implicit linked list structure. Since each value points to an index position, and we have a duplicate number, this creates a cycle in the implicit linked list where multiple paths lead to the same node.

## Q2: In Floyd's Cycle Detection Algorithm, why does the fast pointer move two steps while the slow pointer moves one step?
**Answer: 2**
To guarantee that if there's a cycle, the fast pointer will eventually catch up to the slow pointer. The relative speed difference ensures that the fast pointer gains one position per iteration, guaranteeing they'll meet within the cycle.

## Q3: After the first phase of Floyd's algorithm finds the intersection point, why do we reset the slow pointer to the beginning?
**Answer: 2**
To find the entrance to the cycle, which represents the duplicate number. The mathematical property of Floyd's algorithm guarantees that when one pointer starts from the beginning and another from the intersection point, they'll meet exactly at the cycle entrance.

## Q4: In the array [1,3,4,2,2], how does the implicit linked list structure look?
**Answer: 1**
0→1→3→2→4→2 (cycle: 2→4→2). Starting from index 0 with value 1, we go to index 1 with value 3, then index 3 with value 2, then index 2 with value 4, then index 4 with value 2, creating the cycle back to index 2.

## Q5: What happens during the second phase when both pointers move at the same speed?
**Answer: 2**
They meet at the entrance to the cycle, which is the duplicate number. This is a mathematical property of Floyd's algorithm - the distance from start to cycle entrance equals the distance from intersection point to cycle entrance.

## Q6: Why is it guaranteed that there will always be a cycle in this problem?
**Answer: 2**
Because we have n+1 numbers in range [1,n], so by pigeonhole principle, one number must repeat. Since that number appears as a value twice, multiple indices will point to the same target index, creating a cycle in the implicit linked list.

## Q7: In the constraint that values are in range [1,n] for an array of length n+1, what role does the index 0 play?
**Answer: 2**
It serves as the starting point for our traversal, never pointed to by any value. Since values are in range [1,n] and index 0 is outside this range, no value in the array can point back to index 0, making it a perfect starting point.

## Q8: What would happen if we had two different duplicate numbers in the array?
**Answer: 3**
This violates the problem constraints - there's exactly one duplicate. The problem guarantees exactly one number appears twice while all others appear once, which creates exactly one cycle in the implicit linked list structure.

## Q9: How does the space complexity remain O(1) in this approach?
**Answer: 4**
All of the above: we use only constant pointer variables, don't modify the input array, and don't use additional data structures. The algorithm operates purely through pointer manipulation without allocating any additional memory proportional to input size.

## Q10: Why can't we solve this problem by sorting the array first?
**Answer: 4**
All of the above: sorting would break the implicit linked list structure needed for cycle detection, takes O(n log n) time instead of optimal O(n), and violates the constraint that we cannot modify the array. The problem specifically requires a constant space solution without array modification.