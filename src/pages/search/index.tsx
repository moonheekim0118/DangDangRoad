import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from 'hooks';
import { WriteButton, PostList } from 'components/Post';
import Router from 'next/router';
import { ReviewData } from 'types/API';
import Modal from 'components/Modal';
import useUser from 'libs/useUser';
import api from 'api';

export async function getStaticProps() {
  return {
    props: {
      reviews: await api.getReviewsFirst(),
    },
  };
}

const SearchMain = ({ reviews }) => {
  const { user } = useUser();
  const [data, setData] = useState(reviews.data); // store review Data
  const [mode, setMode] = useState<string | string[] | undefined>();
  const [showSinglePostModal, singlePostModalHanlder] = useModal(false);

  // set Initially, query of path as Mode state
  useEffect(() => {
    const query = Router.query.mode;
    setMode(query);
    // 전체 게시글 가져오기
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

  return (
    <>
      <PostList reviewData={data.reviews} />
      {user && user.isLoggedIn && <WriteButton />}
    </>
  );
};

export default SearchMain;
