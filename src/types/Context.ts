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
