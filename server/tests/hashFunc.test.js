const hashFunc = require('../lib/hash-generator.js');

describe('hashFunc', () => {
  test('returns two different hash values on sequential calls', () => {
    expect(hashFunc().hash).not.toBe(hashFunc().hash);
  });

  test('returns a hash that is a string of 8 characters', () => {
    const hash = hashFunc().hash;
    expect(hash.length).toBe(8);
    expect(typeof hash).toBe('string');
  });

  test('returns the createTime and updateTime as numbers', () => {
    const { hash, createTime, updateTime } = hashFunc();
    expect(typeof createTime).toBe('number');
    expect(typeof updateTime).toBe('number');
  });
});
