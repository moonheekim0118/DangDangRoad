import React, { useReducer, createContext, useContext } from 'react';

interface ShowNotificationAction {
  type: 'show';
  data: {
    notiType: 'error' | 'noti';
    message: string;
  }; // message
}

interface HideNotificationAction {
  type: 'hide';
}

interface State {
  notiType: 'error' | 'noti' | null;
  notiMessage: string | null;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

type Dispatch = (
  action: ShowNotificationAction | HideNotificationAction
) => void;

const NotificationStateContext = createContext<State | undefined>(undefined);
const NotificationDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

const NotificationReducer = (
  state: State,
  action: ShowNotificationAction | HideNotificationAction
) => {
  switch (action.type) {
    case 'show': {
      return {
        notiType: action.data.notiType,
        notiMessage: action.data.message,
      };
    }
    case 'hide': {
      return { notiType: null, notiMessage: null };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [state, dispatch] = useReducer(NotificationReducer, {
    notiType: null,
    notiMessage: null,
  });

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

/** use Notification State */
const useNotificationState = () => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error('useLoginState must be used within a LoginInfoProvider');
  }
  return context;
};

/** use Notification Dispatch function */
const useNotificationDispatch = () => {
  const context = useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useLoginInfoDispatch must be used within a LoginInfoProvider'
    );
  }
  return context;
};

export { NotificationProvider, useNotificationState, useNotificationDispatch };
