import React from 'react';
import { PreviewPost } from 'components/Post';
import { lightReviewData } from 'types/API';
import { Tag } from 'atoms';
import { DEFAULT_KEYWORD } from 'common/constant/string';
import styled from '@emotion/styled';

interface Props {
  /** search keyword */
  searchKeyword?: string;
  /** fetched datas to show */
  reviewData: lightReviewData[];
  /** open Single Post */
  openSinglePost: (postId: string) => () => void;
}

const PostList = ({ searchKeyword, reviewData, openSinglePost }: Props) => {
  return (
    <Container>
      <TagContainer>
        {searchKeyword ? (
          <Tag size="large">{searchKeyword}</Tag>
        ) : (
          <Tag size="large">{DEFAULT_KEYWORD}</Tag>
        )}
      </TagContainer>
      <ReviewContainer>
        {reviewData.map((v) => (
          <PreviewPost
            key={v.docId}
            previewClickHanlder={openSinglePost(v.docId)}
            placeName={v.placeName}
            thumnail={v.thumbNail}
          />
        ))}
      </ReviewContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 25px;
`;

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const ReviewContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 300px);
  column-gap: 30px;
  row-gap: 30px;
`;

export default PostList;
