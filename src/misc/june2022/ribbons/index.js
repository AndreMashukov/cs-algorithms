const doCount = (array, i) => {
  let sum = 0;
  array.forEach((a) => {
    sum += Math.trunc(a / i);
  });
  console.log({ i, sum });
  return sum;
};

const sumUp = (ribbons, value) => {
  let sum = 0;
  ribbons.forEach((r) => {
    sum += Math.floor(r / value);
  });
  console.log({ sum });
  return sum;
};

const naive = (ribbons, k) => {
  let left = 0;
  let right = Math.max(...ribbons);
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    console.log({ left, right, mid });
    if (sumUp(ribbons, mid) >= k) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left || -1;
};

module.exports.ribbons = { naive };
// https://www.tutorialspoint.com/program-to-find-maximum-length-of-k-ribbons-of-same-length-in-python
// The solution is a value between left and right
//  [1, 2, 3, 4, 9]; k = 6; Solution = 2
// { left: 0, right: 9, mid: 5 } { sum: 1 }
// { left: 0, right: 4, mid: 2 } { sum: 8 }
// { left: 2, right: 4, mid: 3 } { sum: 5 }
