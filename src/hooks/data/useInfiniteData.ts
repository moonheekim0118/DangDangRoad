import { useReducer, useCallback } from 'react';

export const INIT = 'INIT';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';

interface Reducer<T> {
  (result: State<T>, action): State<T>;
}

interface DefaultProps {
  docId: string;
  createdAt: number;
}

interface State<T> {
  type: '' | 'INIT' | 'UPDATE' | 'ADD' | 'REMOVE';
  dataList: (T & DefaultProps)[];
  lastKey: number;
  hasMore: boolean;
}

function reducer<T>(state: State<T>, action): State<T> {
  const { type, data } = action;
  switch (action.type) {
    case INIT:
      return {
        type,
        ...data,
      };
    case ADD:
      let updatedDatas = data.dataList.concat(state.dataList);
      return {
        ...state,
        type,
        dataList: updatedDatas,
      };
    case UPDATE:
      updatedDatas = state.dataList.concat(data.dataList);
      return {
        type,
        hasMore: data.hasMore,
        lastKey: data.lastKey,
        dataList: updatedDatas,
      };
    case REMOVE:
      const id = data.id;
      let updatedLastKey = data.lastKey || 0;
      updatedDatas = state.dataList.filter((v, i) => {
        if (v.docId === id && v.createdAt === updatedLastKey) {
          updatedLastKey = state.dataList[i - 1].createdAt;
        }
        return v.docId !== id;
      });
      return {
        ...state,
        type,
        dataList: updatedDatas,
        lastKey: updatedLastKey,
      };
    default:
      return { ...state, type };
  }
}

const useInfiniteData = <T = DefaultProps>() => {
  const initialState: State<T> = {
    type: '',
    dataList: [] as (T & DefaultProps)[],
    lastKey: 0,
    hasMore: true,
  };

  const setDefault = useCallback(() => {
    dispatch({ type: '' });
  }, []);
  const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);

  return [result, dispatch, setDefault] as const;
};

export default useInfiniteData;
