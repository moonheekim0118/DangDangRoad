import getFirebase from 'firebaseConfigs/firebase';
import * as T from 'types/API';
import { v4 as uuidv4 } from 'uuid';

const firebase = getFirebase();
const storage = firebase.storage();

/** upload Image in firebase Storage and get URL */
export const uploadImage = async (
  file: T.FileType[]
): T.APIResponse<string[]> => {
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

    return { isError: false, data: url };
  } catch (error) {
    throw error;
  }
};
