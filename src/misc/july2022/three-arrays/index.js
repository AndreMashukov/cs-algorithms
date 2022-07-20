const processStep = (a, b, c) => {
  if (a.length === 0 || b.length === 0) {
    return [];
  }
  const sb = new Set(b);
  const sc = new Set();

  for (const i of c) {
    sc.add(i);
    if (sb.has(i)) {
      sb.delete(i);
    }
  }

  // maxLen, start_i_max, start_i, (currLen = 0), 0, 0, 0;
  let maxLen = 0;
  let startImax = 0;
  let startI = 0;
  let currLen = 0;

  for (let i = 0; i < a.length; i++) {
    if (sb.has(a[i])) {
      currLen += 1;
    } else {
      if (maxLen < currLen) {
        maxLen = currLen;
        startImax = startI;
      }
      currLen = 0;
      startI = i + 1;
    }
  }

  // # if we end on a a[i] in set sb:

  if (maxLen < currLen) {
    maxLen = currLen;
    startImax = startI;
  }
  // console.log({ tp });

  const copy = [...a];
  const stepResult = copy.splice(startImax, maxLen);
  console.log({ a, stepResult, newArray: copy });
  return { stepResult, newArray: copy, arrLength: stepResult.length };
};

const solution = (a, b, c) => {
  const result = [];
  // let stepResult;
  let process = true;
  // while (process) {

  let maxLen = -1;

  // }
  let { stepResult, newArray, arrLength } = processStep(a, b, c);
  if (arrLength > 0) {
    result.push(stepResult);
    maxLen = arrLength;
  } else {
    process = false;
  }
  while (process) {
    const {
      stepResult: _stepResult,
      newArray: _newArray,
      arrLength: _arrLength
    } = processStep(newArray, b, c);

    if (_arrLength > 0 && _arrLength >= maxLen) {
      result.push(_stepResult);
      newArray = _newArray;
    } else {
      process = false;
    }
  }

  return result;
};
module.exports.threeArrays = { solution };
