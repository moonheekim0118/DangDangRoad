import { Icon } from 'components/UI';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

interface Props {
  hasPrev: boolean;
  /** next Available */
  hasNext: boolean;
  /** goToPrevHandler */
  onClickPrev: () => void;
  /** goToNextHandler */
  onClickNext: () => void;
  /** Buttons location */
  location?: number;
}

const ControllerBtn = ({
  onClickPrev,
  onClickNext,
  hasPrev,
  hasNext,
  location = -50,
}: Props): React.ReactElement => {
  return (
    <>
      {hasPrev && (
        <S.Container left={true} location={location}>
          <Icon
            icon={faChevronLeft}
            size="large"
            style={S.iconStyle}
            onClick={onClickPrev}
          />
        </S.Container>
      )}
      {hasNext && (
        <S.Container location={location}>
          <Icon
            icon={faChevronRight}
            size="large"
            style={S.iconStyle}
            onClick={onClickNext}
          />
        </S.Container>
      )}
    </>
  );
};

export default ControllerBtn;
