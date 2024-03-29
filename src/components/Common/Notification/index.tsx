import { useEffect } from 'react';
import { hideAlert } from 'action';
import {
  useNotificationState,
  useNotificationDispatch,
} from 'context/Notification';
import { Toast } from 'components/UI';
import { NOTI_TIME } from 'common/constant/number';

const Notification = (): React.ReactElement | null => {
  const { notiType, notiMessage } = useNotificationState();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    let timer: number | null = null;
    if (notiType) {
      timer = window.setTimeout(() => {
        dispatch(hideAlert());
      }, NOTI_TIME);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [notiType]);

  return notiType ? (
    <Toast theme={notiType} size="large" show={true} animation={true}>
      {notiMessage}
    </Toast>
  ) : null;
};

export default Notification;
