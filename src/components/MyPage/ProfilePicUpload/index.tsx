import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Icon, Avatar } from 'atoms';
import { ImageUploader } from 'components/image';
import { RefType } from 'types/Ref';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

interface Props {
  initImageUrl: string;
}

const ProfilePicUpload = (
  { initImageUrl }: Props,
  ref: React.Ref<RefType<string[]>>
) => {
  const [imageUrl, setImageUrl] = useState<string[]>([initImageUrl]);
  useImperativeHandle(ref, () => ({ value: imageUrl }), [imageUrl]);

  const imageUrlChangeHandler = useCallback((url: string[]) => {
    setImageUrl(url);
  }, []);

  return (
    <div>
      <ImageUploader
        imageUrl={imageUrl}
        imageUrlChangeHandler={imageUrlChangeHandler}
        imageLimit={1}
        type="new">
        <S.AvatarEditor />
        <S.IconContainer>
          <Icon icon={faPlus} className="uploadIcon" css={S.iconStyle} />
        </S.IconContainer>
        <Avatar imageUrl={imageUrl[0]} size="large" />
      </ImageUploader>
    </div>
  );
};

export default forwardRef(ProfilePicUpload);
