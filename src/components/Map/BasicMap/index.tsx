import React, { useEffect } from 'react';
import { useElement } from 'hooks/common';
import styled from '@emotion/styled';

interface Props {
  /** coordination for get Position of map to draw */
  coordX: string;
  coordY: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ coordX, coordY }: Props) => {
  const container = useElement('map');

  useEffect(() => {
    if (container) {
      // when client is loaded
      const { kakao } = window;
      const options = {
        center: new kakao.maps.LatLng(+coordY, +coordX),
        level: 3,
      };
      new kakao.maps.Map(container, options);
    }
  }, [container, coordX, coordY]);

  return <Container id="map"></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 50%;
`;

export default Map;
