import { useCallback } from 'react';
import { useInput } from 'hooks';
import routes from 'common/constant/routes';
import Router from 'next/router';

const useSearchPlace = () => {
  const [value, onChange] = useInput();

  const submitHandler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      Router.push(`${routes.SEARCH}/${value}`);
    },
    [value]
  );

  return { value, onChange, submitHandler };
};

export default useSearchPlace;
