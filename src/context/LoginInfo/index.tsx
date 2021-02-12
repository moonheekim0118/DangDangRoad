import React, { useReducer, createContext, useContext } from 'react';

/**
 *  state : isLoggedIn 현재 로그인 여부
 */

interface Action {
  type: 'login' | 'logout';
}
interface State {
  isLoggedIn: boolean;
}
interface LoginInfoProviderProps {
  children: React.ReactNode;
}
type Dispatch = (action: Action) => void;

const LoginStateContext = createContext<State | undefined>(undefined);
const LoginDispatchContext = createContext<Dispatch | undefined>(undefined);

const LoginInfoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'login': {
      return { isLoggedIn: true };
    }
    case 'logout': {
      return { isLoggedIn: false };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const LoginInfoProvider = ({ children }: LoginInfoProviderProps) => {
  const [state, dispatch] = useReducer(LoginInfoReducer, { isLoggedIn: false });

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
};

/** use isLoggedIn state */
const useLoginInfoState = () => {
  const context = useContext(LoginStateContext);
  if (context === undefined) {
    throw new Error('useLoginState must be used within a LoginInfoProvider');
  }
  return context;
};

/** use login Dispatch fucntion */
const useLoginInfoDispatch = () => {
  const context = useContext(LoginDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useLoginInfoDispatch must be used within a LoginInfoProvider'
    );
  }
  return context;
};

export { LoginInfoProvider, useLoginInfoState, useLoginInfoDispatch };
