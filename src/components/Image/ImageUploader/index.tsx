import React, { useEffect, useCallback, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { Loading } from 'components/ui';
import { uploadImage } from 'api/storage';
import { showError } from 'action';
import { IMAGE_LIMIT_ERROR } from 'common/constant/string';
import { Container } from './style';

interface Props {
  /** image Url list (state)  */
  imageUrl: string[];
  /** image Url change Hanlder */
  imageUrlChangeHandler: (images: string[]) => void;
  /** uploadable image's number */
  imageLimit: number;
  /** children */
  children: React.ReactNode;
  /** image uploader type */
  type: 'add' | 'new';
}

const ImageUploader = ({
  imageUrl,
  imageUrlChangeHandler,
  imageLimit,
  children,
  type,
}: Props): React.ReactElement => {
  const dispatch = useNotificationDispatch();
  const [
    imageUploadResult,
    imageUploadFetch,
    imageUploadSetDefault,
  ] = useApiFetch<string[]>(uploadImage);
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    switch (imageUploadResult.type) {
      case SUCCESS:
        if (imageUploadResult.data) {
          imageUrl.length + imageUploadResult.data.length <= imageLimit
            ? imageUrlChangeHandler(imageUrl.concat(imageUploadResult.data))
            : imageUrlChangeHandler(imageUploadResult.data);
        }
        imageUploadSetDefault();
        break;
      case FAILURE:
        dispatch(showError(imageUploadResult.error));
    }
  }, [imageUploadResult]);

  const uploaderClickHanlder = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  /** Upload Image Handler */
  const uploadImageHanlder = useCallback(
    (e) => {
      const files = e.target.files;
      const length =
        type === 'add' ? files.length + imageUrl.length : imageUrl.length;
      if (length > imageLimit) {
        return dispatch(showError(IMAGE_LIMIT_ERROR(imageLimit)));
      }
      imageUploadFetch({ type: REQUEST, params: [files] });
    },
    [imageUrl]
  );

  return (
    <Container onClick={uploaderClickHanlder}>
      {imageUploadResult.type === REQUEST ? (
        <Loading size="medium" />
      ) : (
        children
      )}
      <input
        type="file"
        multiple
        name="image"
        hidden
        ref={imageInput}
        onChange={uploadImageHanlder}
      />
    </Container>
  );
};

export default ImageUploader;
