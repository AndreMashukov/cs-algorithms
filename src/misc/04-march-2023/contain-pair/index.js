const solution = (a, m, k) => {
  let num_subarray_with_sum_k = 0
  const cnt_in_subarray = {}
  const idx_subarray = {}
  let last_index = -1

  for (let i = 0; i < m; i++) {
    if (idx_subarray[a[i]]) {
      num_subarray_with_sum_k = 1
      last_index = idx_subarray[a[i]]
    }
    cnt_in_subarray[a[i]] += 1
    idx_subarray[k - a[i]] = i
  }

  // console.log({ idx_subarray })

  for (let i = m; i < a.length; i++) {
    cnt_in_subarray[a[i - m]] -= 1
    if (cnt_in_subarray[a[i - m]] === 0) {
      delete idx_subarray[k - a[i - m]]
    }

    if (idx_subarray[a[i]]) {
      num_subarray_with_sum_k += 1
      last_index = Math.max(idx_subarray[a[i]], last_index)
    } else if (last_index > i - m) {
      num_subarray_with_sum_k += 1
    }

    cnt_in_subarray[a[i]] += 1
    idx_subarray[k - a[i]] = i
  }

  return num_subarray_with_sum_k
}

module.exports.containPair = { solution }

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
