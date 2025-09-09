/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
  const st = [];
  let num = 0;
  let res = 0;
  let sign = 1;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!isNaN(char) && char !== " ") {
      num = num * 10 + Number(char)
    } else if (char === "+") {
      res += num * sign;
      num = 0;
      sign = 1
    } else if (char === "-") {
      res += num * sign;
      num = 0;
      sign = -1
    } else if (char === "(") {
      st.push(res)
      st.push(sign)
      res = 0;
      sign = 1
    } else if (char === ")") {
      sign = st.pop();
      res = st.pop()
    }
  }
  return res + num * sign
};