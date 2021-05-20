import React, { useState, useCallback } from 'react';
import { ImageUploader } from 'components/Image';
import { useModal } from 'hooks';
import { Icon } from 'components/UI';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { POST_IMAGE_LIMIT } from 'common/constant/number';
import { REVIEW_IMAGE_ALT } from 'common/constant/images';
import * as S from './style';
import dynamic from 'next/dynamic';

const ImageCarousel = dynamic(() => import('components/Image/ImageCarousel'));

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
}: Props): React.ReactElement => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [showCarousel, carousleHandler] = useModal(false);

  const handleClick = useCallback(
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
        imageList.map((image, index) => (
          <S.ImageContainer key={image + index}>
            <S.Image
              src={image}
              onClick={handleClick(index)}
              alt={REVIEW_IMAGE_ALT}
            />
            <S.RemoveImage>
              {' '}
              <Icon
                icon={faTrashAlt}
                size="large"
                style={S.iconStyleWhite}
                onClick={imageRemoveHanlder(index)}
              />
            </S.RemoveImage>
          </S.ImageContainer>
        ))}
      {showCarousel && (
        <ImageCarousel
          imageList={imageList}
          startIdx={startIndex}
          modalHanlder={carousleHandler}
        />
      )}
    </S.Container>
  );
};

export default ImagePreview;
