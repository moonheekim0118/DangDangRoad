import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from 'hooks';
import Modal from 'components/Modal';
import WriteButton from 'components/WriteButton';
import TagContainer from 'components/TagContainer';
import Router from 'next/router';
import Preview from 'components/Preview';

const SearchMain = () => {
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
  }, [mode]);

  // back to initial path
  const backToInitial = useCallback(() => {
    window.history.replaceState(null, '', '/search');
    setMode(undefined); // setMode to undefined
  }, []);

  // single Post mode close Handler
  const singlePostModeCloseHanlder = useCallback(() => {
    singlePostModalHanlder();
    backToInitial();
  }, [showSinglePostModal]);

  // single Post Open handler
  const singlePostOpenHanlder = useCallback(() => {
    setMode('singlePost');
    window.history.replaceState(null, '', '/search?mode=singlePost');
  }, []);

  return (
    <>
      <TagContainer />
      <WriteButton />
      <Preview openPostModal={singlePostOpenHanlder} />
      <Modal
        showModal={showSinglePostModal}
        modalHandler={singlePostModeCloseHanlder}>
        우히히zz
      </Modal>
    </>
  );
};

export default SearchMain;