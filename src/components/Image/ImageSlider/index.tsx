import React from 'react';
import styled from '@emotion/styled';
import { useImageSlide } from 'hooks';
import { Icon } from 'atoms';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  imageList: string[];
}

const ImageSlider = ({ imageList }: Props) => {
  const data = useImageSlide({ totalSlide: imageList.length });

  return (
    <Container>
      <Slide ref={data.slideRef}>
        {imageList.map((img) => (
          <Image src={img} />
        ))}
      </Slide>
      {data.index > 0 && (
        <Move left={true}>
          <Icon
            color="white"
            icon={faChevronLeft}
            iconsize={35}
            iconClickHandler={data.toPrev}
            cursor="pointer"
          />
        </Move>
      )}
      {data.index < imageList.length - 1 && (
        <Move>
          <Icon
            color="white"
            icon={faChevronRight}
            iconsize={35}
            iconClickHandler={data.toNext}
            cursor="pointer"
          />
        </Move>
      )}
      <NavigatorContainer>
        {imageList.map((_, i) => (
          <Navigator
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

const Move = styled.div<{ left?: boolean }>`
  display: grid;
  place-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left && '0px'};
  right: ${(props) => !props.left && '0px'};
  z-index: 7000;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const NavigatorContainer = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100px;
  display: flex;
  justify-content: space-between;
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
