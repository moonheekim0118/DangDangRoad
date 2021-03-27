import React, { forwardRef, useImperativeHandle } from 'react';
import { Icon, Avatar } from 'components/ui';
import { useHandleImage } from 'hooks';
import { ImageUploader } from 'components/Image';
import { RefType } from 'types/Ref';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

interface Props {
  initImageUrl: string;
}

const ProfilePicUpload = (
  { initImageUrl }: Props,
  ref: React.Ref<RefType<string[]>>
): React.ReactElement => {
  const [imageUrl, imageUrlChangeHandler] = useHandleImage([initImageUrl]);
  useImperativeHandle(ref, () => ({ value: imageUrl }), [imageUrl]);

  return (
    <div>
      <ImageUploader
        imageUrl={imageUrl}
        imageUrlChangeHandler={imageUrlChangeHandler}
        imageLimit={1}
        type="new">
        <S.AvatarEditor />
        <S.IconContainer>
          <Icon icon={faPlus} size="large" style={S.iconStyle} />
        </S.IconContainer>
        <Avatar imageUrl={imageUrl[0]} size="large" />
      </ImageUploader>
    </div>
  );
};

export default forwardRef(ProfilePicUpload);
