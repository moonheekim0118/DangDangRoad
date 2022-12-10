import { useEffect } from 'react';
import * as S from './style';

interface Props {
  /** coordination for get Position of map to draw */
  coordX: string;
  coordY: string;
}

const Map = ({ coordX, coordY }: Props): React.ReactElement => {
  useEffect(() => {
    const mapElement = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(+coordY, +coordX),
      level: 3,
    };
    new window.kakao.maps.Map(mapElement, options);
  }, [coordX, coordY]);

  return <S.Container id="map"></S.Container>;
};

export default Map;
