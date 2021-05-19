import cacheProto from '.';

/** 테스트 항목
 *  1. 배열 데이터 및 기본형 데이터 삽입 / 삭제 / 갱신 시, 데이터가 올바르게 저장 및 삭제되는지, 사이즈가 올바르게 수정 되는지
 *     여러개의 캐시 데이터가 저장될 때 제대로 처리되는지
 *  2. 캐시에 데이터 삽입 시, 전체 사이즈가 지정된 한도를 초과했을 때 올바르게 처리하는지 ( 삽입 X )
 *  3. 지정된 만료 기간 후, 캐시에 접근 시 접근 불가능한지
 */

describe('참조형 데이터를 올바르게 캐싱하는지 검사한다.', () => {
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

  test('새로운 데이터를 캐싱 한 경우 - 데이터 크기', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.getSize()).toBe(mockDataSize);
  });

  test('새로운 데이터를 캐싱 한 경우 - 데이터 가져오기', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.has(key)).toBe(true);
  });

  test('새로운 데이터를 캐싱 한 경우 - 데이터 저장하기', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.get(key)).toBe(mockData);
  });

  test('기존에 캐싱된 데이터를 수정 한 경우', () => {
    CACHE.set(key, mockData, mockDataSize);
    expect(CACHE.get(key)).toBe(mockData);
    let newData = ['changed'];
    let newDataSize = newData.length;
    CACHE.set(key, newData, newDataSize);
    expect(CACHE.get(key)).toBe(newData);
    expect(CACHE.getSize()).toBe(newDataSize);
  });

  test('여러 데이터를 캐싱 한 경우', () => {
    CACHE.set(key, mockData, mockDataSize);
    CACHE.set('test1', mockData, mockDataSize);
    expect(CACHE.getSize()).toBe(mockDataSize * 2);
  });

  test('캐싱된 데이터를 초기화 한 경우', () => {
    CACHE.set(key, mockData);
    CACHE.clear();
    expect(CACHE.has(key)).toBe(false);
    expect(CACHE.getSize()).toBe(0);
  });

  test('특정 key 값을 삭제한 경우', () => {
    CACHE.set(key, mockData, mockDataSize);
    CACHE.delete(key);
    expect(CACHE.has(key)).toBe(false);
    expect(CACHE.getSize()).toBe(0);
  });
});

describe('일반형 데이터를 올바르게 캐싱하는지 검사한다', () => {
  let CACHE;
  let key;

  beforeEach(() => {
    CACHE = new cacheProto<boolean>();
    key = 'test';
  });

  test('새로운 데이터를 캐싱 한 경우 - 데이터 크기', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.getSize()).toBe(1);
  });

  test('새로운 데이터를 캐싱 한 경우 - 데이터 가져오기', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.has(key)).toBe(true);
  });

  test('새로운 데이터를 캐싱 한 경우 - 데이터 저장하기', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.get(key)).toBe(true);
  });

  test('기존에 캐싱된 데이터를 수정 한 경우', () => {
    CACHE.set(key, true, 1);
    expect(CACHE.get(key)).toBe(true);
    CACHE.set(key, false, 1);
    expect(CACHE.get(key)).toBe(false);
    expect(CACHE.getSize()).toBe(1);
  });

  test('여러 데이터를 캐싱 한 경우', () => {
    CACHE.set(key, true, 1);
    CACHE.set('test1', false, 1);
    expect(CACHE.getSize()).toBe(2);
  });

  test('캐싱된 데이터를 초기화 한 경우', () => {
    CACHE.set(key, true, 1);
    CACHE.clear();
    expect(CACHE.has(key)).toBe(false);
    expect(CACHE.getSize()).toBe(0);
  });
});

describe('캐시된 데이터가 정해진 사이즈를 넘을 때 올바르게 처리하는지 검사', () => {
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

  test('정해진 사이즈가 100이고 현재 캐싱된 데이터 크기가 99일 때', () => {
    CACHE.set(key1, mockData, mockDataSize);
    const notOverData = new Array(9);
    const notOverDataSize = notOverData.length;
    CACHE.set(key2, notOverData, notOverDataSize);
    expect(CACHE.has(key1)).toBe(true);
    expect(CACHE.has(key2)).toBe(true);
    expect(CACHE.getSize()).toBe(mockDataSize + notOverDataSize);
    expect(notOverDataSize + mockDataSize).toBeLessThan(maxSize);
  });

  test('새로운 데이터 삽입 시, 데이터 사이즈를 초과할 경우', () => {
    CACHE.set(key1, mockData, mockDataSize);
    const overData = new Array(10);
    const overDataSize = overData.length;
    CACHE.set(key2, overData, overDataSize);
    expect(CACHE.has(key1)).toBe(true);
    expect(CACHE.has(key2)).toBe(false);
    expect(CACHE.getSize()).toBe(mockDataSize);
  });
});

describe('캐싱된 데이터가 정해진 만료 기간에 맞춰 올바르게 만료되는지 검사한다.', () => {
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

  test('만료 기간이 아직 지나지 않았을 경우', () => {
    CACHE.set(key, mockData, 1);
    expect(CACHE.has(key)).toBe(true);
    jest.setSystemTime(new Date().getTime() + maxAge - 10);
    expect(CACHE.has(key)).toBe(true);
  });

  test('만료 기간이 지났을 경우', () => {
    CACHE.set(key, mockData, 1);
    expect(CACHE.has(key)).toBe(true);
    jest.setSystemTime(new Date().getTime() + maxAge + 1);
    expect(CACHE.has(key)).toBe(false);
  });
});
