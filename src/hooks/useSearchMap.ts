import { useEffect, useState, useCallback } from 'react';
import { useElement, useInput } from 'hooks';
import { MARKER_URL } from 'common/constant/images';
import {
  NO_SEARCH_RESULT_ERROR,
  NO_KEYWORD_ERROR,
} from 'common/constant/string';
import * as T from 'types/Map';

declare global {
  interface Window {
    kakao: any;
  }
}

let markers: any[] = [];

const useSearchMap = () => {
  const container = useElement('map');
  const [map, setMap] = useState<any>();
  const [placeData, setPlacesData] = useState<T.PlaceType[] | undefined>();
  const [pagination, setPagination] = useState<T.PaginationType | undefined>();
  const [keyword, keywordChangeHandler] = useInput();
  const [ps, setPs] = useState<any>();
  const [infoWindow, setInfoWindow] = useState<any>();

  useEffect(() => {
    if (container) {
      // when client is loaded
      const { kakao } = window;
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
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
    [map, infoWindow]
  );

  const addMarkers = useCallback(
    (position, idx) => {
      if (map) {
        const { kakao } = window;
        let imageSrc = MARKER_URL,
          imageSize = new kakao.maps.Size(36, 37),
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
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
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        return alert(NO_KEYWORD_ERROR);
      }
      if (ps) {
        ps.keywordSearch(keyword, placeSearchCB);
      }
    },
    [keyword, ps]
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

  return {
    map,
    keyword,
    keywordChangeHandler,
    searchHadler,
    placeData,
    pagination,
    pageClickHandler,
  };
};

export default useSearchMap;
