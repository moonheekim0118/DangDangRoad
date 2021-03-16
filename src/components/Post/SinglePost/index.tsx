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
import { ImageSlider } from 'components/image';
import { BasicMap } from 'components/map';
import * as S from './style';
import { PrevNextButton } from 'components/ui';

interface Props {
  /** single Review Data */
  data: ReviewData;
  /** Navigation info */
  NavigationInfo?: NavigationInfo;
  /** remove Handler */
  removeHanlder?: (
    id: string
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SinglePost = ({ data, NavigationInfo, removeHanlder }: Props) => {
  const { userId } = useLoginInfoState();

  return (
    <>
      <S.Container>
        <S.Header>{data.placeInfo.place_name}</S.Header>
        <S.ContentsContainer>
          <S.PlaceName>{data.placeInfo.place_name}</S.PlaceName>
          <S.PlaceDetail>{data.placeInfo.address_name}</S.PlaceDetail>
          <BasicMap coordX={data.placeInfo.x} coordY={data.placeInfo.y} />
          <S.InfoContainer>
            <S.Info>
              {PARKING_LOT_CAPTION}
              {data.hasParkingLot}
            </S.Info>
            <S.Info>
              {OFFLEASH_CAPTION}
              {data.hasOffLeash}
            </S.Info>
            <S.Info>
              {RECOMMENDATION_CAPTION}
              {data.recommendation}
            </S.Info>
          </S.InfoContainer>
        </S.ContentsContainer>
        {data.imageList && (
          <S.ContentsContainer>
            <ImageSlider imageList={data.imageList} />
          </S.ContentsContainer>
        )}
        <S.UserContentsContainer>
          {data.userId === userId && (
            <S.AdminContainer>
              <Button
                href={`${routes.UPDATE_POST}/${data.docId}`}
                theme="outlinedPrimary"
                size="medium"
                width="45%">
                {UPDATE_BUTTON_CAPTION}
              </Button>
              <Button
                theme="outlinedDanger"
                size="medium"
                width="45%"
                onClick={removeHanlder && removeHanlder(data.docId)}>
                {DELETE_BUTTON_CAPTION}
              </Button>
            </S.AdminContainer>
          )}
          <WriterInfo userData={data.userData} createdAt={data.createdAt} />
          <S.FreeCommentContainer>{data.freeText}</S.FreeCommentContainer>
        </S.UserContentsContainer>
      </S.Container>
      {NavigationInfo && <PrevNextButton {...NavigationInfo} />}
    </>
  );
};

export default SinglePost;
