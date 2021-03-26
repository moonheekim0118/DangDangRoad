import React from 'react';
import { Modal, ControllerBtn } from 'components/ui';
import { useSlide } from 'hooks';
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
}: Props): React.ReactElement => {
  const data = useSlide({
    initialIndex: startIdx,
    totalSlide: imageList.length,
  });

  return (
    <Modal showModal={showModal} modalHandler={modalHanlder}>
      <S.Containter>
        <ControllerBtn
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
