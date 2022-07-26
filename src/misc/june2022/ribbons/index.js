const sumUp = (ribbons, value) => {
  let sum = 0;
  ribbons.forEach((r) => {
    sum += Math.floor(r / value);
  });
  // console.log({ sum });
  return sum;
};

const naive = (ribbons, k) => {
  let left = 0;
  let right = Math.max(...ribbons); // 9, k = 6
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2); // 5
    console.log({ left, right, mid, sum: sumUp(ribbons, mid) });
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
// k is number of pieces.
// Solution is largest length r such that we can have k ribbons of length r.
// Assume that the answer is a number that is located insido of the array.
// The solution is a value between left and right. which is a value of mid.
// sumUp (ribbons, value) returns the number of pieces that we can get.
// while (left < right) means that we have not tried all the cases.
// if (sumUp(ribbons, mid) >= k) means that narrow the interval from the right.
// if (sumUp(ribbons, mid) < k) means that narrow the interval from the left.
//  [1, 2, 3, 4, 9]; k = 6; Solution = 2
// { left: 0, right: 9, mid: 5 } { sum: 1 }
// { left: 0, right: 4, mid: 2 } { sum: 8 }
// { left: 2, right: 4, mid: 3 } { sum: 5 }
