import React from 'react';
import { Wrapper, Container } from 'components/post/SinglePost/style';
import ContentLoader, { Instagram } from 'react-content-loader';

const LoadingSinglePost = ({ isModal }) => {
  return (
    <Wrapper isModal={isModal}>
      <Container>
        <ContentLoader width="100%" height="100%">
          <rect x="50" y="50" rx="0" ry="0" width="calc(100%/4)" height="80%" />
          <rect
            x="450"
            y="50"
            rx="0"
            ry="0"
            width="calc(100%/4)"
            height="80%"
          />

          <rect x="900" y="80" rx="4" ry="4" width="254" height="6" />
          <rect x="920" y="100" rx="3" ry="3" width="201" height="6" />
          <circle cx="850" cy="100" r="48" />
          <rect
            x="850"
            y="180"
            rx="0"
            ry="0"
            width="calc(100%/4)"
            height="30%"
          />
        </ContentLoader>
      </Container>
    </Wrapper>
  );
};

export default LoadingSinglePost;
