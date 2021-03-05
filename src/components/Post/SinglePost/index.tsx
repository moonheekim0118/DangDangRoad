import React from 'react';
import { reviewData } from 'types/API';
import { colorCode } from 'common/style/color';
import { NavigationInfo } from 'types/Navigation';
import { useLoginInfoState } from 'context/LoginInfo';
import { Button, Anchor } from 'atoms';
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
import styled from '@emotion/styled';

interface Props {
  /** single Review Data */
  data: reviewData;
  /** Navigation info */
  NavigationInfo?: NavigationInfo;
  /** remove Handler */
  removeHanlder?: () => void;
}

const SinglePost = ({ data, NavigationInfo, removeHanlder }: Props) => {
  const { userId } = useLoginInfoState();

  return (
    <>
      <Contents>
        <InfoContainer>
          <PlaceName>{data.placeInfo.place_name}</PlaceName>
          <PlaceDetail>{data.placeInfo.address_name}</PlaceDetail>
          <BasicMap coordX={data.placeInfo.x} coordY={data.placeInfo.y} />
          <CommonInfoContainer>
            <CommonInfo>
              {PARKING_LOT_CAPTION}
              {data.hasParkingLot}
            </CommonInfo>
            <CommonInfo>
              {OFFLEASH_CAPTION}
              {data.hasOffLeash}
            </CommonInfo>
            <CommonInfo>
              {RECOMMENDATION_CAPTION}
              {data.recommendation}
            </CommonInfo>
          </CommonInfoContainer>
        </InfoContainer>
        {data.imageList && (
          <InfoContainer>
            <ImageSlider imageList={data.imageList} />
          </InfoContainer>
        )}
        <InfoContainer>
          <WriterInfo userData={data.userData} createdAt={data.createdAt} />
          <FreeCommentContainer>{data.freeText}</FreeCommentContainer>
          {data.userId === userId && (
            <>
              <Anchor path={`${routes.UPDATE_POST}/${data.docId}`}>
                <Button color="blue">{UPDATE_BUTTON_CAPTION}</Button>
              </Anchor>
              <Button color="red" onClick={removeHanlder}>
                {DELETE_BUTTON_CAPTION}
              </Button>
            </>
          )}
        </InfoContainer>
      </Contents>
      {NavigationInfo && <PrevNextButton {...NavigationInfo} />}
    </>
  );
};

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
  }
`;

const InfoContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    min-height: 300px;
  }
`;

const PlaceName = styled.span`
  text-align: cetner;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.8rem;
  color: ${colorCode['blue']};
`;

const PlaceDetail = styled.span`
  text-align: center;
  font-size: 0.9rem;
  color: ${colorCode['dark-gray']};
`;

const CommonInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 1024px) {
    flex-direction: row;s
  }
`;

const CommonInfo = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.1rem;
  color: ${colorCode['gray']};
`;

const FreeCommentContainer = styled.div`
  border: 1px solid ${colorCode['light-gray']};
  border-radius: 25px;
  padding: 15px;
`;

export default SinglePost;
