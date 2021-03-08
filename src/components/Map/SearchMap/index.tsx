import React from 'react';
import SearchBar from 'components/ui/SearchBar';
import { useSearchMap } from 'hooks';
import { PlaceType } from 'types/Map';
import { MAP_SEARCH_PLACEHOLDER } from 'common/constant/string';
import * as S from './style';

interface Props {
  /** function to change user select Place to review */
  selectPlaceHandler: (place: PlaceType) => () => void;
  /** place name which is selected by user */
  nowSelectedAddress?: string;
  initialCoordX?: string;
  initialCoordY?: string;
}

const SearchMap = ({
  selectPlaceHandler,
  nowSelectedAddress = '',
  initialCoordX,
  initialCoordY,
}: Props) => {
  const data = useSearchMap({ initialCoordX, initialCoordY });

  return (
    <S.Container>
      <S.Search>
        <SearchBar
          color="white"
          placeholder={MAP_SEARCH_PLACEHOLDER}
          value={data.keyword}
          onChange={data.keywordChangeHandler}
          submitHandler={data.searchHadler}
        />
      </S.Search>
      <S.Map id="map" />
      <S.SearchResult>
        {data.placeData &&
          data.placeData.map((v, i) => (
            <S.AddressContainer key={i}>
              <S.AddressTitle onClick={selectPlaceHandler(v)}>
                <S.Marker index={i} />
                <S.PlaceName selected={v.place_name === nowSelectedAddress}>
                  {v.place_name}
                </S.PlaceName>
              </S.AddressTitle>
              <S.AdressName>
                {v.address_name} {v?.road_address_name}
              </S.AdressName>
            </S.AddressContainer>
          ))}
        <S.PaginationContainer>
          {data.pagination &&
            Array.from(Array(data.pagination.last), (_, i) => (
              <S.Page
                current={i + 1 === data.pagination?.current}
                key={i}
                onClick={data.pageClickHandler(i + 1)}>
                {i + 1}
              </S.Page>
            ))}
        </S.PaginationContainer>
      </S.SearchResult>
    </S.Container>
  );
};

export default SearchMap;
