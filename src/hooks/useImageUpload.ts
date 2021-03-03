import { useEffect, useCallback, useRef, useState } from 'react';
import useApiFetch, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiFetch';
import { uploadImage } from 'api/storage';
import { showError } from 'action';

interface Props {
  /** initial image list */
  initialImages: string[];
  /** uploadable image's number */
  imageLimit: number;
  /** dispatch for alert */
  dispatch: React.Dispatch<any>;
}

const useImageUpload = ({ initialImages, imageLimit, dispatch }: Props) => {
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<string[]>(
    uploadImage
  );
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string[]>(initialImages || []);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        if (fetchResult.data) {
          imageUrl.length + fetchResult.data.length <= imageLimit
            ? setImageUrl(imageUrl.concat(fetchResult.data))
            : setImageUrl(fetchResult.data);
        }
        setDefault();
        break;
      case FAILURE:
        dispatch(showError(fetchResult.error));
    }
  }, [fetchResult]);

  const uploaderClickHanlder = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  /** Upload Image Handler */
  const uploadImageHanlder = useCallback(
    (type: 'new' | 'add') => (e) => {
      const files = e.target.files;
      const length =
        type === 'add' ? files.length + imageUrl.length : imageUrl.length;
      if (length > imageLimit) {
        return dispatch(
          showError(`이미지는 최대 ${imageLimit}장까지 업로드 가능합니다.`)
        );
      }
      fetchDispatch({ type: REQUEST, params: [files] });
    },
    [imageUrl]
  );

  /** remove Image Handler from imageList by Its index */
  const removeImageHanlder = useCallback(
    (index: number) => () => {
      const filtered = imageUrl.filter((_, i) => i !== index);
      setImageUrl(filtered);
    },
    [imageUrl]
  );

  return [
    imageInput,
    imageUrl,
    uploaderClickHanlder,
    uploadImageHanlder,
    removeImageHanlder,
  ] as const;
};

export default useImageUpload;
