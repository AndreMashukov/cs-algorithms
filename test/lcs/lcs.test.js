const lcs = require('../../src/lcs/longestCommonSubsequence');

const testCase1 = {
  set1: 'ABCDGH',
  set2: 'AEDFHR',
  expected: 'ADH',
};

describe('Dummy test', () => {
  it('ABCDGH and AEDFHR => ADH of length 3', async () => {
    expect(
      lcs.longestCommonSubsequence(testCase1.set1, testCase1.set2) ===
        testCase1.expected
    );
  });
});
