import { useCallback, useReducer } from 'react';
import api from 'api';
import * as T from 'types/API';

/**
 *  this is hooks for give loading / done /fail status for reqeust
 *
 */

const useAPI = (apiType: T.APITypes) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendRequest = useCallback(async (params) => {
    try {
      dispatch({ type: 'loading' });
      const response = await api[apiType](params);
      if (!response.isError) {
        dispatch({ type: 'done' });
        return response.data;
      } else {
        dispatch({ type: 'fail', error: response.error });
      }
    } catch (error) {
      dispatch({ type: 'fail', error: '잠시후 다시 시도해주세요' });
    }
  }, []);

  return [sendRequest, state] as const;
};

interface State {
  loading: boolean;
  done: boolean;
  error: string | null;
}

const initialState = {
  loading: false,
  done: false,
  error: null,
};

interface LoadingAction {
  type: 'loading';
}

interface DoneAction {
  type: 'done';
}

interface FailAction {
  type: 'fail';
  error: string;
}

const reducer = (
  state: State,
  action: LoadingAction | DoneAction | FailAction
) => {
  switch (action.type) {
    case 'loading':
      return {
        loading: true,
        done: false,
        error: null,
      };
    case 'done':
      return {
        loading: false,
        done: true,
        error: null,
      };
    case 'fail':
      return {
        loading: false,
        done: false,
        error: action.error,
      };
  }
};

export default useAPI;
