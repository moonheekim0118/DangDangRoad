import React from 'react';
import Modal from 'components/Modal';
import { useImageSlide } from 'hooks';
import { Icon } from 'atoms';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { baseModalStyle } from 'util/baseStyle';
import styled from '@emotion/styled';

interface Props {
  imageList: string[];
  startIdx: number;
  showModal: boolean;
  modalHanlder: () => void;
}

const ImageCarousel = ({
  imageList,
  startIdx,
  showModal,
  modalHanlder,
}: Props) => {
  const data = useImageSlide({
    initialIndex: startIdx,
    totalSlide: imageList.length,
  });
  return (
    <Modal showModal={showModal} modalHandler={modalHanlder}>
      <Containter>
        <Move left={true}>
          <Icon
            color="white"
            icon={faChevronLeft}
            iconsize={35}
            iconClickHandler={data.toPrev}
            cursor="pointer"
          />
        </Move>
        <Image src={imageList[data.index]} />
        <Move>
          <Icon
            color="white"
            icon={faChevronRight}
            iconsize={35}
            iconClickHandler={data.toNext}
            cursor="pointer"
          />
        </Move>
      </Containter>
    </Modal>
  );
};

const Containter = styled.div`
  width: 50%;
  height: 80%;
  display: grid;
  place-items: center;
  ${baseModalStyle}

  @media only screen and (max-width: 780px) {
    width: 80%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  padding: 20px;
  object-fit: cover;
`;

const Move = styled.div<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left && '-40px'};
  right: ${(props) => !props.left && '-40px'};
`;

export default ImageCarousel;
