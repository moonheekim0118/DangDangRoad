import algoliasearch from 'algoliasearch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { getCommentsCount } from 'api/comment';
import { LightReview } from 'types/Review';
import * as T from 'types/API';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_APP_KEY || ''
);
const index = client.initIndex('reviews');
let cachedData = {};

// search Query with algolia
// get All the data
const getDatasFromAlgolia = async (keyword: string): Promise<LightReview[]> => {
  try {
    const response = await index.search(keyword);
    let reviews: LightReview[] = [];
    response.hits.forEach((data) => {
      const review = {
        docId: data.objectID,
        thumbNail: data['imageList'] ? data['imageList'][0] : null,
        placeName: data['placeInfo']['place_name'],
        createdAt: data['createdAt'],
      };
      reviews.push(review);
    });
    for (const reviewData of reviews) {
      const legnthCount = await getCommentsCount(reviewData.docId);
      reviewData['commentsLength'] = legnthCount.data;
    }
    return reviews.sort((a, b) => b.createdAt - a.createdAt); // recent
  } catch (error) {
    throw error;
  }
};

const searchByKeyword = async (query: string): T.APIResponse<LightReview[]> => {
  try {
    if (!cachedData[query]) {
      const result = await getDatasFromAlgolia(query);
      cachedData[query] = result;
    }
    const data = cachedData[query].splice(0, REVIEW_DATA_LIMIT);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

export default searchByKeyword;
