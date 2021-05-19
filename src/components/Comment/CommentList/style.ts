import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const moreIconStyle = css`
  color: var(--colors-light-blue);
  transition: transform 0.3s ease;
  &:hover {
    transform: rotate(200deg);
  }
`;

export const List = styled.ul`
  width: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1.7rem 0;
  list-style-type: none;
`;

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 110px);
  overflow-y: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CommentCard = styled.li`
  width: calc(100% - 28px);
  display: flex;
  flex-direction: column;
`;

export const CommentContents = styled.p`
  word-wrap: break-word;
  width: 80%;
  font-size: 0.8rem;
  margin-left: 40px;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #fff;
`;
