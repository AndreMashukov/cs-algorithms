const areDifferent = (head, left, right) => {
  const ab = `${head}${left}`;
  const bc = `${left}${right}`;
  const ca = `${right}${head}`;
  // console.log({ ab, bc, ca });
  return ab !== bc && ab !== ca && bc !== ca;
};

const solution = (s) => {
  let count = 0;
  const all = [];
  const splitRemainder = (str) => {
    const array = [];
    if (str.length > 1) {
      for (let i = 1; i < s.length - 1; i++) {
        const left = str.substring(0, i);
        const right = str.slice(i);
        // console.log({left, right})
        if (right.length > 0) {
          array.push([left, right]);
        }
      }
    }

    return array;
  };
  const split = (str) => {
    if (str.length > 1) {
      for (let i = 1; i < s.length - 1; i++) {
        const head = s.substring(0, i);
        const remainder = s.slice(i);

        const leftRight = splitRemainder(remainder);
        const mapped = leftRight.map(([left, right]) => {
          return { head, left, right };
        });

        // console.log({ mapped });
        mapped.forEach((item) => {
          all.push(item);
        });
      }
    }
  };

  split(s);
  // console.log(all);
  all.forEach((item) => {
    if (areDifferent(item.head, item.left, item.right)) {
      count++;
    }
  });
  return count;
};
module.exports.splitString = { solution };
