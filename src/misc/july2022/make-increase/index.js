const checkIfStrictIncr = (list) => {
  let result = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] > result) {
      result = list[i];
    } else {
      return false;
    }
  }
  return true;
};

const swap = (number, target) => {
  const array = `${number}`
    .split('')
    .map((n) => parseInt(n, 10))
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      if (a === b) {
        return 0;
      }
    });
  if (array.length === 1) {
    return [number];
  } else {
    const reversed = array
      .map((item) => `${item}`)
      .reverse()
      .map((item) => parseInt(item, 10));
    const max = parseInt(reversed.join(''), 10);
    const min = parseInt(array.join(''), 10);
    // console.log({ array, max, min, reversed });
    return [min, max].filter((item) => item < target);
  }
};

const naive = (numbers) => {
  if (checkIfStrictIncr(numbers)) {
    return true;
  } else {
    for (let i = 0; i < numbers.length; i++) {
      const copy = [...numbers];
      if (copy[i] > 9) {
        const perms = swap(copy[i], numbers[i + 1]);

        for (const p of perms) {
          copy[i] = p;
          // console.log(copy);
          if (checkIfStrictIncr(copy)) {
            return true;
          }
        }
      }
    }
    return false;
  }
};
module.exports.makeIncrease = { naive };
