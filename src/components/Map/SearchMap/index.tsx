import React, { useEffect, useState, useCallback, useRef } from 'react';
import SearchBar from 'components/ui/SearchBar';
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

declare global {
  interface Window {
    kakao: any;
  }
}

let markers: any[] = [];

interface Props {
  /** function to change user select Place to review */
  selectPlaceHandler: (place: T.PlaceType) => () => void;
  /** place name which is selected by user */
  nowSelectedAddress?: string;
  initialCoordX?: string;
  initialCoordY?: string;
}

const SearchMap = ({
  selectPlaceHandler,
  nowSelectedAddress,
  initialCoordX,
  initialCoordY,
}: Props) => {
  const container = useElement('map');
  const [map, setMap] = useState<any>();
  const [placeData, setPlacesData] = useState<T.PlaceType[] | null>(null);
  const [pagination, setPagination] = useState<T.PaginationType | null>(null);
  const [ps, setPs] = useState<any>();
  const [infoWindow, setInfoWindow] = useState<any>();
  const keywordRef = useRef<InputRef>(inputDefaultRef());

  useEffect(() => {
    if (container) {
      // when client is loaded
      const { kakao } = window;
      const options = {
        center: new kakao.maps.LatLng(
          initialCoordY ? +initialCoordY : 33.450701,
          initialCoordX ? +initialCoordX : 126.570667
        ),
        level: 3,
      };
      setMap(new kakao.maps.Map(container, options));
      setPs(new kakao.maps.services.Places());
      setInfoWindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
    }
  }, [container]);

  const displayInfoWindow = useCallback(
    (marker, title) => {
      if (infoWindow) {
        let content =
          '<div style="padding:5px;z-index:5000">' + title + '</div>';
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      }
    },
    [map, infoWindow, initialCoordX, initialCoordY]
  );

  const addMarkers = useCallback(
    (position, idx) => {
      if (map) {
        const { kakao } = window;
        let imageSrc = MARKER_URL,
          imageSize = new kakao.maps.Size(36, 37),
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
            offset: new kakao.maps.Point(13, 37),
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position,
            image: markerImage,
          });
        marker.setMap(map);
        markers.push(marker);
        return marker;
      }
    },
    [container, map]
  );

  const drawMap = useCallback(
    (data) => {
      if (map) {
        const { kakao } = window;
        let placePosition;
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          placePosition = new kakao.maps.LatLng(data[i].y, data[i].x);
          let marker = addMarkers(placePosition, i);
          bounds.extend(placePosition);

          (function (marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', () => {
              displayInfoWindow(marker, title);
            });
            kakao.maps.event.addListener(marker, 'mouseout', () => {
              infoWindow.close();
            });
          })(marker, data[i].place_name);
        }
        map.setBounds(bounds);
        setMap(map);
      }
    },
    [container, map, infoWindow]
  );

  const placeSearchCB = useCallback(
    (data, stauts, pagination) => {
      if (data.length === 0) {
        return alert(NO_SEARCH_RESULT_ERROR);
      }
      setPlacesData(data); // update Data States
      setPagination(pagination); // update Pagination State
      drawMap(data);
    },
    [map, infoWindow]
  );

  // SearchButton Click handler
  const searchHadler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      const keyword = keywordRef.current.value;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        return alert(NO_KEYWORD_ERROR);
      }
      if (ps) {
        ps.keywordSearch(keyword, placeSearchCB);
      }
    },
    [keywordRef, ps]
  );

  // pagination - page click handler function
  const pageClickHandler = useCallback(
    (index: number) => () => {
      if (pagination) {
        pagination.gotoPage(index);
      }
    },
    [pagination]
  );

  return (
    <S.Container>
      <S.Search>
        <SearchBar
          color="white"
          placeholder={MAP_SEARCH_PLACEHOLDER}
          ref={keywordRef}
          submitHandler={searchHadler}
        />
      </S.Search>
      <S.Map id="map" />
      <S.SearchResult>
        {placeData &&
          placeData.map((v, i) => (
            <S.AddressContainer key={i}>
              <S.AddressTitle onClick={selectPlaceHandler(v)}>
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
            Array.from(Array(pagination.last), (_, i) => (
              <S.Page
                current={i + 1 === pagination?.current}
                key={i}
                onClick={pageClickHandler(i + 1)}>
                {i + 1}
              </S.Page>
            ))}
        </S.PaginationContainer>
      </S.SearchResult>
    </S.Container>
  );
};

export default SearchMap;
