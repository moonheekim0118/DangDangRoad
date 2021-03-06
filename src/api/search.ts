import algoliasearch from 'algoliasearch';
import * as T from 'types/API';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_APP_KEY || ''
);
const index = client.initIndex('reviews');

// search Query with algolia
const searchByKeyword = async (
  keyword: string
): T.APIResponse<T.lightReviewData[]> => {
  try {
    const response = await index.search(keyword);
    let reviews: T.lightReviewData[] = [];
    response.hits.forEach((data) => {
      const review = {
        docId: data.objectID,
        thumbNail: data['imageList'] ? data['imageList'][0] : null,
        placeName: data['placeInfo']['place_name'],
        createdAt: data['createdAt'],
      };
      reviews.push(review);
    });
    return { isError: false, data: reviews };
  } catch (error) {
    throw error;
  }
};

export default searchByKeyword;
