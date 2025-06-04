// a = [2, 1, 7, 1, 1, 5, 3, 5, 2, 1, 1, 1], b = [1, 3, 5], and c = [2, 3],
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

  // max length of a required subarray found so far.
  let maxLen = 0;
  // index of where needed subarray begins.
  let startImax = 0;
  // current
  let startI = 0;
  let currLen = 0;

  for (let i = 0; i < a.length; i++) {
    if (sb.has(a[i])) {
      currLen += 1;
    } else {
      // If a[i] doesn't exist in sb
      if (maxLen < currLen) {
        maxLen = currLen;
        startImax = startI;
      }
      // If a[i] doesn't exist in sb.
      // and reset currLen and define new start index.
      currLen = 0;
      // record where a new subarray has started from.
      startI = i + 1;
    }
  }

  // # if we end on a a[i] in set sb:
  if (maxLen < currLen) {
    // new maximum length has been found.
    maxLen = currLen;
    startImax = startI;
  }

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
