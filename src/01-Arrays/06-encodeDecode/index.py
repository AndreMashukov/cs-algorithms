# 271. Encode and Decode Strings
# https://www.lintcode.com/problem/659/
# Design an algorithm to encode a list of strings to a single string.
# The encoded string is then decoded back
# to the original list of strings.

from typing import List


class Solution:
    def encode(self, strs: List[str]) -> str:
        result = []
        for s in strs:
            result.append(f"{len(s)}#{s}")
        return "".join(result)

    def decode(self, s: str) -> List[str]:
        result: List[str] = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != "#":
                j += 1
            length = int(s[i:j])
            i = j + 1
            j = i + length
            result.append(s[i:j])
            i = j
        return result


if __name__ == "__main__":
    encoded = Solution().encode(["hello", "world"])
    print(encoded)  # 5#hello5#world
    print(Solution().decode(encoded))  # ['hello', 'world']
