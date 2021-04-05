import useInfiniteData, { INIT, ADD, UPDATE, REMOVE } from './useInfiniteData';
import { renderHook, act } from '@testing-library/react-hooks';

describe('should have correct initial states', () => {
  let result = renderHook(() => useInfiniteData<string>()).result;

  test('initial data', () => {
    expect(result.current.result.type).toBe('');
    expect(result.current.result.dataList).toStrictEqual([]);
    expect(result.current.result.lastKey).toBe(0);
    expect(result.current.result.hasMore).toBe(true);
  });
});

describe('should change state correctly by dispatch', () => {
  let result;
  let mockData;
  beforeEach(() => {
    mockData = [
      { docId: '1', createdAt: 1 },
      { docId: '2', createdAt: 2 },
    ];
    result = renderHook(() => useInfiniteData<string>()).result;
    act(() =>
      result.current.dispatch({
        type: INIT,
        data: {
          dataList: mockData,
          lastKey: 2,
          hasMore: true,
        },
      })
    );
  });

  test('INIT dispatch', () => {
    expect(result.current.result.dataList).toBe(mockData);
    expect(result.current.result.lastKey).toBe(2);
    expect(result.current.result.hasMore).toBe(true);
    expect(result.current.result.type).toBe(INIT);
  });

  test('ADD dispatch', () => {
    const newData = [{ docId: '3', createdAt: 3 }];
    const mergedDatas = newData.concat(mockData);
    act(() =>
      result.current.dispatch({
        type: ADD,
        data: {
          dataList: newData,
        },
      })
    );
    expect(result.current.result.type).toBe(ADD);
    expect(result.current.result.dataList).toStrictEqual(mergedDatas);
  });

  test('UPDATE dispatch', () => {
    const newData = [{ docId: '3', createdAt: 3 }];
    const mergedDatas = mockData.concat(newData);
    act(() =>
      result.current.dispatch({
        type: UPDATE,
        data: {
          dataList: newData,
          hasMore: false,
          lastKey: 3,
        },
      })
    );
    expect(result.current.result.type).toBe(UPDATE);
    expect(result.current.result.dataList).toStrictEqual(mergedDatas);
    expect(result.current.result.lastKey).toBe(3);
    expect(result.current.result.hasMore).toBe(false);
  });

  test('REMOVE dispatch', () => {
    const filteredData = mockData.filter((v) => v.docId !== '2');
    act(() =>
      result.current.dispatch({
        type: REMOVE,
        data: { id: '2' },
      })
    );
    expect(result.current.result.type).toBe(REMOVE);
    expect(result.current.result.dataList).toStrictEqual(filteredData);
    expect(result.current.result.lastKey).toBe(1);
    expect(result.current.result.hasMore).toBe(true);
  });

  test('Set Default type', () => {
    act(() => result.current.setDefault());
    expect(result.current.result.type).toBe('');
    expect(result.current.result.dataList).toBe(mockData);
    expect(result.current.result.lastKey).toBe(2);
    expect(result.current.result.hasMore).toBe(true);
  });
});
