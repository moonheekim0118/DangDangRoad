import React, { useState, useCallback } from 'react';
import { ImageCarousel, ImageUploader } from 'components/Image';
import { useModal } from 'hooks';
import { Icon } from 'components/ui';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { POST_IMAGE_LIMIT } from 'common/constant/number';
import * as S from './style';

interface Props {
  /** image url List for Preview */
  imageList: string[];
  /** funciton to remove image with specific index */
  imageRemoveHanlder: (index: number) => () => void;
  /** function to upload image */
  imageUrlChangeHandler: (images: string[]) => void;
}

const ImagePreview = ({
  imageList,
  imageUrlChangeHandler,
  imageRemoveHanlder,
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
    <S.Container>
      {imageList.length < POST_IMAGE_LIMIT && (
        <S.ImageContainer>
          <ImageUploader
            imageUrl={imageList}
            imageUrlChangeHandler={imageUrlChangeHandler}
            imageLimit={POST_IMAGE_LIMIT}
            type="add">
            <S.ImagePlusButton>
              <Icon icon={faPlus} size="large" style={S.iconStyle} />
            </S.ImagePlusButton>
          </ImageUploader>
        </S.ImageContainer>
      )}
      {imageList &&
        imageList.map((v, i) => (
          <S.ImageContainer key={v + i}>
            <S.Image src={v} onClick={imageZoomHanlder(i)} />
            <S.RemoveImage>
              {' '}
              <Icon
                icon={faTrashAlt}
                size="large"
                style={S.iconStyleWhite}
                onClick={imageRemoveHanlder(i)}
              />
            </S.RemoveImage>
          </S.ImageContainer>
        ))}
      <ImageCarousel
        imageList={imageList}
        startIdx={startIndex}
        showModal={showCarousel}
        modalHanlder={carousleHandler}
      />
    </S.Container>
  );
};

export default ImagePreview;
