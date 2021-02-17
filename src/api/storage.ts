import getFirebase from 'firebaseConfigs/firebase';
import { v4 as uuidv4 } from 'uuid';

const firebase = getFirebase();
const storage = firebase.storage();

/** upload Image in firebase Storage and get URL */
export const uploadImage = async (file) => {
  try {
    const storageRef = storage.ref('');
    const uniqueName = uuidv4(); // make unique id for file name
    const fileName = `/images/${uniqueName}`;
    storageRef.child(fileName); // create ref
    await storage.ref(fileName).put(file); // upload
    const starsRef = storageRef.child(fileName);
    const url = await starsRef.getDownloadURL(); // get Url
    console.log(url);
    return { isError: false, url };
  } catch (error) {
    return {
      isError: true,
      errorMessage: '죄송합니다. 잠시후 다시 시도해주세요.',
    };
  }
};
