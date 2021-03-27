import React from 'react';
import { useUser, useWarnUsavedChange } from 'hooks';
import { Loading } from 'components/ui';
import Head from 'next/head';
import routes from 'common/constant/routes';
import dynamic from 'next/dynamic';

const WritePost = dynamic(() => import('components/Post/PostUpload/WritePost'));

const Write = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  useWarnUsavedChange(routes.SEARCH);
  return user && user.isLoggedIn ? (
    <>
      <Head>
        <title>댕댕로드 | 리뷰작성</title>
      </Head>
      <WritePost userId={user.userId} />
    </>
  ) : (
    <Loading />
  );
};

export default Write;
