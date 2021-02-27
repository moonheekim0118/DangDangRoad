import React from 'react';
import { baseModalStyle } from 'util/baseStyle';
import { ReviewData } from 'types/API';
import { colorCode } from 'types/Color';
import ImageSlider from 'components/Image/ImageSlider';
import Map from 'components/Map';
import styled from '@emotion/styled';

interface Props {
  data: ReviewData;
}

const SinglePost = ({ data }: Props) => {
  return (
    <Container>
      <InfoContainer>
        <PlaceName>{data.placeInfo.place_name}</PlaceName>
        <PlaceDetail>{data.placeInfo.address_name}</PlaceDetail>
        <Map coordX={data.placeInfo.x} coordY={data.placeInfo.y} />
      </InfoContainer>
      <InfoContainer>
        {data.imageList && <ImageSlider imageList={data.imageList} />}
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 25px;
  gap: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  ${baseModalStyle}
`;

const InfoContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
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

export default SinglePost;
