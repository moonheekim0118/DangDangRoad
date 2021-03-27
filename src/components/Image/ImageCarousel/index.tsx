import React from 'react';
import { Modal, ControllerBtn } from 'components/ui';
import { useSlide } from 'hooks';
import { REVIEW_IMAGE_ALT } from 'common/constant/images';
import * as S from './style';

interface Props {
  /** image Url list to show */
  imageList: string[];
  /** start index of list */
  startIdx: number;
  /** fucntion to close image carousel */
  modalHanlder: () => void;
}

const ImageCarousel = ({
  imageList,
  startIdx,
  modalHanlder,
}: Props): React.ReactElement => {
  const data = useSlide({
    initialIndex: startIdx,
    totalSlide: imageList.length,
  });

  return (
    <Modal modalHandler={modalHanlder}>
      <S.Containter>
        <ControllerBtn
          prevHandler={data.toPrev}
          hasPrev={true}
          nextHandler={data.toNext}
          hasNext={true}
        />
        <S.Image src={imageList[data.index]} alt={REVIEW_IMAGE_ALT} />
      </S.Containter>
    </Modal>
  );
};

export default ImageCarousel;
