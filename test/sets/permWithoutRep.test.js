const pwr = require('../../src/sets/permWithoutRep');
const fac = require('../../src/shared/math/factorial');

describe('permutateWithoutRepetitions', () => {
  it('should permutate string', () => {
    const permutations1 = pwr.permutateWithoutRepetitions(['A']);
    expect(permutations1).toEqual([
      ['A'],
    ]);

    const permutations2 = pwr.permutateWithoutRepetitions(['A', 'B']);
    expect(permutations2.length).toBe(2);
    expect(permutations2).toEqual([
      ['A', 'B'],
      ['B', 'A'],
    ]);

    const permutations6 = pwr.permutateWithoutRepetitions(['A', 'A']);
    expect(permutations6.length).toBe(2);
    expect(permutations6).toEqual([
      ['A', 'A'],
      ['A', 'A'],
    ]);

    const permutations3 = pwr.permutateWithoutRepetitions(['A', 'B', 'C']);
    expect(permutations3.length).toBe(fac.factorial(3));
    expect(permutations3).toEqual([
      ['A', 'B', 'C'],
      ['B', 'A', 'C'],
      ['B', 'C', 'A'],
      ['A', 'C', 'B'],
      ['C', 'A', 'B'],
      ['C', 'B', 'A'],
    ]);

    const permutations4 = pwr.permutateWithoutRepetitions(['A', 'B', 'C', 'D']);
    expect(permutations4.length).toBe(fac.factorial(4));
    expect(permutations4).toEqual([
      ['A', 'B', 'C', 'D'],
      ['B', 'A', 'C', 'D'],
      ['B', 'C', 'A', 'D'],
      ['B', 'C', 'D', 'A'],
      ['A', 'C', 'B', 'D'],
      ['C', 'A', 'B', 'D'],
      ['C', 'B', 'A', 'D'],
      ['C', 'B', 'D', 'A'],
      ['A', 'C', 'D', 'B'],
      ['C', 'A', 'D', 'B'],
      ['C', 'D', 'A', 'B'],
      ['C', 'D', 'B', 'A'],
      ['A', 'B', 'D', 'C'],
      ['B', 'A', 'D', 'C'],
      ['B', 'D', 'A', 'C'],
      ['B', 'D', 'C', 'A'],
      ['A', 'D', 'B', 'C'],
      ['D', 'A', 'B', 'C'],
      ['D', 'B', 'A', 'C'],
      ['D', 'B', 'C', 'A'],
      ['A', 'D', 'C', 'B'],
      ['D', 'A', 'C', 'B'],
      ['D', 'C', 'A', 'B'],
      ['D', 'C', 'B', 'A'],
    ]);

    const permutations5 = pwr.permutateWithoutRepetitions(
        ['A', 'B', 'C', 'D', 'E', 'F']);
    expect(permutations5.length).toBe(fac.factorial(6));
  });

  it('should permutate numbers', () => {
    const permutations1 = pwr.permutateWithoutRepetitions([1, 2, 3]);
    expect(permutations1).toContainEqual([1, 2, 3]);
    expect(permutations1).toContainEqual([2, 1, 3]);
    expect(permutations1).toContainEqual([2, 3, 1]);
    expect(permutations1).toContainEqual([1, 3, 2]);
    expect(permutations1).toContainEqual([3, 2, 1]);
    expect(permutations1).toContainEqual([3, 1, 2]);
    expect(permutations1.length).toEqual(6);
  });

  it('should permutate numbers using permuteNumbers', () => {
    const permutations1 = pwr.permuteNumbers([1, 2, 3]);
    expect(permutations1).toContainEqual([1, 2, 3]);
    expect(permutations1).toContainEqual([2, 1, 3]);
    expect(permutations1).toContainEqual([2, 3, 1]);
    expect(permutations1).toContainEqual([1, 3, 2]);
    expect(permutations1).toContainEqual([3, 2, 1]);
    expect(permutations1).toContainEqual([3, 1, 2]);
    expect(permutations1.length).toEqual(6);
  });
});
