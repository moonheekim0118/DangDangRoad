import React from 'react';
import { baseModalStyle } from 'util/baseStyle';
import { ReviewData } from 'types/API';
import { colorCode } from 'types/Color';
import { Icon } from 'atoms';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ImageSlider from 'components/Image/ImageSlider';
import Map from 'components/Map';
import styled from '@emotion/styled';

interface Props {
  /** single Review Data */
  data: ReviewData;
  /** indicate if it's modal or not */
  isModal?: boolean;
  /** prev Avaiable? */
  hasPrev?: boolean;
  /** next Available */
  hasNext?: boolean;
  /** goToPrevHandler */
  goToPrevHandler?: () => void;
  /** goToNextHandler */
  goToNextHandler?: () => void;
}

const SinglePost = ({
  data,
  isModal = true,
  hasPrev,
  hasNext,
  goToPrevHandler,
  goToNextHandler,
}: Props) => {
  return (
    <Container isModal={isModal}>
      <Contents>
        <InfoContainer>
          <PlaceName>{data.placeInfo.place_name}</PlaceName>
          <PlaceDetail>{data.placeInfo.address_name}</PlaceDetail>
          <Map coordX={data.placeInfo.x} coordY={data.placeInfo.y} />
          <CommonInfoContainer>
            <CommonInfo>✅ 주차장 {data.hasParkingLot}</CommonInfo>
            <CommonInfo>✅ 오프리쉬 {data.hasOffLeash}</CommonInfo>
            <CommonInfo>🐶 {data.recommendation}</CommonInfo>
          </CommonInfoContainer>
        </InfoContainer>
        <InfoContainer>
          {data.imageList && <ImageSlider imageList={data.imageList} />}
        </InfoContainer>
        <InfoContainer>
          <FreeCommentContainer>{data.freeText}</FreeCommentContainer>
        </InfoContainer>
      </Contents>
      {hasPrev && (
        <Move left={true}>
          <Icon
            color="white"
            icon={faChevronLeft}
            iconsize={35}
            iconClickHandler={goToPrevHandler}
            cursor="pointer"
          />
        </Move>
      )}
      {hasNext && (
        <Move>
          <Icon
            color="white"
            icon={faChevronRight}
            iconsize={35}
            iconClickHandler={goToNextHandler}
            cursor="pointer"
          />
        </Move>
      )}
    </Container>
  );
};

const Container = styled.div<{ isModal: boolean }>`
  width: 80vw;
  height: 80vh;
  margin: ${(props) => !props.isModal && '25px 0'};
  background-color: #fff;
  border-radius: 20px;
  border: ${(props) => !props.isModal && '2px solid #f4f4f4'};
  box-shadow: ${(props) =>
    props.isModal && '0px 0px 5px 0px rgba(0, 0, 0, 0.75)'};
  ${(props) => props.isModal && baseModalStyle};
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
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
    height: 300px;
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
    flex-direction: row;
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

const Move = styled.div<{ left?: boolean }>`
  display: grid;
  place-items: center;
  z-index: 7500;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left && '-50px'};
  right: ${(props) => !props.left && '-50px'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default SinglePost;
