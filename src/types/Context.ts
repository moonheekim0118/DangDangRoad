export interface ShowNotificationAction {
  type: 'show';
  data: {
    notiType: 'error' | 'noti';
    message: string;
  }; // message
}

export interface HideNotificationAction {
  type: 'hide';
}
