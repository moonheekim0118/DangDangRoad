import React, { useEffect } from 'react';
import { useElement } from 'hooks';
import styled from '@emotion/styled';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const container = useElement('map');

  useEffect(() => {
    if (container) {
      // when client is loaded
      const { kakao } = window;
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new kakao.maps.Map(container, options);
    }
  }, [container]);

  return (
    <Container id="map" style={{ width: '500px', height: '500px' }}></Container>
  );
};

const Container = styled.div`
  width: 500px;
  height: 500px;
`;

export default Map;
