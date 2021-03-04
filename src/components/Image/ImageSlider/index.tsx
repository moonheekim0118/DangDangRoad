import React from 'react';
import styled from '@emotion/styled';
import PrevNextButton from 'components/ui/PrevNextButton';
import { useImageSlide } from 'hooks';

interface Props {
  /** list of image url */
  imageList: string[];
}

const ImageSlider = ({ imageList }: Props) => {
  const data = useImageSlide({ totalSlide: imageList.length });

  return (
    <Container>
      <Slide ref={data.slideRef}>
        {imageList.map((img) => (
          <Image src={img} key={img} />
        ))}
      </Slide>
      <PrevNextButton
        prevHandler={data.toPrev}
        hasPrev={data.index > 0}
        nextHandler={data.toNext}
        hasNext={data.index < imageList.length - 1}
        location={0}
      />
      <NavigatorContainer>
        {imageList.map((_, i) => (
          <Navigator
            key={i}
            onClick={data.changeIndexHandler(i)}
            current={i === data.index}
          />
        ))}
      </NavigatorContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Image = styled.img`
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;
  background-color: black;
`;

const NavigatorContainer = styled.div`
  position: absolute;
  bottom: 25px;
  width: 30%;
  display: flex;
  justify-content: center;
  gap: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 7000;
`;

const Navigator = styled.div<{ current: boolean }>`
  &::after {
    content: ' ';
    position: absolute;
    display: inline-block;
    top: 0px;
    width: 15px;
    height: 15px;
    background-color: ${(props) =>
      props.current ? '#fff' : 'rgba(244, 244, 244,0.6)'};
    border-radius: 50%;
    cursor: pointer;
  }
`;

export default ImageSlider;
