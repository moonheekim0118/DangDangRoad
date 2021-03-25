import React from 'react';
import { useLazyLoadImage } from 'hooks';
import { Icon } from 'components/ui';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { DEFAULT_IMAGE_URL } from 'common/constant/images';
import * as S from './style';

interface Props {
  /** onClick for this component */
  previewClickHanlder: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** thumNail image */
  thumnail: string | null;
  /** place name to be shown in Preview */
  placeName: string;
}

const Preview = ({ previewClickHanlder, thumnail, placeName }: Props) => {
  const [imageSrc, imageRef] = useLazyLoadImage(thumnail || DEFAULT_IMAGE_URL);

  return (
    <S.Post onClick={previewClickHanlder}>
      <S.Overlay>
        <S.Description>
          <S.PlaceName>{placeName}</S.PlaceName>
          <div>
            <Icon icon={faComment} size="large" /> 12
          </div>
        </S.Description>
      </S.Overlay>
      <S.Image
        src={imageSrc}
        ref={imageRef}
        loaded={imageSrc.length > 0}
        loading="lazy"
      />
    </S.Post>
  );
};

export default Preview;
