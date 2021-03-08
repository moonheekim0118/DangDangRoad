import styled from '@emotion/styled';
import { MARKER_URL, MARKER_POSITIONS } from 'common/constant/images';
import { colorCode } from 'common/style/color';

export const Container = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Search = styled.div`
  width: 300px;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const SearchResult = styled.div`
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

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;

export const AddressTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PlaceName = styled.span<{ selected: boolean }>`
  font-weight: bold;
  color: ${(props) => props.selected && colorCode['blue']};
`;

export const AdressName = styled.span`
  font-size: 0.8rem;
`;

export const Marker = styled.span<{ index: number }>`
  width: 36px;
  height: 37px;
  background: ${`url(${MARKER_URL})`} no-repeat;
  background-position: ${(props) => MARKER_POSITIONS[props.index]};
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Page = styled.span<{ current: boolean }>`
  font-weight: ${(props) => props.current && 'bold'};
  cursor: pointer;
`;
