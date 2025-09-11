# Decode String Algorithm Questions (Stack Character-by-Character)

## Q1: What is the core problem this decode string algorithm solves?
1. Converting encoded strings with nested repetition patterns into their expanded form
2. Validating that bracket pairs are properly matched in mathematical expressions
3. Compressing strings by identifying repeated patterns and encoding them efficiently
4. Parsing mathematical expressions with nested parentheses and operator precedence

## Q2: Why does the algorithm push all non-']' characters directly onto the stack?
1. To validate input format and ensure all characters are properly processed
2. To maintain the original order while deferring processing until closing brackets
3. To optimize memory usage by avoiding temporary string concatenations
4. To enable parallel processing of multiple encoded segments simultaneously

## Q3: When encountering a ']', what is the first step in the decoding process?
1. Calculate the total length needed for the final decoded string segment
2. Pop characters from the stack to build the string that needs repetition
3. Find the matching '[' bracket to determine the scope of repetition
4. Extract the numeric multiplier to determine how many times to repeat

## Q4: In the number extraction loop "while (!isNaN(char))", why is "num = char + num" used instead of "num += char"?
1. To ensure numeric characters are processed in their original left-to-right order
2. To prevent JavaScript type coercion issues when concatenating with numbers
3. To optimize performance by avoiding multiple string allocation operations
4. To handle multi-digit numbers correctly since stack pops in reverse order

## Q5: What happens to the last non-numeric character that gets popped during number extraction?
1. It gets discarded since it's not part of the current decoding operation
2. It gets pushed back onto the stack as it belongs to outer context
3. It gets prepended to the decoded string as a prefix character
4. It gets stored in a temporary variable for later validation purposes

## Q6: How does this implementation handle nested patterns like "2[a3[b]]"?
1. It processes inner patterns first due to the stack's LIFO nature with ']' triggers
2. It maintains separate stacks for each nesting level to avoid interference
3. It uses recursion to handle each nesting level with independent function calls
4. It flattens the nested structure into a linear sequence before processing

## Q7: What is the time complexity of the final "stack.join('')" operation?
1. O(1) since it's a single built-in JavaScript method call
2. O(n) where n is the total length of all characters in the stack
3. O(log n) due to the optimized string concatenation algorithm used
4. O(n²) because each character requires individual memory allocation

## Q8: Why doesn't this algorithm need separate variables for tracking current number and string like other implementations?
1. It uses the stack itself as temporary storage, eliminating need for extra variables
2. It processes the entire input in a single pass without backtracking requirements
3. It leverages JavaScript's dynamic typing to handle mixed data types seamlessly
4. It implements a stateless design pattern that avoids mutable state variables