import { Modal, ControllerBtn } from 'components/UI';
import { useSlide } from 'hooks';
import { REVIEW_IMAGE_ALT } from 'common/constant/images';
import * as S from './style';

interface Props {
  /** image Url list to show */
  imageList: string[];
  /** start index of list */
  startIdx: number;
  /** fucntion to close image carousel */
  onClick: () => void;
}

const ImageCarousel = ({
  imageList,
  startIdx,
  onClick,
}: Props): React.ReactElement => {
  const data = useSlide({
    initialIndex: startIdx,
    totalSlide: imageList.length,
  });

  return (
    <Modal onClick={onClick}>
      <S.Containter>
        <ControllerBtn
          onClickPrev={data.toPrev}
          hasPrev={true}
          onClickNext={data.toNext}
          hasNext={true}
        />
        <S.Image src={imageList[data.index]} alt={REVIEW_IMAGE_ALT} />
      </S.Containter>
    </Modal>
  );
};

export default ImageCarousel;
