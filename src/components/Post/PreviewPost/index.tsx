import React, { memo } from 'react';
import { useLazyLoadImage } from 'hooks';
import { Icon } from 'components/UI';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { DEFAULT_IMAGE_URL, REVIEW_IMAGE_ALT } from 'common/constant/images';
import * as S from './style';

interface Props {
  /** onClick for this component */
  previewClickHanlder: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** thumNail image */
  thumnail: string | null;
  /** place name to be shown in Preview */
  placeName: string;
  /** comments Length */
  commentsLength?: number;
}

const Preview = ({
  previewClickHanlder,
  thumnail,
  placeName,
  commentsLength = 0,
}: Props): React.ReactElement => {
  const [imageSrc, imageRef] = useLazyLoadImage(thumnail || DEFAULT_IMAGE_URL);

  return (
    <S.Post onClick={previewClickHanlder}>
      <S.Overlay>
        <S.Description>
          <S.PlaceName>{placeName}</S.PlaceName>
          <S.CommentsInfoContainer>
            <Icon icon={faComment} size="large" />
            {commentsLength}
          </S.CommentsInfoContainer>
        </S.Description>
      </S.Overlay>
      <S.Image
        src={imageSrc}
        ref={imageRef}
        alt={REVIEW_IMAGE_ALT}
        loaded={imageSrc.length > 0}
        loading="lazy"
      />
    </S.Post>
  );
};

export default memo(Preview);
