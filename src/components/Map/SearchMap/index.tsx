import { useEffect, useState, useRef } from 'react';
import { SearchBar } from 'components/UI';
import { useElement } from 'hooks';
import { InputRef, inputDefaultRef } from 'types/Ref';
import { MARKER_URL } from 'common/constant/images';
import {
  MAP_SEARCH_PLACEHOLDER,
  NO_SEARCH_RESULT_ERROR,
  NO_KEYWORD_ERROR,
} from 'common/constant/string';
import * as T from 'types/Map';
import * as S from './style';
let markers: any[] = [];

interface Props {
  /** function to change user select Place to review */
  onClickPlace: (place: T.PlaceType) => () => void;
  /** place name which is selected by user */
  nowSelectedAddress?: string;
  initialCoordX?: string;
  initialCoordY?: string;
}

const SearchMap = ({
  onClickPlace,
  nowSelectedAddress,
  initialCoordX,
  initialCoordY,
}: Props): React.ReactElement => {
  const container = useElement('map');
  const [placeData, setPlacesData] = useState<T.PlaceType[] | null>(null);
  const [pagination, setPagination] = useState<T.PaginationType | null>(null);
  const [map, setMap] = useState<any>();
  const [ps, setPs] = useState<any>();
  const [infoWindow, setInfoWindow] = useState<any>();
  const keywordRef = useRef<InputRef>(inputDefaultRef());

  useEffect(() => {
    if (container) {
      const options = {
        center: new window.kakao.maps.LatLng(
          initialCoordY ? +initialCoordY : 33.450701,
          initialCoordX ? +initialCoordX : 126.570667
        ),
        level: 3,
      };
      setMap(new window.kakao.maps.Map(container, options));
      setPs(new window.kakao.maps.services.Places());
      setInfoWindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
    }
  }, [container]);

  const displayInfoWindow = (marker, title) => {
    if (infoWindow) {
      let content = '<div style="padding:5px;z-index:5000">' + title + '</div>';
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    }
  };

  const addMarkers = (position, idx) => {
    if (map) {
      let imageSrc = MARKER_URL,
        imageSize = new window.kakao.maps.Size(36, 37),
        imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691),
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
          offset: new window.kakao.maps.Point(13, 37),
        },
        markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new window.kakao.maps.Marker({
          position: position,
          image: markerImage,
        });
      marker.setMap(map);
      markers.push(marker);
      return marker;
    }
  };

  const drawMap = (data) => {
    if (map) {
      let placePosition = null;
      let bounds = new window.kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        placePosition = new window.kakao.maps.LatLng(data[i].y, data[i].x);
        let marker = addMarkers(placePosition, i);
        bounds.extend(placePosition);

        (function (marker, title) {
          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            displayInfoWindow(marker, title);
          });
          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infoWindow.close();
          });
        })(marker, data[i].place_name);
      }
      map.setBounds(bounds);
      setMap(map);
    }
  };

  const placeSearchCB = (data, _, pagination) => {
    if (data.length === 0) {
      return alert(NO_SEARCH_RESULT_ERROR);
    }
    setPlacesData(data); // update Data States
    setPagination(pagination); // update Pagination State
    drawMap(data);
  };

  const searchHadler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = keywordRef.current.value;
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      return alert(NO_KEYWORD_ERROR);
    }
    if (ps) {
      ps.keywordSearch(keyword, placeSearchCB);
    }
  };

  const pageClickHandler = (index: number) => () => {
    if (pagination) {
      pagination.gotoPage(index);
    }
  };

  return (
    <S.Container>
      <SearchBar
        id="mapSearch"
        color="white"
        placeholder={MAP_SEARCH_PLACEHOLDER}
        ref={keywordRef}
        initialValue={nowSelectedAddress}
        onFormSubmit={searchHadler}
      />
      <S.Map id="map" />
      <S.SearchResult>
        {placeData &&
          placeData.map((v, i) => (
            <S.AddressContainer key={i}>
              <S.AddressTitle onClick={onClickPlace(v)}>
                <S.Marker index={i} />
                <S.PlaceName selected={v.address_name === nowSelectedAddress}>
                  {v.place_name}
                </S.PlaceName>
              </S.AddressTitle>
              <S.AdressName>
                {v.address_name} {v?.road_address_name}
              </S.AdressName>
            </S.AddressContainer>
          ))}
        <S.PaginationContainer>
          {pagination &&
            Array.from(Array(pagination.last), (_, index) => (
              <S.Page
                current={index + 1 === pagination?.current}
                key={index}
                onClick={pageClickHandler(index + 1)}>
                {index + 1}
              </S.Page>
            ))}
        </S.PaginationContainer>
      </S.SearchResult>
    </S.Container>
  );
};

export default SearchMap;
