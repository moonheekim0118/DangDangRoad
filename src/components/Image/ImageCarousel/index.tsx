import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'components/Modal';
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
  // showing image's index;
  const [index, setIndex] = useState<number>(startIdx);

  useEffect(() => {
    setIndex(startIdx);
  }, [startIdx]);

  // left button click handler
  const toLeft = useCallback(() => {
    // if 0 , go to last image
    if (index === 0) {
      setIndex(imageList.length - 1);
    } else {
      setIndex(index - 1);
    }
  }, [index]);

  // right button click handler
  const toRight = useCallback(() => {
    // if it's last image, go to first image
    if (index === imageList.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, [index]);

  return (
    <Modal showModal={showModal} modalHandler={modalHanlder}>
      <Containter>
        <Move left={true}>
          <Icon
            color="white"
            icon={faChevronLeft}
            iconsize={35}
            iconClickHandler={toLeft}
            cursor="pointer"
          />
        </Move>
        <Image src={imageList[index]} />
        <Move>
          <Icon
            color="white"
            icon={faChevronRight}
            iconsize={35}
            iconClickHandler={toRight}
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
