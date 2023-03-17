const solution = (a) => {
  let lowSum = 0;

  for (let i = 0; i < a.length; i++) {
    lowSum += a[i];
  }

  let cnt = lowSum * a.length; // 12 * 2 = 24

  for (let j = 0; j < a.length; j++) {
    const size = `${a[j]}`.length;
    const offset = Math.pow(10, size);
    cnt += lowSum * offset;
    console.log({aj: a[j], size, offset, cnt});
  }

  return cnt;
};

module.exports.sumOfConcatenation = {solution};
