import Clz from '../src';

describe('clz', () => {
  test('clz', () => {
    expect(Clz).toBeDefined();
  });

  test('init twice', () => {
    const c1 = new Clz({ appId: 'appId', appKey: 'appKey', serverURLs: 'serverURLs' });
    const c2 = new Clz({ appId: 'appId', appKey: 'appKey', serverURLs: 'serverURLs' });
  });
});
