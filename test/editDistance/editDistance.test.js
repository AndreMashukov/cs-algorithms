const editDistance = require('../../src/editDistance/editDistance').default;

describe('editDistance', () => {
  it('should return 3 for ("example", "samples")', async () => {
    expect(editDistance('example', 'samples')).toEqual(3);
  });

  it('should return 6 for ("forward", "drawrof");', async () => {
    expect(editDistance('forward', 'drawrof')).toEqual(6);
  });

  it('should return 6 for ("xabxcdxxefxgx", "abcdefg")', async () => {
    expect(editDistance('xabxcdxxefxgx', 'abcdefg')).toEqual(6);
  });
});
