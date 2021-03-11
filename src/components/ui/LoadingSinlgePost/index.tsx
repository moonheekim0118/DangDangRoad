import React from 'react';
import Loading from 'components/ui/Loading';
import ContentLoader from 'react-content-loader';
import * as S from './style';

const LoadingSinglePost = () => {
  return (
    <>
      <ContentLoader
        width="100%"
        height="100%"
        viewBox="0 0 100% 650"
        css={S.contentsLoaderStyle}>
        <rect x="5%" y="50" rx="0" ry="0" width="calc(100%/4)" height="80%" />
        <rect x="35%" y="50" rx="0" ry="0" width="calc(100%/4)" height="80%" />
        <rect x="75%" y="80" rx="4" ry="4" width="254" height="6" />
        <rect x="76%" y="100" rx="3" ry="3" width="201" height="6" />
        <circle cx="71%" cy="100" r="48" />
        <rect x="71%" y="180" rx="0" ry="0" width="calc(100%/4)" height="30%" />
      </ContentLoader>
      <S.LoaderContainer>
        <Loading />
      </S.LoaderContainer>
    </>
  );
};

export default LoadingSinglePost;
