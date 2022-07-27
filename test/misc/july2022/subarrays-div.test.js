const { subarraysDiv } = require('../../../src/misc/july2022/subarrays-div');

describe('misc.july2022.subarrays-div', () => {
  it('should return 7', () => {
    const result = subarraysDiv.solution([4, 5, 0, -2, -3, 1], 5);
    expect(result).toEqual(7);
  });
});

// https://www.geeksforgeeks.org/count-sub-arrays-sum-divisible-k/
// Given an integer array nums and an integer k, return the number of non-empty
// subarrays that have a sum divisible by k.

// A subarray is a contiguous part of an array.

// Input: nums = [4,5,0,-2,-3,1], k = 5
// Output: 7
// Explanation: There are 7 subarrays with a sum divisible by k = 5:
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
