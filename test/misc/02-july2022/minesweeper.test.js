const { minesweeper } = require('../../../src/misc/july2022/minesweeper');

describe('misc.july2022.minesweeper', () => {
  // it('test case #1', () => {
  //   const field = [
  //     [false, true, true],
  //     [true, false, true],
  //     [false, false, true]
  //   ];
  //   const x = 1;
  //   const y = 1;
  //   const result = minesweeper.naive(field, x, y);
  //   expect(result).toEqual([
  //     [-1, -1, -1],
  //     [-1, 5, -1],
  //     [-1, -1, -1]
  //   ]);
  // });

  it('test case #2', () => {
    const field = [
      [true, false, true, true, false],
      [true, false, false, false, false],
      [false, false, false, false, false],
      [true, false, false, false, false]
    ];
    const x = 3;
    const y = 2;
    const result = minesweeper.naive(field, x, y);
    expect(result).toEqual([
      [-1, -1, -1, -1, -1],
      [-1, 3, 2, 2, 1],
      [-1, 2, 0, 0, 0],
      [-1, 1, 0, 0, 0]
    ]);
  });
});
//  &&&& [
//     [ -1, -1, -1, -1, -1 ],
//     [ -1, 5, 3, 3, 2 ],
//     [ -1, 2, 0, 0, 0 ],
//     [ -1, 1, 0, 0, 0 ]
//   ]
