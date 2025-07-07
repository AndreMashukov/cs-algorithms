const powerOf2 = (n) => {
  return n && (n & (n - 1)) === 0;
};

const naive = (array) => {
  const len = array.length;
  let ans = 0;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (powerOf2(array[i] + array[j]) && i <= j) {
        ans += 1;
      }
    }
  }

  return ans;
};

module.exports.sumToPower = { naive };

// Given an array of distinct integers a,
// your task is to find the number
// of pairs of indices (i, j) such that i ≤ j
// and the sum a[i] + a[j] is equal to some power of two.
