import React, { useState, useCallback } from 'react';
import { ImageCarousel } from 'components/image';
import { useModal } from 'hooks';
import { Icon } from 'atoms';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { POST_IMAGE_LIMIT } from 'common/constant/number';
import * as S from './style';

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
    <S.Container>
      {imageList.length < POST_IMAGE_LIMIT && (
        <S.ImagePlusButton>
          <Icon
            icon={faPlus}
            className="addImgIcon"
            css={S.iconStyle}
            onClick={uploaderClickHanlder}
          />
          <input
            type="file"
            multiple
            name="image"
            hidden
            ref={imageInput}
            onChange={imageUploadHanlder}
          />
        </S.ImagePlusButton>
      )}
      {imageList &&
        imageList.map((v, i) => (
          <S.ImageContainer key={v + i}>
            <S.Image src={v} onClick={imageZoomHanlder(i)} />
            <S.RemoveImage>
              {' '}
              <Icon
                icon={faTrashAlt}
                className="removeImgIcon"
                css={S.iconStyleWhite}
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
