const solution = (nums, k) => {
  let partialSum = 0;
  let answer = 0;
  const dict = { 0: 1 };

  console.log({ nums, k });
  for (const num of nums) {
    partialSum += num;
    const key = partialSum % k;
    if (dict[key]) {
      answer += dict[key];
      dict[key] += 1;
    } else {
      dict[key] = 1;
    }
    console.log({ partialSum, key, dict, answer });
  }
  return answer;
};

module.exports.subarraysDiv = { solution };

//  Sub-array by each pair of positions with same value of
//  ( cumSum % k) constitute a continuous range whose sum is divisible by K.

// 2 mod 5 = 2
// 3 mod 5 = 3
// 4 mod 5 = 4
// 5 mod 5 = 0
// 6 mod 5 = 1

// Input: nums = [4,5,0,-2,-3,1], k = 5
// { partialSum: 4, dict: { '0': 1, '4': 1 } }
// { partialSum: 9, dict: { '0': 1, '4': 2 } }
// { partialSum: 9, dict: { '0': 1, '4': 3 } }
// { partialSum: 7, dict: { '0': 1, '2': 1, '4': 3 } }
// { partialSum: 4, dict: { '0': 1, '2': 1, '4': 4 } }
// { partialSum: 5, dict: { '0': 2, '2': 1, '4': 4 } }
