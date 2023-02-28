const checkIfStrictIncr = (list) => {
  let result = list[0]
  for (let i = 1; i < list.length; i++) {
    if (list[i] > result) {
      result = list[i]
    } else {
      return false
    }
  }
  return true
}

const swap = (number, target) => {
  // number = 900, target = 10
  const array = `${number}`
    .split('')
    .map((n) => parseInt(n, 10))
    .sort((a, b) => {
      if (a > b) {
        return 1
      }
      if (a < b) {
        return -1
      }
      if (a === b) {
        return 0
      }
    })
  // array = [0, 0, 9]
  if (array.length === 1) {
    return [number]
  } else {
    const reversed = array
      .map((item) => `${item}`)
      .reverse()
      .map((item) => parseInt(item, 10))
    // reversed = [9, 0, 0]
    const max = parseInt(reversed.join(''), 10) // 900
    const min = parseInt(array.join(''), 10) // 9
    // console.log({ array, max, min, reversed })
    // only values that less than target which is next element
    return [min, max].filter((item) => item < target)
  }
}

const naive = (numbers) => {
  if (checkIfStrictIncr(numbers)) {
    return true
  } else {
    for (let i = 0; i < numbers.length; i++) {
      const copy = [...numbers]
      // only for 2 digit and higher numbers
      if (copy[i] > 9) {
        // check if next current number has permutations
        // which are less then its next number
        const perms = swap(copy[i], numbers[i + 1])
        console.log({ perms })
        for (const p of perms) {
          copy[i] = p
          console.log(copy)
          if (checkIfStrictIncr(copy)) {
            return true
          }
        }
      }
    }
    return false
  }
}
module.exports.makeIncrease = { naive }
