const lara = require('../../src/editDistance/lara');

describe('editDistance', () => {
  it('should return 3 for ("example", "samples")', async () => {
    expect(lara.editDistanceLara('example', 'samples')).toEqual(3);
  });

  it('should return 6 for ("forward", "drawrof");', async () => {
    expect(lara.editDistanceLara('forward', 'drawrof')).toEqual(6);
  });

  it('should return 6 for ("xabxcdxxefxgx", "abcdefg")', async () => {
    expect(lara.editDistanceLara('xabxcdxxefxgx', 'abcdefg')).toEqual(6);
  });
});
