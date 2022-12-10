import { Loading } from 'components/UI';
import ContentLoader from 'react-content-loader';
import * as S from './style';

const LoadingSinglePost = (): React.ReactElement => {
  return (
    <>
      <ContentLoader width="100%" height="100%" css={S.contentsLoaderStyle}>
        <rect x="5%" y="50" rx="0" ry="0" width="calc(100%/4)" height="80%" />
        <circle cx="40%" cy="100" r="48" />
        <rect x="35%" y="200" rx="0" ry="0" width="calc(100%/4)" height="50%" />
        <rect x="45%" y="80" rx="4" ry="4" width="150" height="6" />
        <rect x="46%" y="100" rx="3" ry="3" width="100" height="6" />
        <rect x="67%" y="50" rx="0" ry="0" width="calc(100%/4)" height="80%" />
      </ContentLoader>
      <S.LoaderContainer>
        <Loading />
      </S.LoaderContainer>
    </>
  );
};

export default LoadingSinglePost;
