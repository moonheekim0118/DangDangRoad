import Image from 'next/image';
import {
  EXAMPLE_DOG_IMAGE,
  EXAMPLE_DOG_IMAGE_ALT,
} from 'common/constant/images';
import * as S from './style';

export interface Props {
  show: 'show' | 'hide' | '';
}

const HomeDescription = ({ show }: Props): React.ReactElement => {
  const titleDir: 'left' | 'right' = show === 'show' ? 'right' : 'left';
  const descDir: 'left' | 'right' = show === 'show' ? 'left' : 'right';
  return (
    <S.Container>
      <S.Title css={S.calculateAnimation(0, show)}>
        오늘 산책 어디로 떠나실래요?
      </S.Title>
      <S.ImageContainer
        css={S.calculateAnimation(1, show, titleDir)}
        title="안녕하세요 개발자의 반려견 부기입니다">
        <Image
          src={EXAMPLE_DOG_IMAGE}
          alt={EXAMPLE_DOG_IMAGE_ALT}
          width={350}
          height={350}
        />
      </S.ImageContainer>
      <S.ContentsContainer>
        <S.TextContainer css={S.calculateAnimation(2, show, descDir)}>
          <S.ContentsTitle>🌼 강아지들이 꽃길만 걷게해주세요</S.ContentsTitle>
          <span>오늘 반려견과의 탐험지를 댕댕로드에서 찾아보세요</span>
        </S.TextContainer>
        <S.TextContainer css={S.calculateAnimation(3, show, descDir)}>
          <S.ContentsTitle>📍 지도로 더 정확하게 찾아가세요</S.ContentsTitle>
          <span>지도를 통해서 정확한 장소를 알려드려요</span>
        </S.TextContainer>
        <S.TextContainer css={S.calculateAnimation(4, show, descDir)}>
          <S.ContentsTitle>💛 반려견과의 추억을 공유해요</S.ContentsTitle>
          <span>사진과 글로 추억을 공유해주세요</span>
        </S.TextContainer>
      </S.ContentsContainer>
    </S.Container>
  );
};

export default HomeDescription;
