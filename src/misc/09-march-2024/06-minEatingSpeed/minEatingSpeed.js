// Koko loves to eat bananas. There are n piles of bananas,
// the ith pile has piles[i] bananas.
// The guards have gone and will come back in h hours.

// Koko can decide her bananas-per-hour eating speed of k.
//  Each hour, she chooses some pile of bananas and eats k bananas
// from that pile. If the pile has less than k bananas,
// she eats all of them instead and will not eat any more bananas
// during this hour.

// Koko likes to eat slowly but still wants to finish eating
// all the bananas before the guards return.

// Return the minimum integer k such that
// she can eat all the bananas within h hours.

const minEatingSpeed = (piles, h) => {
  let l = 1
  // Find the maximum number of bananas in a pile
  // to set the upper bound of the binary search range
  let r = Math.max(...piles)

  while (l < r) {
    // Calculate the middle index
    const mid = Math.floor((l + r) / 2)
    let hours = 0

    // Calculate the number of hours needed to eat all the bananas
    for (const pile of piles) {
      // If the number of bananas in the pile is not divisible by mid,
      hours += Math.ceil(pile / mid)
    }

    // If the number of hours needed to eat all the bananas is greater than h,
    if (hours > h) l = mid + 1
    else r = mid
  }

  return l
};

// Example 1
console.log(minEatingSpeed([3, 6, 7, 11], 8)) // 4
// Explaination : Koko can eat 4 bananas per hour.
// The total hours needed to eat all the bananas is 7 (WHY?).
// If she eats 3 bananas per hour, she will need 8 hours to eat all the bananas.
// So, Koko should eat 4 bananas per hour.

// why do we return the value of the left pointer at the end?
// This process continues until l and r converge to the same index, which is the index of the smallest element. Since l and r are the same at this point,
//  we could return either nums[l] or nums[r] - they are the same.

// Why we use "ceil" here?
// For example, if pile is 7 and mid is 3, pile / mid is 2.33....
// But Koko can't eat all the bananas in 2.33... hours - she needs 3 full hours.
// So, we use Math.ceil to round up the result to 3.

// If we used while (l <= r), then in the case
// where l and r are equal and hours > h is false,
// we would set r = mid, but since l and r are already equal,
// mid would also be equal to l and r, and r would remain the same.
// This would cause the loop to continue indefinitely.

// When hours <= h, it means that the current eating speed (mid)
// is sufficient to eat all the bananas within h hours.
//  However, we don't know if it's the minimum speed yet,
// so we continue the search in the lower half of the current search range,
// which is from l to mid.
