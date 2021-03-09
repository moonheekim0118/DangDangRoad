import React from 'react';
import { ReviewData } from 'types/API';
import { NavigationInfo } from 'types/Navigation';
import { useLoginInfoState } from 'context/LoginInfo';
import { Button } from 'atoms';
import { WriterInfo } from 'components/post';
import {
  PARKING_LOT_CAPTION,
  OFFLEASH_CAPTION,
  RECOMMENDATION_CAPTION,
  UPDATE_BUTTON_CAPTION,
  DELETE_BUTTON_CAPTION,
} from 'common/constant/string';
import routes from 'common/constant/routes';
import PrevNextButton from 'components/ui/PrevNextButton';
import { ImageSlider } from 'components/image';
import { BasicMap } from 'components/map';
import * as S from './style';

interface Props {
  /** single Review Data */
  data: ReviewData;
  /** Navigation info */
  NavigationInfo?: NavigationInfo;
  /** remove Handler */
  removeHanlder: (
    id: string
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SinglePost = ({ data, NavigationInfo, removeHanlder }: Props) => {
  const { userId } = useLoginInfoState();

  return (
    <>
      <S.Contents>
        <S.InfoContainer>
          <S.PlaceName>{data.placeInfo.place_name}</S.PlaceName>
          <S.PlaceDetail>{data.placeInfo.address_name}</S.PlaceDetail>
          <BasicMap coordX={data.placeInfo.x} coordY={data.placeInfo.y} />
          <S.CommonInfoContainer>
            <S.CommonInfo>
              {PARKING_LOT_CAPTION}
              {data.hasParkingLot}
            </S.CommonInfo>
            <S.CommonInfo>
              {OFFLEASH_CAPTION}
              {data.hasOffLeash}
            </S.CommonInfo>
            <S.CommonInfo>
              {RECOMMENDATION_CAPTION}
              {data.recommendation}
            </S.CommonInfo>
          </S.CommonInfoContainer>
        </S.InfoContainer>
        {data.imageList && (
          <S.InfoContainer>
            <ImageSlider imageList={data.imageList} />
          </S.InfoContainer>
        )}
        <S.InfoContainer>
          <WriterInfo userData={data.userData} createdAt={data.createdAt} />
          <S.FreeCommentContainer>{data.freeText}</S.FreeCommentContainer>
          {data.userId === userId && (
            <>
              <Button
                href={`${routes.UPDATE_POST}/${data.docId}`}
                linkStyle={S.updateButtonStyle}>
                {UPDATE_BUTTON_CAPTION}
              </Button>
              <Button
                className="deleteBtn"
                css={S.deleteButtonStyle}
                onClick={removeHanlder(data.docId)}>
                {DELETE_BUTTON_CAPTION}
              </Button>
            </>
          )}
        </S.InfoContainer>
      </S.Contents>
      {NavigationInfo && <PrevNextButton {...NavigationInfo} />}
    </>
  );
};

export default SinglePost;
