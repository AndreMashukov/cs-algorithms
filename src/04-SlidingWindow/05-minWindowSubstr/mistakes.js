class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {string}
   */
  minWindow(s, t) {
      if (t === "") {
          return ""
      }

      const countT = new Map();
      const window = new Map();

      for (let i = 0; i < t.length; i++) {
          countT.set(t[i], (countT.get(t[i]) || 0) + 1)
      }

      // console.log(countT)

      let have = 0;
      let need = countT.size;
      let res = "";
      let resLen = Infinity;

      for (let left = 0, right = 0; right < s.length; right++) {
          const char = s[right];
          if (countT.has(char)) {
              window.set(char, (window.get(char) || 0) + 1);

              if (window.get(char) === countT.get(char)) {
                  have++
              }
          }
          while (have === need) {
              if (right - left + 1 < resLen) {
                  res = s.slice(left, right + 1);
                  resLen = right - left
              }

              const deleted = s[left];

              if (countT.has(deleted)) {
                  window.set(deleted, window.get(deleted) - 1)
                  if (countT.get(deleted) > window.get(deleted)) {
                      have--
                  }
              }
              left++
          }
      }



     return res
  }
}