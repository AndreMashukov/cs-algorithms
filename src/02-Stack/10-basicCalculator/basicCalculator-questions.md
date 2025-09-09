# Basic Calculator (Stack)

## Questions

**Q1: What is the primary purpose of the `sign` variable in the basic calculator algorithm?**
1. To track whether the current operation is addition or subtraction
2. To store the result of the current sub-expression
3. To determine if the next character is a digit
4. To count the number of parentheses in the expression

**Q2: When encountering an opening parenthesis '(', what two values are pushed onto the stack?**
1. Current result and current sign
2. Current number and current result
3. Current sign and current number
4. Current index and current character

**Q3: How does the algorithm handle nested parentheses like "(1+(2+3))"?**
1. It uses recursion to evaluate inner expressions first
2. It maintains separate stacks for each nesting level
3. It uses the same stack, pushing previous state when entering parentheses
4. It converts the expression to postfix notation first

**Q4: What happens when the algorithm encounters a closing parenthesis ')'?**
1. It pops two values from the stack: sign and previous result
2. It pops one value from the stack: the previous result
3. It clears the stack completely
4. It pushes the current result onto the stack

**Q5: How does the algorithm handle consecutive operators like "1 + -2"?**
1. It treats the second operator as part of the number's sign
2. It throws an error for invalid syntax
3. It ignores consecutive operators
4. It uses the last operator encountered

**Q6: What is the time complexity of this basic calculator algorithm?**
1. O(n log n) due to stack operations
2. O(n) where n is the length of the input string
3. O(n²) because of nested parentheses
4. O(1) per character processed

**Q7: How does the algorithm handle whitespace characters in the input?**
1. It converts them to zero values
2. It treats them as separators between numbers
3. It skips them during processing
4. It includes them in number parsing

**Q8: What would be the result of evaluating the expression "2-(5+3)" using this algorithm?**
1. -6
2. 0
3. 4
4. 10