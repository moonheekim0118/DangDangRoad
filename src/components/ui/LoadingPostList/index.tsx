import React from 'react';
import Loading from 'components/ui/Loading';
import ContentLoader from 'react-content-loader';
import * as S from 'components/ui/LoadingSinlgePost/style';

const LoadingPostList = () => {
  return (
    <>
      <ContentLoader width="100%" height="70vh" css={S.contentsLoaderStyle}>
        <rect x="10%" y="20" rx="8" ry="8" width="calc(100%/7)" height="200" />
        <rect x="30%" y="20" rx="8" ry="8" width="calc(100%/7)" height="200" />
        <rect x="50%" y="20" rx="8" ry="8" width="calc(100%/7)" height="200" />
        <rect x="70%" y="20" rx="8" ry="8" width="calc(100%/7)" height="200" />

        <rect x="10%" y="300" rx="8" ry="8" width="calc(100%/7)" height="200" />
        <rect x="30%" y="300" rx="8" ry="8" width="calc(100%/7)" height="200" />
        <rect x="50%" y="300" rx="8" ry="8" width="calc(100%/7)" height="200" />
        <rect x="70%" y="300" rx="8" ry="8" width="calc(100%/7)" height="200" />
      </ContentLoader>
      <S.LoaderContainer>
        <Loading />
      </S.LoaderContainer>
    </>
  );
};

export default LoadingPostList;
