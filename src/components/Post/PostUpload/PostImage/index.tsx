import React, { forwardRef, useImperativeHandle } from 'react';
import { useHandleImage } from 'hooks';
import { ImageUploader, ImagePreview } from 'components/Image';
import { IMAGE_UPLOAD_LABEL, IMAGE_UPLOAD_DESC } from 'common/constant/string';
import { POST_IMAGE_LIMIT } from 'common/constant/number';
import { RefType } from 'types/Ref';
import * as S from './style';

interface Props {
  initialImageUrl: string[];
}

const PostImage = (
  { initialImageUrl }: Props,
  ref: React.Ref<RefType<string[]>>
): React.ReactElement => {
  const [imageUrl, imageUrlChangeHandler, imageRemoveHanlder] = useHandleImage(
    initialImageUrl
  );

  useImperativeHandle(ref, () => ({ value: imageUrl }), [imageUrl]);

  return (
    <>
      {imageUrl.length <= 0 ? (
        <ImageUploader
          imageUrl={imageUrl}
          imageUrlChangeHandler={imageUrlChangeHandler}
          imageLimit={POST_IMAGE_LIMIT}
          type="new">
          <S.UploadImageButton>
            <p>{IMAGE_UPLOAD_LABEL}</p>
            <p>{IMAGE_UPLOAD_DESC}</p>
          </S.UploadImageButton>
        </ImageUploader>
      ) : (
        <ImagePreview
          imageList={imageUrl}
          imageUrlChangeHandler={imageUrlChangeHandler}
          imageRemoveHanlder={imageRemoveHanlder}
        />
      )}
    </>
  );
};

export default forwardRef(PostImage);
