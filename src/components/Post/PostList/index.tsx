import React from 'react';
import { PreviewPost } from 'components/post';
import { LightReviewData } from 'types/API';
import { Tag } from 'atoms';
import { DEFAULT_KEYWORD } from 'common/constant/string';
import { LoadingPostList } from 'components/ui';
import * as S from './style';

interface Props {
  /** search keyword */
  searchKeyword?: string;
  /** review Data loading status */
  isLoading?: boolean;
  /** fetched datas to show */
  reviewData: LightReviewData[];
  /** open Single Post */
  openSinglePost: (postId: string) => () => void;
}

const PostList = ({
  searchKeyword,
  isLoading = false,
  reviewData,
  openSinglePost,
}: Props) => {
  return (
    <S.Container>
      <S.TagContainer>
        {searchKeyword ? (
          <Tag size="large">{searchKeyword}</Tag>
        ) : (
          <Tag size="large">{DEFAULT_KEYWORD}</Tag>
        )}
      </S.TagContainer>
      {isLoading ? (
        <LoadingPostList />
      ) : (
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
      )}
    </S.Container>
  );
};

export default PostList;
