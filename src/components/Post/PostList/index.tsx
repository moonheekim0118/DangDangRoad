import React, { useCallback } from 'react';
import { PreviewPost } from 'components/Post';
import { LightReview } from 'types/Review';
import { DEFAULT_KEYWORD } from 'common/constant/string';
import { useSinglePostModal } from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { Tag } from 'components/UI';
import * as S from './style';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('components/UI/Modal'));
const Card = dynamic(() => import('components/UI/Card'));
const LoadingSinglePost = dynamic(
  () => import('components/UI/LoadingSinlgePost')
);
const SinglePost = dynamic(() => import('components/Post/SinglePost'));
const ControllerBtn = dynamic(() => import('components/UI/ControllerBtn'));

interface Props {
  /** search keyword */
  searchKeyword?: string;
  /** fetched datas to show */
  reviewData: LightReview[];
  /** remove cache Handler */
  handleRemoveCache: (id: string) => void;
}

const PostList = ({
  searchKeyword,
  reviewData,
  handleRemoveCache,
}: Props): React.ReactElement => {
  const modalController = useSinglePostModal(reviewData);

  const removeHandler = useCallback(
    (id: string) => {
      modalController.closeModal();
      modalController.handleRemoveCache(id);
      handleRemoveCache(id);
    },
    [modalController.showModal, reviewData]
  );

  return (
    <>
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
              onClick={modalController.openModal(v.docId)}
              placeName={v.placeName}
              thumnail={v.thumbNail}
              commentsLength={v.commentsLength}
            />
          ))}
        </S.ReviewContainer>
      </S.Container>
      {modalController.showModal && (
        <Modal onClick={modalController.closeModal}>
          <Card isModal={true}>
            {!modalController.singleReview ||
            modalController.singleReviewFetchStatus === REQUEST ||
            modalController.singleReviewFetchStatus === SUCCESS ? (
              <LoadingSinglePost />
            ) : (
              <SinglePost
                data={modalController.singleReview}
                removeHandler={removeHandler}>
                <ControllerBtn
                  hasPrev={modalController.index > 0}
                  hasNext={modalController.index < reviewData.length - 1}
                  onClickPrev={modalController.prevHandler}
                  onClickNext={modalController.nextHandler}
                />
              </SinglePost>
            )}
          </Card>
        </Modal>
      )}
    </>
  );
};

export default PostList;
