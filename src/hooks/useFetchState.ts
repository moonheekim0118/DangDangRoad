import { useCallback, useReducer } from 'react';

/**
 *  this is hooks for give loading / done /fail status for reqeust
 *  and also can handle states
 */

const useFetchState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback(() => {
    dispatch({ type: 'loading' });
  }, []);

  const setDone = useCallback(() => {
    dispatch({ type: 'done' });
  }, []);

  const setError = useCallback((error: string) => {
    dispatch({ type: 'fail', error });
  }, []);

  return [state, setLoading, setDone, setError] as const;
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

export default useFetchState;
