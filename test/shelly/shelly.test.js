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
    expect(shelley.knapsack(items, capacity)).toStrictEqual(
        {maxValue: 1458,
          subset:
         [{w: 70, v: 135},
           {w: 77, v: 149},
           {w: 82, v: 156},
           {w: 90, v: 173},
           {w: 94, v: 184},
           {w: 98, v: 192},
           {w: 118, v: 229},
           {w: 120, v: 240}]},
    );
  });
});
