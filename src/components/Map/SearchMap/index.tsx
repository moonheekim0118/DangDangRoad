import React from 'react';
import SearchBar from 'components/SearchBar';
import { useSearchMap } from 'hooks';
import styled from '@emotion/styled';

const markerPosition = [
  '0 -10px',
  '0 -56px',
  '0 -102px',
  '0 -148px',
  '0 -194px',
  '0 -240px',
  '0 -286px',
  '0 -332px',
  '0 -378px',
  '0 -423px',
  '0 -470px',
  '0 -516px',
  '0 -562px',
  '0 -608px',
  '0 -654px',
];

const SearchMap = () => {
  const data = useSearchMap();

  return (
    <Container>
      <Search>
        <SearchBar
          color="white"
          placeholder="키워드로 검색하세요! 예) 애견운동장"
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
              <AddressTitle>
                <Marker index={i} />
                <PlaceName>{v.place_name}</PlaceName>
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
                current={i + 1 === data.pagination.current}
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

const PlaceName = styled.span`
  font-weight: bold;
`;

const AdressName = styled.span`
  font-size: 0.8rem;
`;

const Marker = styled.span<{ index: number }>`
  width: 36px;
  height: 37px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
  background-position: ${(props) => markerPosition[props.index]};
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
