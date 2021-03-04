import React from 'react';
import styled from '@emotion/styled';
import { FOOTER_CONTENTS } from 'common/constant/string';

const Footer = (): React.ReactElement => {
  return (
    <Container>
      <Text>{FOOTER_CONTENTS}</Text>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background-color: #fbfbfb;
`;

const Text = styled.span`
  font-size: 0.7rem;
  color: gray;
`;

export default Footer;
