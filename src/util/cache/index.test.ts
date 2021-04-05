import cacheProto from '.';

/** 테스트 항목
 *  1. 배열 데이터 및 기본형 데이터 삽입 / 삭제 / 갱신 시, 데이터가 올바르게 저장 및 삭제되는지, 사이즈가 올바르게 수정 되는지
 *     여러개의 캐시 데이터가 저장될 때 제대로 처리되는지
 *  2. 캐시에 데이터 삽입 시, 전체 사이즈가 지정된 한도를 초과했을 때 올바르게 처리하는지 ( 삽입 X )
 *  3. 지정된 만료 기간 후, 캐시에 접근 시 접근 불가능한지
 */

describe('should store Array data correctly', () => {
  let CACHE;
  let key;
  let mockData;
  let mockDataSize;

  beforeEach(() => {
    CACHE = new cacheProto<string[]>();
    key = 'test';
    mockData = ['test', 'hi', 'test'];
    mockDataSize = mockData.length;
  });

  test('when set data initially - store size correctly', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.getSize()).toBe(mockDataSize);
  });

  test('when set data initially - can get Data correctly', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.has(key)).toBe(true);
  });

  test('when set data initially - store data correctly', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.get(key)).toBe(mockData);
  });

  test('when update exisited data - change data & size of it correctly', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.get(key)).toBe(mockData);
    let newData = ['changed'];
    let newDataSize = newData.length;
    CACHE.set(key, newData, newDataSize);
    expect(CACHE.get(key)).toBe(newData);
    expect(CACHE.getSize()).toBe(newDataSize);
  });

  test('when store mutiple keys- update its size correctly', () => {
    CACHE.set(key, mockData, mockDataSize);
    CACHE.set('test1', mockData, mockDataSize);
    expect(CACHE.getSize()).toBe(mockDataSize * 2);
  });

  test('clear data correctly', () => {
    CACHE.set(key, mockData);
    CACHE.clear();
    expect(CACHE.has(key)).toBe(false);
    expect(CACHE.getSize()).toBe(0);
  });

  test('remove value by key correctly', () => {
    CACHE.set(key, mockData, mockDataSize);
    CACHE.delete(key);
    expect(CACHE.has(key)).toBe(false);
    expect(CACHE.getSize()).toBe(0);
  });
});

describe('should store primitive value data correctly', () => {
  let CACHE;
  let key;

  beforeEach(() => {
    CACHE = new cacheProto<boolean>();
    key = 'test';
  });

  test('when set data initially - store size correctly', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.getSize()).toBe(1);
  });

  test('when set data initially - can get Data correctly', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.has(key)).toBe(true);
  });

  test('when set data initially - store data correctly', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.get(key)).toBe(true);
  });

  test('when update exisited data - change data & size of it correctly', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.get(key)).toBe(true);
    CACHE.set(key, false, 1);
    expect(CACHE.get(key)).toBe(false);
    expect(CACHE.getSize()).toBe(1);
  });

  test('when store mutiple keys- update its size correctly', () => {
    CACHE.set(key, true, 1);
    CACHE.set('test1', false, 1);
    expect(CACHE.getSize()).toBe(2);
  });

  test('clear data correctly', () => {
    CACHE.set(key, true, 1);
    CACHE.clear();
    expect(CACHE.has(key)).toBe(false);
    expect(CACHE.getSize()).toBe(0);
  });
});

describe('should not store data when cache size overs max limit', () => {
  let CACHE;
  let maxSize = 100;
  let key1;
  let key2;
  let mockData;
  let mockDataSize;

  beforeEach(() => {
    CACHE = new cacheProto<any[]>(10000, maxSize);
    key1 = 'test1';
    key2 = 'test2';
    mockData = new Array(90);
    mockDataSize = mockData.length;
  });

  test('when limit is 100 and stored data size is 99', () => {
    CACHE.set(key1, mockData, mockDataSize);
    const notOverData = new Array(9);
    const notOverDataSize = notOverData.length;
    CACHE.set(key2, notOverData, notOverDataSize);
    expect(CACHE.has(key1)).toBe(true);
    expect(CACHE.has(key2)).toBe(true);
    expect(CACHE.getSize()).toBe(mockDataSize + notOverDataSize);
    expect(notOverDataSize + mockDataSize).toBeLessThan(maxSize);
  });

  test('when new data over the limit', () => {
    CACHE.set(key1, mockData, mockDataSize);
    const overData = new Array(10);
    const overDataSize = overData.length;
    CACHE.set(key2, overData, overDataSize);
    expect(CACHE.has(key1)).toBe(true);
    expect(CACHE.has(key2)).toBe(false);
    expect(CACHE.getSize()).toBe(mockDataSize);
  });
});

describe('should expire data when maxAge overs', () => {
  let CACHE;
  let key;
  let mockData;
  let maxAge = 1000;

  beforeEach(() => {
    CACHE = new cacheProto<string[]>(maxAge);
    key = 'test';
    mockData = ['test'];
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('when expiry time not passed yet', () => {
    CACHE.set(key, mockData, 1);
    expect(CACHE.has(key)).toBe(true);
    jest.setSystemTime(new Date().getTime() + maxAge - 10);
    expect(CACHE.has(key)).toBe(true);
  });

  test('when expiry time passed', () => {
    CACHE.set(key, mockData, 1);
    expect(CACHE.has(key)).toBe(true);
    jest.setSystemTime(new Date().getTime() + maxAge + 1);
    expect(CACHE.has(key)).toBe(false);
  });
});
