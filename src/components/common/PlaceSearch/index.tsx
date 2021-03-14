import React, { useRef, useCallback, FormEvent } from 'react';
import { SearchBar } from 'components/ui';
import {
  REVIEW_SEARCH_PLACEHODLER,
  NO_KEYWORD_ERROR,
} from 'common/constant/string';
import { InputRef, inputDefaultRef } from 'types/Ref';
import routes from 'common/constant/routes';
import Router from 'next/router';

const PlaceSearch = () => {
  const keywordRef = useRef<InputRef>(inputDefaultRef());

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const keyword = keywordRef.current.value;
      if (keyword.length === 0) {
        return alert(NO_KEYWORD_ERROR);
      }
      Router.push(`${routes.SEARCH}/${keyword}`);
    },
    [keywordRef]
  );

  return (
    <SearchBar
      color="blue"
      placeholder={REVIEW_SEARCH_PLACEHODLER}
      focus={true}
      ref={keywordRef}
      submitHandler={submitHandler}
    />
  );
};

export default PlaceSearch;
