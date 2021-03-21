import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

export const TagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export const ReviewContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 300px);
  column-gap: 30px;
  row-gap: 30px;
`;
