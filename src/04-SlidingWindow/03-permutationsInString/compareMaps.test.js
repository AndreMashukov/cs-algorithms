const compareMaps = require('./index');

describe('compareMaps', () => {
  it('should return true for two identical maps', () => {
    const map1 = new Map();
    map1.set('key1', 'value1');
    map1.set('key2', 'value2');

    const map2 = new Map();
    map2.set('key1', 'value1');
    map2.set('key2', 'value2');

    expect(compareMaps(map1, map2)).toBe(true);
  });

  it('should return false for two different maps', () => {
    const map1 = new Map();
    map1.set('key1', 'value1');
    map1.set('key2', 'value2');

    const map2 = new Map();
    map2.set('key1', 'value1');
    map2.set('key2', 'value3');

    expect(compareMaps(map1, map2)).toBe(false);
  });

  it('should return false for maps of different sizes', () => {
    const map1 = new Map();
    map1.set('key1', 'value1');
    map1.set('key2', 'value2');

    const map2 = new Map();
    map2.set('key1', 'value1');

    expect(compareMaps(map1, map2)).toBe(false);
  });
});