import React from 'react';
import { ControllerBtn } from 'components/UI';
import { useSlide } from 'hooks';
import { REVIEW_IMAGE_ALT } from 'common/constant/images';
import * as S from './style';

interface Props {
  /** list of image url */
  imageList: string[];
}

const ImageSlider = ({ imageList }: Props): React.ReactElement => {
  const controller = useSlide({ totalSlide: imageList.length });

  return (
    <S.Container>
      <S.Slide ref={controller.slideRef}>
        {imageList.map((img) => (
          <S.Image src={img} key={img} alt={REVIEW_IMAGE_ALT} />
        ))}
      </S.Slide>
      <ControllerBtn
        prevHandler={controller.toPrev}
        hasPrev={controller.index > 0}
        nextHandler={controller.toNext}
        hasNext={controller.index < imageList.length - 1}
        location={0}
      />
      <S.NavigatorContainer>
        {imageList.map((_, i) => (
          <S.Navigator
            key={i}
            onClick={controller.changeIndexHandler(i)}
            current={i === controller.index}
          />
        ))}
      </S.NavigatorContainer>
    </S.Container>
  );
};

export default ImageSlider;
