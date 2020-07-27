const cin = require('../../src/intervals/coveredInterval');
const crd = require('../../src/shared/intervals/Coordinate');

describe('Check if interval is covered in given coordinates', () => {
  it('should true if interval is covered', () => {
    const interval = new crd.Coordinate(1, 6);
    const coordinates = [];
    coordinates.push(new crd.Coordinate(2, 5));
    coordinates.push(new crd.Coordinate(5, 7));
    coordinates.push(new crd.Coordinate(1, 4));
    expect(cin.checkIfIntervalIsOverlapping(coordinates, interval))
        .toBe(true);
  });

  it('should false if there are any gaps', () => {
    // Coordinates - [(1,4),(6,7),(2,5)] and interval - (1,6)
    // from 5 -> 6 is not covered by the given interval
    const interval = new crd.Coordinate(1, 6);
    const coordinates = [];
    coordinates.push(new crd.Coordinate(1, 4));
    coordinates.push(new crd.Coordinate(6, 7));
    coordinates.push(new crd.Coordinate(2, 5));
    expect(cin.checkIfIntervalIsOverlapping(coordinates, interval))
        .toBe(false);
  });
});
