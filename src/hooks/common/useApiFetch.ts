import { useEffect, useReducer, useCallback } from 'react';
import { APIResponse } from 'types/API';
import errorExTxt from 'util/errorExTxt';

export const REQUEST = 'REQEUST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

interface Reducer<T> {
  (result: Result<T>, action: Result<T>): Result<T>;
}

interface Result<T> {
  type: '' | 'REQEUST' | 'SUCCESS' | 'FAILURE';
  error?: string;
  data?: T;
  params?: any[];
}

const reducer = <T>(result: Result<T>, action: Result<T>) => {
  const { type, params } = action;
  switch (action.type) {
    case 'REQEUST':
      return { type, params };
    case 'SUCCESS':
      return { type, data: action.data };
    case 'FAILURE':
      return { type, error: action.error };
    default:
      return { type };
  }
};

const fetchData = async <T>(
  apiRequest: (...args: any[]) => APIResponse<T>,
  dispatch: React.Dispatch<Result<T>>,
  params?: any[]
) => {
  try {
    const response = params ? await apiRequest(...params) : await apiRequest();
    if (!response.isError) {
      dispatch({ type: SUCCESS, data: response.data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: FAILURE, error: errorExTxt(error.code) });
  }
};

const useApiFetch = <T = null>(
  apiRequest: (...args: any[]) => APIResponse<T>
) => {
  const initialState: Result<T> = {
    type: '',
  };

  const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);

  useEffect(() => {
    if (result.type === REQUEST) {
      fetchData<T>(apiRequest, dispatch, result.params);
    }
  }, [result, apiRequest]);

  const setDefault = useCallback(() => dispatch({ type: '' }), []);

  return [result, dispatch, setDefault] as const;
};

export default useApiFetch;
