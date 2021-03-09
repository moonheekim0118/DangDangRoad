import React, { useRef, useCallback } from 'react';
import SearchBar from 'components/ui/SearchBar';
import { REVIEW_SEARCH_PLACEHODLER } from 'common/constant/string';
import { InputRef, inputDefaultRef } from 'types/Ref';
import routes from 'common/constant/routes';
import Router from 'next/router';

const PlaceSearch = () => {
  const keywordRef = useRef<InputRef>(inputDefaultRef());

  const submitHandler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      const keyword = keywordRef.current.value;
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
