import * as T from 'types/Context';

export const showError = (message: string): T.ShowNotificationAction => {
  return {
    type: 'show',
    data: {
      notiType: 'error',
      message,
    },
  };
};

export const showNoti = (message: string): T.ShowNotificationAction => {
  return {
    type: 'show',
    data: {
      notiType: 'noti',
      message,
    },
  };
};

export const hideAlert = (): T.HideNotificationAction => {
  return { type: 'hide' };
};
