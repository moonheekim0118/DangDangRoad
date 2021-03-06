import * as T from 'types/Context';
import { UserInfo } from 'types/User';

export const loginSuccess = (data: UserInfo): T.LoginSuccessAction => {
  return {
    type: 'loginSuccess',
    data,
  };
};

export const logoutSuccess = {
  type: 'logoutSuccess',
} as T.LogoutSuccessAction;

export const showError = (
  message: string = '잠시 후 다시 시도해주세요'
): T.ShowNotificationAction => {
  return {
    type: 'show',
    data: {
      notiType: 'fail',
      message,
    },
  };
};

export const showSuccess = (message: string): T.ShowNotificationAction => {
  return {
    type: 'show',
    data: {
      notiType: 'success',
      message,
    },
  };
};

export const showInfo = (message: string): T.ShowNotificationAction => {
  return {
    type: 'show',
    data: {
      notiType: 'info',
      message,
    },
  };
};

export const hideAlert = (): T.HideNotificationAction => {
  return { type: 'hide' };
};
