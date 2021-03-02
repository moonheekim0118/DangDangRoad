import React from 'react';
import { Icon } from 'atoms';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import styled from '@emotion/styled';

interface Props {
  previewClickHanlder?: (e: React.MouseEvent<HTMLDivElement>) => void;
  thumnail?: string | undefined;
  placeName: string;
}

const Preview = ({ previewClickHanlder, thumnail, placeName }: Props) => {
  return (
    <Post onClick={previewClickHanlder}>
      <Overlay>
        <Description>
          <PlaceName>{placeName}</PlaceName>
          <div>
            <Icon icon={faComment} iconsize={25} /> 12
          </div>
        </Description>
      </Overlay>
      <Image
        src={
          thumnail ||
          'https://superawesomevectors.com/wp-content/uploads/2018/05/danny-dog-peppa-pig-character-free-vector-800x566.jpg'
        }
      />
    </Post>
  );
};

const Post = styled.div`
  width: 300px;
  height: 300px;
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
  width: 300px;
  height: 300px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PlaceName = styled.span`
  max-height: 80px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Preview;
