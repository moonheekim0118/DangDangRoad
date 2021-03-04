import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { ImageCarousel } from 'components/image';
import { useModal } from 'hooks/common';
import { Icon } from 'atoms';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { colorCode } from 'common/style/color';
import { POST_IMAGE_LIMIT } from 'common/constant/number';

interface Props {
  /** image url List for Preview */
  imageList: string[];
  /** this is for uploading image */
  imageInput: React.RefObject<HTMLInputElement>;
  /** to pop up file uploader */
  uploaderClickHanlder: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => void;
  /** funciton to remove image with specific index */
  imageRemoveHanlder: (index: number) => () => void;
  /** function to upload image */
  imageUploadHanlder: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImagePreview = ({
  imageList,
  imageInput,
  uploaderClickHanlder,
  imageRemoveHanlder,
  imageUploadHanlder,
}: Props) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [showCarousel, carousleHandler] = useModal(false);

  const imageZoomHanlder = useCallback(
    (index: number) => () => {
      setStartIndex(index);
      carousleHandler();
    },
    [showCarousel, startIndex]
  );

  return (
    <Container>
      {imageList.length < POST_IMAGE_LIMIT && (
        <ImagePlusButton>
          <Icon
            icon={faPlus}
            iconsize={25}
            color="blue"
            iconClickHandler={uploaderClickHanlder}
          />
          <input
            type="file"
            multiple
            name="image"
            hidden
            ref={imageInput}
            onChange={imageUploadHanlder}
          />
        </ImagePlusButton>
      )}
      {imageList &&
        imageList.map((v, i) => (
          <ImageContainer key={v + i}>
            <Image src={v} onClick={imageZoomHanlder(i)} />
            <RemoveImage>
              {' '}
              <Icon
                icon={faTrashAlt}
                iconsize={25}
                color="white"
                iconClickHandler={imageRemoveHanlder(i)}
              />
            </RemoveImage>
          </ImageContainer>
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

const ImageContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const RemoveImage = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

export default ImagePreview;
