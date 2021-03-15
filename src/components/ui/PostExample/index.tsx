import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  EXAMPLE_DOG_IMAGE,
  EXAMPLE_DOG_IMAGE_ALT,
} from 'common/constant/images';
import * as S from './style';

interface Props {
  show: boolean;
}

const PostExample = ({ show }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const firstBoxRef = useRef<HTMLDivElement>(null);
  const secondBoxRef = useRef<HTMLDivElement>(null);
  const thirdBoxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (
      imageRef.current &&
      titleRef.current &&
      firstBoxRef.current &&
      secondBoxRef.current &&
      thirdBoxRef.current
    ) {
      if (show) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transition = 'all 1.8s ease-in-out';
        imageRef.current.style.transform = `translateX(300px)`;
        imageRef.current.style.transition = 'all 2s ease-in-out';
        imageRef.current.style.opacity = '1';
        firstBoxRef.current.style.opacity = '1';
        firstBoxRef.current.style.transform = `translateX(-300px)`;
        firstBoxRef.current.style.transition =
          'transform 2.5s ease-in-out,opacity 2.5s ease-in-out,top ease 0.5s';
        secondBoxRef.current.style.opacity = '1';
        secondBoxRef.current.style.transform = `translateX(-300px)`;
        secondBoxRef.current.style.transition =
          'transform 3.0s ease-in-out,opacity 2.5s ease-in-out,top ease 0.5s';
        thirdBoxRef.current.style.opacity = '1';
        thirdBoxRef.current.style.transform = `translateX(-300px)`;
        thirdBoxRef.current.style.transition =
          'transform 3.5s ease-in-out,opacity 2.5s ease-in-out,top ease 0.5s';
      } else {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transition = 'all 1.8s ease-in-out';
        imageRef.current.style.transform = `translateX(-300px)`;
        imageRef.current.style.transition = 'all 2s ease-in-out';
        imageRef.current.style.opacity = '0';
        firstBoxRef.current.style.opacity = '0';
        firstBoxRef.current.style.transform = `translateX(+300px)`;
        firstBoxRef.current.style.transition =
          'transform 2.5s ease-in-out,opacity 2.5s ease-in-out';
        secondBoxRef.current.style.opacity = '0';
        secondBoxRef.current.style.transform = `translateX(+300px)`;
        secondBoxRef.current.style.transition =
          'transform 3.0s ease-in-out,opacity 2.5s ease-in-out';
        thirdBoxRef.current.style.opacity = '0';
        thirdBoxRef.current.style.transform = `translateX(+300px)`;
        thirdBoxRef.current.style.transition =
          'transform 3.5s ease-in-out,opacity 2.5s ease-in-out';
      }
    }
  }, [show]);

  return (
    <S.Container>
      <S.Title ref={titleRef}>오늘 산책 어디로 떠나실래요?</S.Title>
      <S.ImageContainer
        ref={imageRef}
        title="안녕하세요 개발자의 반려견 부기입니다">
        <Image
          src={EXAMPLE_DOG_IMAGE}
          alt={EXAMPLE_DOG_IMAGE_ALT}
          width={350}
          height={350}
        />
      </S.ImageContainer>
      <S.ContentsCotnainer>
        <S.TextContainer ref={firstBoxRef}>
          <S.ContentsTitle>🌼 우리애기 꽃길만 걷게해주세요</S.ContentsTitle>
          오늘 반려견과의 탐험지를 댕댕로드에서 찾아보세요
        </S.TextContainer>
        <S.TextContainer ref={secondBoxRef}>
          <S.ContentsTitle>📍 지도로 더 정확하게 찾아가세요</S.ContentsTitle>
          지도를 통해서 정확한 장소를 알려드려요
        </S.TextContainer>
        <S.TextContainer ref={thirdBoxRef}>
          <S.ContentsTitle>💛 반려견과의 추억을 공유해요</S.ContentsTitle>
          사진과 글로 애기와의 추억을 공유해주세요
        </S.TextContainer>
      </S.ContentsCotnainer>
    </S.Container>
  );
};

export default PostExample;
