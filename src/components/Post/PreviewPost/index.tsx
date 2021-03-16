import React from 'react';
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
      <S.Image src={thumnail || DEFAULT_IMAGE_URL} />
    </S.Post>
  );
};

export default Preview;
