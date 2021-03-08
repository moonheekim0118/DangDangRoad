import React from 'react';
import { PreviewPost } from 'components/post';
import { lightReviewData } from 'types/API';
import { Tag } from 'atoms';
import { DEFAULT_KEYWORD } from 'common/constant/string';
import * as S from './style';

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
    <S.Container>
      <S.TagContainer>
        {searchKeyword ? (
          <Tag size="large">{searchKeyword}</Tag>
        ) : (
          <Tag size="large">{DEFAULT_KEYWORD}</Tag>
        )}
      </S.TagContainer>
      <S.ReviewContainer>
        {reviewData.map((v) => (
          <PreviewPost
            key={v.docId}
            previewClickHanlder={openSinglePost(v.docId)}
            placeName={v.placeName}
            thumnail={v.thumbNail}
          />
        ))}
      </S.ReviewContainer>
    </S.Container>
  );
};

export default PostList;
