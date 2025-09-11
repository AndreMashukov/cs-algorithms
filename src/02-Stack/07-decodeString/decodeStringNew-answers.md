# Decode String Algorithm Answers

## Q1: What is the core problem this decode string algorithm solves?
**Answer: 1**
The algorithm converts encoded strings with nested repetition patterns (like "3[a2[c]]") into their fully expanded decoded form ("accaccacc").

## Q2: Why does the algorithm push all non-']' characters directly onto the stack?
**Answer: 2**
By deferring processing until closing brackets are encountered, the algorithm maintains character order while building up context for decoding operations.

## Q3: When encountering a ']', what is the first step in the decoding process?
**Answer: 2**
The algorithm immediately starts popping characters to build the string that needs to be repeated, working backwards until it finds the opening bracket.

## Q4: In the number extraction loop "while (!isNaN(char))", why is "num = char + num" used instead of "num += char"?
**Answer: 4**
Since the stack pops digits in reverse order (rightmost first), prepending each digit reconstructs the original multi-digit number correctly.

## Q5: What happens to the last non-numeric character that gets popped during number extraction?
**Answer: 2**
The non-numeric character is pushed back onto the stack because it belongs to the outer context and shouldn't be consumed by the current decoding operation.

## Q6: How does this implementation handle nested patterns like "2[a3[b]]"?
**Answer: 1**
The stack's LIFO nature ensures inner patterns (triggered by their ']' brackets) are processed and resolved before outer patterns need them.

## Q7: What is the time complexity of the final "stack.join('')" operation?
**Answer: 2**
The join operation must process each character in the stack once to create the final string, resulting in O(n) time complexity.

## Q8: Why doesn't this algorithm need separate variables for tracking current number and string like other implementations?
**Answer: 1**
The stack serves as both storage and workspace, holding characters until needed and eliminating the need for additional state variables.