const { staircase } = require('../../../src/misc/july2022/staircase');

describe('misc.july2022.staircase', () => {
  it('should return 5 options', () => {
    const result = staircase.solution(4, 2);
    expect(result).toStrictEqual([
      [1, 1, 1, 1],
      [1, 1, 2],
      [1, 2, 1],
      [2, 1, 1],
      [2, 2]
    ]);
  });
});

// You need to climb a staircase that has n steps,
// and you decide to get some extra exercise by jumping up the steps.
// You can cover at most k steps in a single jump.
// Return all the possible sequences of jumps that
// you could take to climb the staircase, sorted.
