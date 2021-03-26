import React, { useEffect } from 'react';
import { useElement } from 'hooks';
import * as S from './style';

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

const Map = ({ coordX, coordY }: Props): React.ReactElement => {
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

  return <S.Container id="map"></S.Container>;
};

export default Map;
