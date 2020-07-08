const shelley = require('../../src/shelley/shelley');

describe('Knapsack problem', () => {
  it('should return 1458', async () => {
    const capacity = 750;
    const items = [
      {w: 70, v: 135},
      {w: 73, v: 139},
      {w: 77, v: 149},
      {w: 80, v: 150},
      {w: 82, v: 156},
      {w: 87, v: 163},
      {w: 90, v: 173},
      {w: 94, v: 184},
      {w: 98, v: 192},
      {w: 106, v: 201},
      {w: 110, v: 210},
      {w: 113, v: 214},
      {w: 115, v: 221},
      {w: 118, v: 229},
      {w: 120, v: 240},
    ];
    expect(shelley.knapsack(items, capacity)).toStrictEqual({
      maxValue: 1458,
      subset: [
        {w: 70, v: 135},
        {w: 77, v: 149},
        {w: 82, v: 156},
        {w: 90, v: 173},
        {w: 94, v: 184},
        {w: 98, v: 192},
        {w: 118, v: 229},
        {w: 120, v: 240},
      ],
    });
  });

  // it('should return 25', async () => {
  //   const capacity = 6;
  //   const items = [
  //     {w: 3, b: 10},
  //     {w: 1, b: 3},
  //     {w: 2, b: 9},
  //     {w: 2, b: 5},
  //     {w: 1, b: 6},
  //   ];
  //   expect(shelley.knapsack(items, capacity)).toStrictEqual({
  //     maxValue: 25,
  //     subset: [{w: 1, v: 6}, {w: 2, v: 9}, {w: 3, v: 10}]});
  // });
});

// Example:
// var items = [{w:3,b:10},{w:1,b:3},{w:2,b:9},{w:2,b:5},{w:1,b:6}];
// var capacity = 6;
// console.log(knapsack(items, capacity));
// will return
// { maxValue: 25,
//   subset: [ { w: 1, v: 6 }, { w: 2, v: 9 }, { w: 3, v: 10 } ] }

// Just adding the sub-problem solutions grid (or memo in this example)
// here for the sake of completion, with the values and capacity
// from the last example:

//                Capacity
// v  / w  -   1  2  3  4  5  6
// -------------------------------
// 3  / 1  -   3  3  3  3  3  3
// 6  / 1  -   6  9  9  9  9  9
// 5  / 2  -   6  9  11 14 14 14
// 9  / 2  -   6  9  15 18 20 23
// 10 / 3  -   6  9  15 18 20 25
