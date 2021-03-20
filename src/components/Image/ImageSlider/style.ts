import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Image = styled.img`
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;
  background-color: black;
`;

export const NavigatorContainer = styled.div`
  position: absolute;
  bottom: 25px;
  width: 30%;
  display: flex;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  z-index: 7000;

  > * {
    margin: 0 0.9rem;
  }
`;

export const Navigator = styled.div<{ current: boolean }>`
  &::after {
    content: ' ';
    position: absolute;
    display: inline-block;
    top: 0px;
    width: 15px;
    height: 15px;
    background-color: ${(props) =>
      props.current ? '#fff' : 'rgba(244, 244, 244,0.6)'};
    border-radius: 50%;
    cursor: pointer;
  }
`;
