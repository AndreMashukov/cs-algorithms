function solution (numbers) {
  if (numbers.length === 1) {
    return true
  }
  let swapped = 0
  for (let i = 0; i < numbers.length; i++) {
    const perms = Array.from(
      new Set(permutations(numbers[i].toString().split('')))
    ).map((arr) => parseInt(arr.join('')))
    if (i === 0) {
      candidate_nums = perms.filter(
        (shuffled_number) => shuffled_number < numbers[i + 1]
      )
    } else if (i < numbers.length - 1) {
      candidate_nums = perms.filter(
        (shuffled_number) =>
          numbers[i - 1] < shuffled_number && shuffled_number < numbers[i + 1]
      )
    } else {
      candidate_nums = perms.filter(
        (shuffled_number) => shuffled_number > numbers[i - 1]
      )
    }
    if (candidate_nums.length > 0) {
      swapped_num = candidate_nums.pop()
      numbers[i] = swapped_num
      swapped += 1
    }
  }
  if (numbers.slice(1).every((num, i) => num > numbers[i])) {
    return true
  }
  return false
}

function permutations (arr) {
  if (arr.length === 0) {
    return [[]]
  }
  const [first, ...rest] = arr
  const permsWithoutFirst = permutations(rest)
  const allPermutations = []
  for (let i = 0; i < permsWithoutFirst.length; i++) {
    const perm = permsWithoutFirst[i]
    for (let j = 0; j <= perm.length; j++) {
      const permWithFirst = [...perm.slice(0, j), first, ...perm.slice(j)]
      console.log({ permWithFirst })
      allPermutations.push(permWithFirst)
    }
  }
  return allPermutations
}

module.exports = {
  solution
}

// from itertools import permutations, pairwise
// def solution(numbers):
//     if len(numbers) == 1:
//         return True
//     swapped = 0
//     for i in range(len(numbers)):
//         perms = list(int(''.join(shuffled_digits)) for shuffled_digits in permutations(str(numbers[i])))
//         print(perms)
//         if i == 0:
//             candidate_nums = [shuffled_number for shuffled_number in perms if shuffled_number < numbers[i+1]]
//         elif i < len(numbers) - 1:
//             candidate_nums = [shuffled_number for shuffled_number in perms if numbers[i-1] < shuffled_number < numbers[i+1]]
//         else:
//             candidate_nums = [shuffled_number for shuffled_number in perms if shuffled_number > numbers[i-1]]
//         if candidate_nums:
//             print(candidate_nums)
//             swapped_num = candidate_nums.pop()
//             numbers[i] = swapped_num
//             swapped +=1
//     if all(x < y for x, y in pairwise(numbers)):
//         return True
//     return False
