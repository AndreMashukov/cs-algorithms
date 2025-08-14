## Answers: Encode/Decode Strings (Length-Prefixing)

Q1: What property of the length-prefixed encoding makes decoding unambiguous even if payload strings contain '#'? 
Correct: 2
Explanation: The length tells the decoder exactly how many characters to consume for the next string, so the payload may contain any character, including '#'.

Q2: Base case handling: how is an empty string element encoded?
Correct: 2
Explanation: The empty string has length 0, so it is represented by the length "0" followed by the delimiter: "0#".

Q3: Calculation: what is the correct encoding of the list ["", "#", "ab"]?
Correct: 3
Explanation: "" → "0#"; "#" → "1##"; "ab" → "2#ab"; concatenated: "0#1##2#ab".

Q4: Calculation: decoding the string "4#time2#go0#3#sun" yields which list?
Correct: 3
Explanation: 4# → "time"; 2# → "go"; 0# → ""; 3# → "sun"; order preserved: ["time", "go", "", "sun"].

Q5: Algorithm design decision: why is a simple join/split using '#' generally inferior to length-prefixing for this problem?
Correct: 2
Explanation: Delimiter collisions with content require escaping/unescaping; length-prefixing avoids ambiguity and special-casing.

Q6: Complexity: for n strings with total length L characters, what are the time and auxiliary space complexities of encode and decode?
Correct: 2
Explanation: Both encode and decode scan the input once and construct outputs of total size L, leading to O(L) time and O(L) auxiliary space.

Q7: Unicode considerations: which statement best describes correctness with respect to Unicode?
Correct: 2
Explanation: JavaScript strings are sequences of UTF-16 code units; both encoding and decoding use the same measure, ensuring round-trip correctness even if grapheme counts differ.

Q8: Robustness: which validation best improves a production-grade decoder?
Correct: 2
Explanation: Verifying that the length is a valid non-negative integer and that sufficient characters remain prevents out-of-bounds reads and malformed inputs from being accepted.


