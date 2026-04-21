# Problem: Find the Duplicate Number (Two Pointers)

## Q1: What is the key insight that allows us to model the "Find the Duplicate Number" problem as a cycle detection problem?
1. The array is sorted and we can use binary search
2. We can treat array values as indices, creating an implicit linked list structure
3. The duplicate number appears exactly twice in the array
4. We need to count occurrences of each number

## Q2: In Floyd's Cycle Detection Algorithm, why does the fast pointer move two steps while the slow pointer moves one step?
1. To ensure the algorithm runs in O(log n) time complexity
2. To guarantee that if there's a cycle, the fast pointer will eventually catch up to the slow pointer
3. To minimize space complexity by avoiding extra data structures
4. To handle edge cases where the array has only two elements

## Q3: After the first phase of Floyd's algorithm finds the intersection point, why do we reset the slow pointer to the beginning?
1. To count how many elements are in the cycle
2. To find the entrance to the cycle, which represents the duplicate number
3. To verify that a cycle actually exists in the array
4. To optimize the algorithm's time complexity

## Q4: In the array [1,3,4,2,2], how does the implicit linked list structure look?
1. 0→1→3→2→4→2 (cycle: 2→4→2)
2. 0→1→3→2→2 (no cycle)
3. 1→3→2→4→2 (cycle: 2→4→2) 
4. Array indices don't form a linked list structure

## Q5: What happens during the second phase when both pointers move at the same speed?
1. They will never meet because they start at different positions
2. They meet at the entrance to the cycle, which is the duplicate number
3. The fast pointer will always be ahead of the slow pointer
4. They will traverse the entire array before meeting

## Q6: Why is it guaranteed that there will always be a cycle in this problem?
1. Because the array is sorted in ascending order
2. Because we have n+1 numbers in range [1,n], so by pigeonhole principle, one number must repeat
3. Because all numbers are positive integers
4. Because the array length is always odd

## Q7: In the constraint that values are in range [1,n] for an array of length n+1, what role does the index 0 play?
1. It represents the duplicate number we're looking for
2. It serves as the starting point for our traversal, never pointed to by any value
3. It contains the largest number in the array
4. It's always ignored in the algorithm

## Q8: What would happen if we had two different duplicate numbers in the array?
1. The algorithm would still work and find one of them
2. The algorithm would find the smaller duplicate number
3. This violates the problem constraints - there's exactly one duplicate
4. The algorithm would enter an infinite loop

## Q9: How does the space complexity remain O(1) in this approach?
1. We use only a constant number of pointer variables (slow, fast)
2. We don't modify the input array
3. We don't use any additional data structures like hash maps or arrays
4. All of the above

## Q10: Why can't we solve this problem by sorting the array first?
1. Sorting would change the array structure and break the implicit linked list
2. Sorting takes O(n log n) time which is worse than O(n)
3. The problem specifically states we cannot modify the array
4. All of the above