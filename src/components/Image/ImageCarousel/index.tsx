import React from 'react';
import Modal from 'components/ui/Modal';
import PrevNextButton from 'components/ui/PrevNextButton';
import { useImageSlide } from 'hooks';
import * as S from './style';

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
      <S.Containter>
        <PrevNextButton
          prevHandler={data.toPrev}
          hasPrev={true}
          nextHandler={data.toNext}
          hasNext={true}
        />
        <S.Image src={imageList[data.index]} />
      </S.Containter>
    </Modal>
  );
};

export default ImageCarousel;
