import React, { useReducer, createContext, useContext } from 'react';
import { UserType } from 'types/User';
import * as T from 'types/Context';

interface State extends UserType {
  isLoaded: boolean;
}

interface LoginInfoProviderProps {
  children: React.ReactNode;
}

type actionTypes =
  | T.LogoutRequestAction
  | T.LoginSuccessAction
  | T.LogoutSuccessAction;

type Dispatch = (action: actionTypes) => void;

const LoginStateContext = createContext<State | undefined>(undefined);
const LoginDispatchContext = createContext<Dispatch | undefined>(undefined);

const LoginInfoReducer = (state: State, action: actionTypes) => {
  switch (action.type) {
    case 'loginSuccess': {
      return {
        ...state,
        isLoaded: true,
        ...action.data,
      };
    }
    case 'logoutRequest': {
      return {
        ...state,
        isLoaded: false,
      };
    }
    case 'logoutSuccess': {
      return {
        ...state,
        isLoaded: true,
        isLoggedIn: false,
        userId: '',
        email: '',
        nickname: '',
        profilePic: '',
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const LoginInfoProvider = ({ children }: LoginInfoProviderProps) => {
  const [state, dispatch] = useReducer(LoginInfoReducer, {
    isLoaded: false,
    isLoggedIn: false,
    userId: '',
    email: '',
    nickname: '',
    profilePic: '',
  });

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
