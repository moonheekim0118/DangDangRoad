import React from 'react';
import { colorCode } from 'model/colorCode';
import Image from 'next/image';
import Layout from 'components/Layout';
import styled from '@emotion/styled';

const SignUpProcess = () => {
  return (
    <Layout>
      <Container>
        <Image src="/sentEmailImage.png" alt="" width="300" height="200" />
        <Title>이메일 인증</Title>
        <Contents>
          가입하신 메일로 인증 메일을 보냈습니다. 인증을 완료해주세요.
        </Contents>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  color: ${colorCode['blue']};
  margin: 20px 0;
`;

const Contents = styled.p`
  color: ${colorCode['dark-gray']};
`;

export default SignUpProcess;
