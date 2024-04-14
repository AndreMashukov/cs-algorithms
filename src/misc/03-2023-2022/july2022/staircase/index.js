const CSR = (n, k, way, res) => {
  if (n === 0) {
    res.push(way);
  } else {
    for (let i = 1; i <= k; i++) {
      if (n - i >= 0) {
        CSR(n - i, k, [...way, i], res);
      }
    }
  }
};

const solution = (n, k) => {
  const res = [];
  CSR(n, k, [], res);
  return res;
};
module.exports.staircase = { solution };
