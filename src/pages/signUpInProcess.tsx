import Image from 'next/image';
import { SENT_EMAIL_IMAGE, SENT_EMAIL_IMAGE_ALT } from 'common/constant/images';
import { EMAIL_VERFY_TITLE, EMAIL_VERFY_DESC } from 'common/constant/string';
import styled from '@emotion/styled';

const SignUpProcess = (): React.ReactElement => {
  return (
    <Container>
      <Image
        src={SENT_EMAIL_IMAGE}
        alt={SENT_EMAIL_IMAGE_ALT}
        width={300}
        height={200}
      />
      <Title>{EMAIL_VERFY_TITLE}</Title>
      <Contents>{EMAIL_VERFY_DESC}</Contents>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  color: var(--colors-blue);
  margin: 20px 0;
`;

const Contents = styled.p`
  color: var(--colors-dark-gray);
`;

export default SignUpProcess;
