import { UserInfo } from 'types/User';
export interface ShowNotificationAction {
  type: 'show';
  data: {
    notiType: 'success' | 'info' | 'fail' | null;
    message: string | null;
  }; // message
}

export interface HideNotificationAction {
  type: 'hide';
}

export interface LoginSuccessAction {
  type: 'loginSuccess';
  data: UserInfo;
}

export interface LogoutSuccessAction {
  type: 'logoutSuccess';
}
