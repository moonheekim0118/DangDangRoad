import React from 'react';
import { Icon } from 'atoms';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import styled from '@emotion/styled';

const Preview = () => {
  return (
    <Container>
      <Post>
        <Overlay>
          <Description>
            <div>
              <Icon icon={faHeart} iconsize={25} /> 0
            </div>
            <div>
              <Icon icon={faComment} iconsize={25} /> 12
            </div>
          </Description>
        </Overlay>
        <Image src="https://i0.wp.com/www.society19.com/wp-content/uploads/2018/10/ls.jpg?fit=1000%2C750&ssl=1" />
      </Post>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;
  width: 70%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 250px);
  column-gap: 25px;
  row-gap: 25px;
`;

const Post = styled.div`
  width: 250px;
  height: 250px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Overlay = styled.div`
  opacity: 0;
  display: grid;
  place-items: center;
  width: 250px;
  height: 250px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2000;

  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Description = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

export default Preview;
