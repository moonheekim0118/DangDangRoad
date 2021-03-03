import React from 'react';
import SearchBar from 'components/SearchBar';
import { useSearchMap } from 'hooks';
import { PlaceType } from 'types/Map';
import { colorCode } from 'types/Color';
import { MAP_SEARCH_PLACEHOLDER } from 'common/constant/string';
import styled from '@emotion/styled';
import { MARKER_URL, MARKER_POSITIONS } from 'common/constant/images';

interface Props {
  /** function to change user select Place to review */
  selectPlaceHandler: (place: PlaceType) => () => void;
  /** place name which is selected by user */
  nowSelectedAddress?: string;
}

const SearchMap = ({ selectPlaceHandler, nowSelectedAddress = '' }: Props) => {
  const data = useSearchMap();

  return (
    <Container>
      <Search>
        <SearchBar
          color="white"
          placeholder={MAP_SEARCH_PLACEHOLDER}
          keyword={data.keyword}
          keywordChangeHanlder={data.keywordChangeHandler}
          searchHandler={data.searchHadler}
        />
      </Search>
      <Map id="map" />
      <SearchResult>
        {data.placeData &&
          data.placeData.map((v, i) => (
            <AddressContainer key={i}>
              <AddressTitle onClick={selectPlaceHandler(v)}>
                <Marker index={i} />
                <PlaceName selected={v.place_name === nowSelectedAddress}>
                  {v.place_name}
                </PlaceName>
              </AddressTitle>
              <AdressName>
                {v.address_name} {v.road_address_name}
              </AdressName>
            </AddressContainer>
          ))}
        <PaginationContainer>
          {data.pagination &&
            Array.from(Array(data.pagination.last), (_, i) => (
              <Page
                current={i + 1 === data.pagination?.current}
                key={i}
                onClick={data.pageClickHandler(i + 1)}>
                {i + 1}
              </Page>
            ))}
        </PaginationContainer>
      </SearchResult>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Search = styled.div`
  width: 300px;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchResult = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(244, 244, 244, 0.5);
  padding: 20px;
  z-index: 3000;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;

const AddressTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PlaceName = styled.span<{ selected: boolean }>`
  font-weight: bold;
  color: ${(props) => props.selected && colorCode['blue']};
`;

const AdressName = styled.span`
  font-size: 0.8rem;
`;

const Marker = styled.span<{ index: number }>`
  width: 36px;
  height: 37px;
  background: ${`url(${MARKER_URL})`} no-repeat;
  background-position: ${(props) => MARKER_POSITIONS[props.index]};
`;

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Page = styled.span<{ current: boolean }>`
  font-weight: ${(props) => props.current && 'bold'};
  cursor: pointer;
`;
export default SearchMap;
