const { mergeStrings } = require('../../../src/misc/june2022/merge-strings');

describe('misc.june2022.merge-string-1', () => {
  it('should return dcecccbd', () => {
    const merged = mergeStrings.naive('dce', 'cccbd');
    expect(merged).toEqual('dcecccbd');
  });

  // it('should return stouperwer', () => {
  //   const merged = mergeStrings.naive('super', 'tower');
  //   expect(merged).toEqual('stouperwer');
  // });
});

// describe('misc.june2022.merge-string-2', () => {
//   it('should return dcecccbd', () => {
//     const merged = mergeStrings.efficient('abdcdtx', 'achilp');
//     expect(merged).toEqual('aabcdcdhilptx');
//   });
// });
