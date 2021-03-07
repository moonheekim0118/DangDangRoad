import { useCallback } from 'react';
import { useInput } from 'hooks';
import routes from 'common/constant/routes';
import Router from 'next/router';

const useSearchPlace = () => {
  const [value, valueChangeHanlder] = useInput();

  const subimtSearchHanlder = useCallback(() => {
    Router.push(`${routes.SEARCH}/${value}`);
  }, [value]);

  return [value, valueChangeHanlder, subimtSearchHanlder] as const;
};

export default useSearchPlace;
