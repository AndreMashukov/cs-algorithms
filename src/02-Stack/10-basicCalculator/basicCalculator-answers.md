# Basic Calculator (Stack) - Answers

## Answers

**Q1: What is the primary purpose of the `sign` variable in the basic calculator algorithm?**
**Answer: 1**
The `sign` variable tracks whether the current operation is addition (+1) or subtraction (-1), allowing the algorithm to handle both operations with the same logic by multiplying numbers by the sign before adding to the result.

**Q2: When encountering an opening parenthesis '(', what two values are pushed onto the stack?**
**Answer: 1**
The algorithm pushes the current `result` and current `sign` onto the stack, then resets both to handle the new sub-expression within the parentheses independently.

**Q3: How does the algorithm handle nested parentheses like "(1+(2+3))"?**
**Answer: 3**
It uses the same stack, pushing the previous state (result and sign) when entering each set of parentheses, creating a LIFO structure that naturally handles nesting by preserving context at each level.

**Q4: What happens when the algorithm encounters a closing parenthesis ')'?**
**Answer: 1**
It pops two values from the stack: first the sign that was before the opening parenthesis, then the result that was accumulated before entering the parentheses, applying them to the current sub-expression result.

**Q5: How does the algorithm handle consecutive operators like "1 + -2"?**
**Answer: 1**
It treats consecutive operators by updating the sign variable, allowing negative numbers to be handled naturally through sign multiplication rather than treating them as syntax errors.

**Q6: What is the time complexity of this basic calculator algorithm?**
**Answer: 2**
O(n) where n is the length of the input string, as each character is processed exactly once and stack operations are constant time per character.

**Q7: How does the algorithm handle whitespace characters in the input?**
**Answer: 3**
It skips whitespace characters during processing by checking if a character is not a digit and not a space before processing it as an operator or parenthesis.

**Q8: What would be the result of evaluating the expression "2-(5+3)" using this algorithm?**
**Answer: 1**
-6. The algorithm calculates 5+3=8 inside parentheses, then applies the subtraction: 2-8=-6, correctly handling the parentheses and negative result.