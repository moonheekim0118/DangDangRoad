import React, { useRef, useCallback } from 'react';
import { SearchBar } from 'components/UI';
import {
  REVIEW_SEARCH_PLACEHODLER,
  NO_KEYWORD_ERROR,
} from 'common/constant/string';
import { InputRef, inputDefaultRef } from 'types/Ref';
import routes from 'common/constant/routes';
import Router from 'next/router';

const PlaceSearch = (): React.ReactElement => {
  const keywordRef = useRef<InputRef>(inputDefaultRef());

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
      id="placeSearch"
      color="blue"
      placeholder={REVIEW_SEARCH_PLACEHODLER}
      focusTheme="fromBlueToWhite"
      ref={keywordRef}
      onFormSubmit={handleSubmit}
    />
  );
};

export default PlaceSearch;
