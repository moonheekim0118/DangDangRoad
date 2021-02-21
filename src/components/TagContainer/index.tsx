import React, { memo } from 'react';
import Tag from 'atoms/Tag';
import styled from '@emotion/styled';

const TagContainer = () => {
  return (
    <Container>
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
      <Tag text="서울" size="large" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export default memo(TagContainer);
