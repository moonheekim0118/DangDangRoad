import { useEffect, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { Loading } from 'components/UI';
import { uploadImage } from 'api/storage';
import { showError } from 'action';
import { IMAGE_LIMIT_ERROR } from 'common/constant/string';
import { Container } from './style';

interface Props {
  /** image Url list (state)  */
  imageUrl: string[];
  /** image Url change Hanlder */
  onChangeUrl: (images: string[]) => void;
  /** uploadable image's number */
  imageLimit: number;
  /** children */
  children: React.ReactNode;
  /** image uploader type */
  type: 'add' | 'new';
}

const ImageUploader = ({
  imageUrl,
  onChangeUrl,
  imageLimit,
  children,
  type,
}: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [result, dispatch] = useApiFetch<string[]>(uploadImage);
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    switch (result.type) {
      case SUCCESS:
        if (result.data) {
          imageUrl.length + result.data.length <= imageLimit
            ? onChangeUrl(imageUrl.concat(result.data))
            : onChangeUrl(result.data);
        }
        return;
      case FAILURE:
        notiDispatch(showError(result.error));
        return;
    }
  }, [result]);

  const handleClick = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const handleUploadImage = (e) => {
    const files = e.target.files;
    const length =
      type === 'add' ? files.length + imageUrl.length : imageUrl.length;
    if (length > imageLimit) {
      return notiDispatch(showError(IMAGE_LIMIT_ERROR(imageLimit)));
    }
    dispatch({ type: REQUEST, params: [files] });
  };

  return (
    <Container onClick={handleClick}>
      {result.type === REQUEST ? <Loading size="medium" /> : children}
      <input
        type="file"
        multiple
        name="image"
        hidden
        ref={imageInput}
        onChange={handleUploadImage}
      />
    </Container>
  );
};

export default ImageUploader;
