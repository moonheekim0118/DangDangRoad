import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';

admin.initializeApp();
const env = functions.config();
const db = admin.firestore();
// init algolia client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('reviews');

/** save all the reviews now in db to Algolia */
export const sendReviewsToAlgolia = functions.https.onRequest(
  async (req, res) => {
    try {
      const algoliaRecords: any[] = [];
      const querySnapshot = await db.collection('reviews').get();
      querySnapshot.docs.forEach((doc) => {
        const document = doc.data();
        const record = {
          objectID: doc.id,
          ...document,
        };
        algoliaRecords.push(record);
      });

      index.saveObjects(algoliaRecords, (_error: any, content: any) => {
        res.status(200).send('review collection was indexed to Algolia');
      });
    } catch (error) {
      console.error(error);
    }
  }
);

const saveDocumentInAlgolia = async (snapshot: any) => {
  try {
    if (snapshot.exists) {
      const data = snapshot.data();
      if (data) {
        await index.saveObject({ objectID: snapshot.id, ...data });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteDocumentInAlgolia = async (
  snapshot: FirebaseFirestore.DocumentSnapshot
) => {
  try {
    if (snapshot.exists) {
      const objectID = snapshot.id;
      await index.deleteObject(objectID);
    }
  } catch (error) {
    console.error(error);
  }
};

const updateDocumentInAlgolia = async (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>
) => {
  try {
    const docBeforeChange = change.before.data();
    const docAfterChange = change.after.data();
    if (docBeforeChange && docAfterChange) {
      await deleteDocumentInAlgolia(change.before);
      await saveDocumentInAlgolia(change.after);
    }
  } catch (error) {}
};

// listen to create review
export const collectionOnCreate = functions.firestore
  .document('reviews/{uid}')
  .onCreate(async (snapshot, context) => {
    try {
      await saveDocumentInAlgolia(snapshot);
    } catch (error) {
      console.error(error);
    }
  });

// listen to update review
export const collectionOnUpdate = functions.firestore
  .document('reviews/{uid}')
  .onUpdate(async (change, context) => {
    try {
      await updateDocumentInAlgolia(change);
    } catch (error) {
      console.error(error);
    }
  });

// listen to delete review
export const collectionOnDelete = functions.firestore
  .document('reviews/{uid}')
  .onDelete(async (snapshot, context) => {
    try {
      await deleteDocumentInAlgolia(snapshot);
    } catch (error) {
      console.error(error);
    }
  });
