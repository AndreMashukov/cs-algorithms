# LeetCode 127 - Word Ladder
# https://leetcode.com/problems/word-ladder/description/
# https://www.youtube.com/watch?v=h9iTnkgv05E&t=528s
# You are given two words, beginWord and endWord, and also a list of words wordList.
# All of the given words are of the same length, consisting of lowercase English letters,
# and are all distinct.
#
# Your goal is to transform beginWord into endWord by following the rules:
#
# You may transform beginWord to any word within wordList, provided that at exactly one position the words have a different character, and the rest of the positions have the same characters.
# You may repeat the previous step with the new word that you obtain, and you may do this as many times as needed.
# Return the minimum number of words within the transformation sequence needed to obtain the endWord, or 0 if no such sequence exists.
#
# Example 1:
#
# Input: beginWord = "cat", endWord = "sag",
# wordList = ["bat","bag","sag","dag","dot"]
#
# Output: 4
# Explanation: One possible transformation sequence is
# "cat" -> "bat" -> "bag" -> "dag" -> "dot" -> "sag"

from collections import deque
from typing import List, Set


class Solution:
    def ladderLength(self, begin: str, end: str, wordList: List[str]) -> int:
        words: Set[str] = set(wordList)

        if end not in words or begin == end:
            return 0

        res = 0
        q = deque([begin])

        while q:
            res += 1
            level_size = len(q)

            for _ in range(level_size):
                node = q.popleft()

                if node == end:
                    return res

                for j in range(len(node)):
                    for c in range(97, 123):
                        ch = chr(c)
                        if ch == node[j]:
                            continue

                        nei = node[:j] + ch + node[j + 1:]

                        if nei in words:
                            q.append(nei)
                            words.remove(nei)

        return 0


if __name__ == "__main__":
    print(
        Solution().ladderLength(
            "hit",
            "cog",
            ["hot", "dot", "dog", "lot", "log", "cog"],
        )
    )  # 5
