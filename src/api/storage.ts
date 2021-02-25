import getFirebase from 'firebaseConfigs/firebase';
import { v4 as uuidv4 } from 'uuid';

const firebase = getFirebase();
const storage = firebase.storage();

/** upload Image in firebase Storage and get URL */
export const uploadProfileImage = async (file) => {
  try {
    const storageRef = storage.ref('');
    const uniqueName = uuidv4(); // make unique id for file name
    const fileName = `/images/${uniqueName}`;
    storageRef.child(fileName); // create ref
    await storage.ref(fileName).put(file); // upload
    const starsRef = storageRef.child(fileName);
    const url = await starsRef.getDownloadURL(); // get Url

    return { isError: false, url };
  } catch (error) {
    return {
      isError: true,
      errorMessage: '죄송합니다. 잠시후 다시 시도해주세요.',
    };
  }
};

/** upload Image in firebase Storage and get URL */
export const uploadPostImage = async (file) => {
  try {
    const url: string[] = [];
    for (let i = 0; i < file.length; i++) {
      const storageRef = storage.ref('');
      const uniqueName = uuidv4(); // make unique id for file name
      const fileName = `/images/${uniqueName}`;
      storageRef.child(fileName); // create ref
      await storage.ref(fileName).put(file[i]); // upload
      const starsRef = storageRef.child(fileName);
      url.push(await starsRef.getDownloadURL());
    }

    return { isError: false, url };
  } catch (error) {
    return {
      isError: true,
      errorMessage: '죄송합니다. 잠시후 다시 시도해주세요.',
    };
  }
};
