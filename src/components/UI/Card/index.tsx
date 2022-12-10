import Container from './style';

export interface Props {
  isModal: boolean;
  children: React.ReactNode;
}

const Card = ({ isModal, children }: Props): React.ReactElement => {
  return <Container isModal={isModal}>{children}</Container>;
};

export default Card;
