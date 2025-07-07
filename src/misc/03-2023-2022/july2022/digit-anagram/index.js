/* eslint-disable require-jsdoc */
function factorial(number) {
  let value = number;
  for (let i = number; i > 1; i--) {
    value *= i - 1;
  }
  return value;
}
function combination(n, r) {
  if (n === r) {
    return 1;
  }
  return factorial(n) / (factorial(r) * factorial(n - r));
}

const getSortedDigit = (digit) => {
  const sortedStr = `${digit}`
    .split('')
    .sort((ch1, ch2) => {
      const d1 = parseInt(ch1, 10);
      const d2 = parseInt(ch2, 10);
      if (d1 > d2) {
        return 1;
      }
      if (d1 < d2) {
        return -1;
      }
      if (d1 === d2) {
        return 0;
      }
    })
    .join('');
  // console.log({ sortedStr });
  return parseInt(sortedStr, 10);
};

const solution = (numbers) => {
  const mapped = numbers.map((digit) => getSortedDigit(digit));
  const reduced = mapped.reduce((acc, val) => {
    if (!acc[val]) {
      acc[val] = 1;
    } else {
      acc[val] += 1;
    }

    return acc;
  }, {});
  const numOfPairs = Object.values(reduced)
    .map((v) => {
      if (v === 1) {
        return 0;
      }
      return combination(v, 2);
    })
    .reduce((a, b) => a + b, 0);
  // console.log({ mapped, numOfPairs });

  return numOfPairs;
};
module.exports.digitAnagram = { solution };
