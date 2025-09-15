/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, logs) {
  const res = Array(n).fill(0);
  const st = [];
  let prev = 0;

  for (let log of logs) {
    const [index, type, time] = log.split(":");
    const fnIndex = parseInt(index);
    const fnTime = parseInt(time);

    if (type === "start") {
      if (st.length) {
        res[st[st.length - 1]] = fnTime - prev;
      }

      st.push(fnIndex)
      prev = fnTime
    } else {
      res[st.pop()] = fnTime - prev + 1
      prev = fnTime + 1
    }
  }

  return res
};