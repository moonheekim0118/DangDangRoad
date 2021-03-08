import React from 'react';
import PrevNextButton from 'components/ui/PrevNextButton';
import { useImageSlide } from 'hooks';
import * as S from './style';

interface Props {
  /** list of image url */
  imageList: string[];
}

const ImageSlider = ({ imageList }: Props) => {
  const data = useImageSlide({ totalSlide: imageList.length });

  return (
    <S.Container>
      <S.Slide ref={data.slideRef}>
        {imageList.map((img) => (
          <S.Image src={img} key={img} />
        ))}
      </S.Slide>
      <PrevNextButton
        prevHandler={data.toPrev}
        hasPrev={data.index > 0}
        nextHandler={data.toNext}
        hasNext={data.index < imageList.length - 1}
        location={0}
      />
      <S.NavigatorContainer>
        {imageList.map((_, i) => (
          <S.Navigator
            key={i}
            onClick={data.changeIndexHandler(i)}
            current={i === data.index}
          />
        ))}
      </S.NavigatorContainer>
    </S.Container>
  );
};

export default ImageSlider;
