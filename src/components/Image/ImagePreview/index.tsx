import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import ImageCarousel from '../ImageCarousel';
import { useModal } from 'hooks';
import { Icon } from 'atoms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { colorCode } from 'types/Color';

interface Props {
  imageList: string[];
  imageClickHandler?: () => void;
  imageUploadHanlder?: () => void;
}

const ImagePreview = ({
  imageList,
  imageClickHandler,
  imageUploadHanlder,
}: Props) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [showCarousel, carousleHandler] = useModal(false);

  const imageZoomHanlder = useCallback(
    (index: number) => () => {
      console.log(index);
      setStartIndex(index);
      carousleHandler();
    },
    [showCarousel, startIndex]
  );

  return (
    <Container>
      {imageList.length < 3 && (
        <ImagePlusButton>
          <Icon icon={faPlus} iconsize={25} color="blue" />
        </ImagePlusButton>
      )}
      {imageList &&
        imageList.map((v, i) => (
          <Image src={v} key={v + i} onClick={imageZoomHanlder(i)} />
        ))}
      <ImageCarousel
        imageList={imageList}
        startIdx={startIndex}
        showModal={showCarousel}
        modalHanlder={carousleHandler}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;
`;

const ImagePlusButton = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: grid;
  place-items: center;
  background-color: ${colorCode['light-gray']};
  cursor: pointer;
`;

const Image = styled.img`
  width: calc(100% / 3);
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export default ImagePreview;
