# src/01-Arrays/06-encodeDecode/encodeDecode.diagrams.md

### 1) Encoding flow (length-prefix + delimiter '#')

Input: ["hello", "world"]

Algorithm:
- For each string `s`, append: length(s) + '#' + s
- Concatenate all parts into one string

Diagram:

"" (start)
  |
  |  s = "hello" (len = 5)
  v
"5#hello"
  |
  |  s = "world" (len = 5)
  v
"5#hello5#world" (final)

General form:

result = "" 
       + len(s1) + "#" + s1
       + len(s2) + "#" + s2
       + ...
       + len(sk) + "#" + sk


### 2) Decoding walkthrough (two pointers i/j)

Encoded: "5#hello5#world"

Indexes:  0 1 2 3 4 5 6 7 8 9 10 11 12 13
Chars:    5 # h e l l o 5 # w  o  r  l  d

Step A:
i=0
           j scans to '#'
           v
         0 1
         5 #
len = parseInt(str[i:j]) = parseInt("5") = 5
i = j + 1 = 2
j = i + len = 2 + 5 = 7
substring(i..j) = str[2:7] = "hello"
push -> ["hello"]
i = j = 7

Step B:
i=7
                   j scans to '#'
                   v
                 7 8
                 5 #
len = parseInt(str[7:8]) = parseInt("5") = 5
i = 8 + 1 = 9
j = 9 + 5 = 14
substring(9..14) = "world"
push -> ["hello","world"]
i = 14 (done)


### 3) Why '#' is safe + edge cases

A) Strings containing '#':
Input: ["a#b", "c"]
Encode:
- "a#b" -> len=3 -> "3#a#b"
- "c"   -> len=1 -> "1#c"
Combined -> "3#a#b1#c"

Decode:
- i=0, j→'#' at 1, len=parseInt("3")=3
  take 3 chars from i=2: "a#b"
- i=5, j→'#' at 6, len=parseInt("1")=1
  take 1 char from i=7: "c"
Result -> ["a#b","c"]

Because we slice by exact length after the '#', any '#' inside the payload is treated as data, not a delimiter.

B) Empty strings:
Input: ["", "abc", ""]
Encode:
- ""   -> "0#"
- "abc"-> "3#abc"
- ""   -> "0#"
Combined -> "0#3#abc0#"

Decode:
- len=0 -> take 0 chars -> ""
- len=3 -> take "abc"
- len=0 -> take 0 chars -> ""
Result -> ["", "abc", ""]