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
}

// Example 1
console.log(minEatingSpeed([3, 6, 7, 11], 8)) // 4
// Explaination : Koko can eat 4 bananas per hour.
// The total hours needed to eat all the bananas is 7.
// If she eats 3 bananas per hour, she will need 8 hours to eat all the bananas.
// So, Koko should eat 4 bananas per hour.
