import React from 'react';
import Modal from 'components/Modal';
import PrevNextButton from 'components/PrevNextButton';
import { useImageSlide } from 'hooks';
import { baseModalStyle } from 'util/baseStyle';
import styled from '@emotion/styled';

interface Props {
  /** image Url list to show */
  imageList: string[];
  /** start index of list */
  startIdx: number;
  /** show this modal or not */
  showModal: boolean;
  /** fucntion to close image carousel */
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
        <PrevNextButton
          prevHandler={data.toPrev}
          hasPrev={true}
          nextHandler={data.toNext}
          hasNext={true}
        />
        <Image src={imageList[data.index]} />
      </Containter>
    </Modal>
  );
};

const Containter = styled.div`
  width: 50%;
  height: 100%;
  display: grid;
  place-items: center;
  ${baseModalStyle}

  @media only screen and (max-width: 780px) {
    width: 80%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  padding: 20px;
  object-fit: cover;
`;

export default ImageCarousel;
