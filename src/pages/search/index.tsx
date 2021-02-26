import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from 'hooks';
import { WriteButton } from 'components/Post';
import Router from 'next/router';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import useUser from 'libs/useUser';

const SearchMain = () => {
  const { user } = useUser();

  const [mode, setMode] = useState<string | string[] | undefined>();
  const [showSinglePostModal, singlePostModalHanlder] = useModal(false);

  // set Initially, query of path as Mode state
  useEffect(() => {
    const query = Router.query.mode;
    setMode(query);
  }, []);

  // depended on Mode state
  useEffect(() => {
    if (mode === 'singlePost') singlePostModalHanlder();
    // qeury 에 적힌 id 값에 해당하는 게시글 가져와서 모달 컨텐츠로 만들어주기.
  }, [mode]);

  // single Post mode close Handler
  const singlePostModeCloseHanlder = useCallback(() => {
    singlePostModalHanlder();
    Router.back();
  }, [showSinglePostModal]);

  return user ? <>{user.isLoggedIn && <WriteButton />}</> : <Loading />;
};

export default SearchMain;
