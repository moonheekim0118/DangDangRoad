import React from 'react';
import Image from 'next/image';
import {
  EXAMPLE_DOG_IMAGE,
  EXAMPLE_DOG_IMAGE_ALT,
} from 'common/constant/images';
import * as S from './style';

export interface Props {
  show: 'show' | 'hide' | '';
}

const PostExample = ({ show }: Props) => {
  return (
    <S.Container>
      <S.Title css={S.getAnimations('title', show)}>
        오늘 산책 어디로 떠나실래요?
      </S.Title>
      <S.ImageContainer
        css={S.getAnimations('image', show)}
        title="안녕하세요 개발자의 반려견 부기입니다">
        <Image
          src={EXAMPLE_DOG_IMAGE}
          alt={EXAMPLE_DOG_IMAGE_ALT}
          width={350}
          height={350}
        />
      </S.ImageContainer>
      <S.ContentsCotnainer>
        <S.TextContainer css={S.getAnimations('first', show)}>
          <S.ContentsTitle>🌼 우리애기 꽃길만 걷게해주세요</S.ContentsTitle>
          오늘 반려견과의 탐험지를 댕댕로드에서 찾아보세요
        </S.TextContainer>
        <S.TextContainer css={S.getAnimations('second', show)}>
          <S.ContentsTitle>📍 지도로 더 정확하게 찾아가세요</S.ContentsTitle>
          지도를 통해서 정확한 장소를 알려드려요
        </S.TextContainer>
        <S.TextContainer css={S.getAnimations('third', show)}>
          <S.ContentsTitle>💛 반려견과의 추억을 공유해요</S.ContentsTitle>
          사진과 글로 애기와의 추억을 공유해주세요
        </S.TextContainer>
      </S.ContentsCotnainer>
    </S.Container>
  );
};

export default PostExample;
