import { useEffect, useState, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { updateReview } from 'api/review';
import { PlaceType } from 'types/Map';
import { NO_UPDATE_ERROR, UPDATE_MESSAGE } from 'common/constant/string';
import { WriteReviewParams } from 'types/API';
import { FullReview } from 'types/Review';
import { RefType, defaultRef, InputRef, inputDefaultRef } from 'types/Ref';
import { PostEditor } from 'components/Post/PostUpload';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';

interface Props {
  /** updating-post data */
  initialData: FullReview;
  /** author & now loggedIn user's id */
  userId: string;
  /** update Cache handler */
  updateCache: (postId: string, data: FullReview) => void;
}

const UpdatePost = ({
  initialData,
  userId,
  updateCache,
}: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const freeTextRef = useRef<InputRef>(inputDefaultRef(initialData.freeText));
  const hasParkingLotRef = useRef<InputRef>(
    inputDefaultRef(initialData.hasParkingLot)
  );
  const hasOffLeashRef = useRef<InputRef>(
    inputDefaultRef(initialData.hasOffLeash)
  );
  const recommendationRef = useRef<InputRef>(
    inputDefaultRef(initialData.recommendation)
  );
  const imageUrlRef = useRef<RefType<string[]>>(
    defaultRef<string[]>(initialData.imageList ? initialData.imageList : [])
  );

  const [result, dispatch, setDefault] = useApiFetch<WriteReviewParams>(
    updateReview
  );

  const [selectedPlace, setSelectedPlace] = useState<PlaceType>(
    initialData.placeInfo
  );

  useEffect(() => {
    switch (result.type) {
      case SUCCESS:
        notiDispatch(Action.showSuccess(UPDATE_MESSAGE));
        if (result.data) {
          const updatedData = {
            ...initialData,
            ...result.data,
          };
          updateCache(initialData.docId, updatedData);
        }
        Router.push(routes.SEARCH);
        return;
      case FAILURE:
        notiDispatch(Action.showError(result.error));
        setDefault();
        return;
    }
  }, [result]);

  const handleSelectPlace = (place: PlaceType) => () => {
    setSelectedPlace(place);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { value: freeText } = freeTextRef.current;
    const { value: hasParkingLot } = hasParkingLotRef.current;
    const { value: hasOffLeash } = hasOffLeashRef.current;
    const { value: recommendation } = recommendationRef.current;
    const { value: imageUrl } = imageUrlRef.current;

    if (
      freeText === initialData.freeText &&
      hasParkingLot === initialData.hasParkingLot &&
      hasOffLeash === initialData.hasOffLeash &&
      recommendation === initialData.recommendation &&
      imageUrl === initialData.imageList &&
      selectedPlace === initialData.placeInfo
    ) {
      return notiDispatch(Action.showError(NO_UPDATE_ERROR));
    }
    const data = {
      userId,
      hasParkingLot,
      hasOffLeash,
      recommendation,
      freeText,
      imageList: imageUrl,
      placeInfo: {
        address_name: selectedPlace.address_name,
        place_name: selectedPlace.place_name,
        x: selectedPlace.x,
        y: selectedPlace.y,
      },
    };
    dispatch({
      type: REQUEST,
      params: [initialData?.docId, data],
    });
  };

  return (
    <PostEditor
      onClickPlace={handleSelectPlace}
      selectedPlace={selectedPlace}
      imageList={initialData.imageList || []}
      imageUrlRef={imageUrlRef}
      freeTextRef={freeTextRef}
      freeText={initialData.freeText}
      hasParkingLotRef={hasParkingLotRef}
      hasParkingLot={initialData.hasParkingLot}
      hasOffLeashRef={hasOffLeashRef}
      hasOffLeash={initialData.hasOffLeash}
      recommendationRef={recommendationRef}
      recommendation={initialData.recommendation}
      loading={result.type === REQUEST}
      onSubmit={handleSubmit}
    />
  );
};

export default UpdatePost;
