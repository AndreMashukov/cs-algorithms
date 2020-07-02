const lcs = require('../../src/lcs/longestCommonSubsequence');

const testCase1 = {
  set1: 'ABCDGH',
  set2: 'AEDFHR',
  expected: 'ADH',
};

const testCase2 = {
  set1: 'AGGTAB',
  set2: 'GXTXAYB',
  expected: 'GTAB',
};

const testCase3 = {
  set1: ['A', 'B', 'C', 'D', 'A', 'F'],
  set2: ['A', 'C', 'B', 'C', 'F'],
  expected: ['A', 'B', 'C', 'F'],
};

describe('longestCommonSubsequence test suite', () => {
  it('ABCDGH and AEDFHR => ADH of length 3', async () => {
    expect(
        lcs.longestCommonSubsequence(testCase1.set1, testCase1.set2) ===
        testCase1.expected,
    );
  });

  it('AGGTAB and GXTXAYB => GTAB of length 4', async () => {
    expect(
        lcs.longestCommonSubsequence(testCase2.set1, testCase2.set2) ===
        testCase2.expected,
    );
  });

  it('ABCDAF and ACBCF => ABCF of length 4', async () => {
    expect(
        lcs.longestCommonSubsequence(testCase3.set1, testCase3.set2))
        .toEqual(testCase3.expected);
  });
});
