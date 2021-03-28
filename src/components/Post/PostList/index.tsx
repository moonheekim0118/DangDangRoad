import React from 'react';
import { PreviewPost } from 'components/Post';
import { LightReviewData } from 'types/API';
import { DEFAULT_KEYWORD } from 'common/constant/string';
import { Tag } from 'components/ui';
import * as S from './style';

interface Props {
  /** search keyword */
  searchKeyword?: string;
  /** fetched datas to show */
  reviewData: LightReviewData[];
  /** open Single Post */
  openSinglePost: (postId: string) => () => void;
}

const PostList = ({
  searchKeyword,
  reviewData,
  openSinglePost,
}: Props): React.ReactElement => {
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
            commentsLength={v.commentsLength}
          />
        ))}
      </S.ReviewContainer>
    </S.Container>
  );
};

export default PostList;
