## Problem: Encode/Decode Strings (Length-Prefixing) (Arrays)

Q1: What property of the length-prefixed encoding makes decoding unambiguous even if payload strings contain '#'? 
1. The delimiter '#' never appears inside payload strings.
2. The length prefix specifies exactly how many characters to read for the next payload.
3. The decoder guesses boundaries using frequency analysis of characters.
4. The entire encoded string is base64-encoded to escape '#'.

Q2: Base case handling: how is an empty string element encoded?
1. "#"
2. "0#"
3. "1#"
4. ""

Q3: Calculation: what is the correct encoding of the list ["", "#", "ab"]?
1. "#1##2#ab"
2. "0#1#2#ab"
3. "0#1##2#ab"
4. "0#2##ab"

Q4: Calculation: decoding the string "4#time2#go0#3#sun" yields which list?
1. ["time", "go", "sun"]
2. ["time", "", "go", "sun"]
3. ["time", "go", "", "sun"]
4. ["time", "go", "0", "sun"]

Q5: Algorithm design decision: why is a simple join/split using '#' generally inferior to length-prefixing for this problem?
1. split is asymptotically slower, typically O(n^2) in JavaScript.
2. Delimiter collisions with content require escaping/unescaping, which complicates logic and can be error-prone; length-prefixing avoids ambiguity.
3. Length-prefixing uses less memory than split in JavaScript engines.
4. split does not work on Unicode strings.

Q6: Complexity: for n strings with total length L characters, what are the time and auxiliary space complexities of encode and decode?
1. Encode O(L log L), Decode O(L), Space O(1) for both
2. Encode O(L), Decode O(L), Space O(L) for both
3. Encode O(n), Decode O(n), Space O(1) for both
4. Encode O(L^2), Decode O(L^2), Space O(L)

Q7: Unicode considerations: which statement best describes correctness with respect to Unicode?
1. The method is not safe for Unicode because '#' is ASCII-only.
2. It round-trips correctly because both sides count UTF-16 code units consistently; visual grapheme count may differ but encoding/decoding remain symmetric.
3. It only works for ASCII strings and fails for non-ASCII characters.
4. It requires converting to UTF-8 bytes first to be correct.

Q8: Robustness: which validation best improves a production-grade decoder?
1. Trust the input and skip all checks to maximize speed.
2. Validate that the length field is a non-negative integer and that at least that many code units remain; otherwise raise an error.
3. Replace invalid length values with 0 and continue decoding.
4. Silently trim the encoded string to the nearest valid boundary and continue.


