// a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7]
// m = 4
// k = 10

// slidingWindow: defaultdict(<class 'int'>, {8: 0, 6: 1, 3: 2, 5: 3})
// countValues: defaultdict(<class 'int'>, {2: 1, 4: 1, 7: 1, 5: 1})

const solution = (a, m, k) => {
  let numberOfSubarrays = 0
  // track repeated values in each subarray
  const countValues = {}
  // The sliding window hashmap will be in the form {element: last_found_index}
  const slidingWindow = {}
  let lastIndex = -1

  for (let i = 0; i < m; i++) {
    if (slidingWindow[a[i]]) {
      // if a pair is found in the first subarray.
      // Complement is found.
      numberOfSubarrays = 1
      lastIndex = slidingWindow[a[i]]
    }
    if (!countValues[a[i]]) {
      countValues[a[i]] = 0
    }
    countValues[a[i]] += 1
    slidingWindow[k - a[i]] = i
  }

  // console.log({ numberOfSubarrays })
  // console.log({ idx_subarray })
  // console.log({ cnt_in_subarray })

  for (let i = m; i < a.length; i++) {
    // console.log({ caim: cnt_in_subarray[a[i - m]], cnt_in_subarray })
    // decrement count of first element of sliding window. Moving the window to the left.
    countValues[a[i - m]] -= 1
    if (countValues[a[i - m]] === 0) {
      // if it's count is 0 then remove its compliment
      delete slidingWindow[k - a[i - m]]
    }

    // Check if the last found index's complement exists in the hashmap
    // if current element is a complement found in the sliding window
    // idx_subarray[a[i] - index of the complement
    if (slidingWindow[a[i]]) {
      numberOfSubarrays += 1
      // make sure last_index is close to the end of the window
      lastIndex = Math.max(slidingWindow[a[i]], lastIndex)
      // print 'compliment found 1' a[i], last_index
    } else if (lastIndex > i - m) {
      // ???
      numberOfSubarrays += 1
      // console.log('complement found 2: ', a[i], lastIndex, i - m)
    }
    if (!countValues[a[i]]) {
      countValues[a[i]] = 0
    }
    countValues[a[i]] += 1
    slidingWindow[k - a[i]] = i
  }

  return numberOfSubarrays
}

module.exports.containPair = { solution }

// slidingWindow[a[i]] - index of the complement

// def add_to_k(a: List[int], m: int, k: int):
//     num_subarray_with_sum_k = 0
//     cnt_in_subarray = defaultdict(int)
//     idx_subarray = defaultdict(int)
//     last_index = -1

//     for i in range(m):
//         if a[i] in idx_subarray:
//             num_subarray_with_sum_k = 1
//             last_index = idx_subarray[a[i]]
//         cnt_in_subarray[a[i]] += 1
//         idx_subarray[k-a[i]] = i

//     for i in range(m, len(a)):
//         cnt_in_subarray[a[i-m]] -= 1
//         if cnt_in_subarray[a[i-m]] == 0:
//             del idx_subarray[k-a[i-m]]

//         if a[i] in idx_subarray:
//             num_subarray_with_sum_k += 1
//             last_index = max(idx_subarray[a[i]], last_index)
//         elif last_index > i-m:
//             num_subarray_with_sum_k += 1

//         cnt_in_subarray[a[i]] += 1
//         idx_subarray[k-a[i]] = i

//     return num_subarray_with_sum_k

// def solution(a,m,k):
//     return add_to_k(a, m, k)
