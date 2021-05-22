import styled from '@emotion/styled';

export const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

export const TagContainer = styled.header`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const ReviewContainer = styled.section`
  margin-top: 50px;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 300px);
  column-gap: 2rem;
  row-gap: 2rem;

  @media only screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100%);
    column-gap: 1rem;
    row-gap: 1rem;
  }
`;
