import { useEffect, useCallback, useState } from 'react';

interface Props {
  message?: string;
  type?: 'noti' | 'error';
}

const useAlert = ({ message = '', type = 'error' }: Props = {}) => {
  const [alertMessage, setAlertMessage] = useState<string>(message);
  const [alertType, setAlertType] = useState<'noti' | 'error'>(type);

  useEffect(() => {
    setAlertMessage(message);
    setAlertType(type);
  }, []);

  const closeAlertHandler = useCallback(() => {
    setAlertMessage('');
  }, []);

  return [
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    closeAlertHandler,
  ] as const;
};

export default useAlert;
