import * as T from 'types/Context';

export const showError = (
  message: string = '잠시 후 다시 시도해주세요'
): T.ShowNotificationAction => {
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
