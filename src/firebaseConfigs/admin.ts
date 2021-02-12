import * as admin from 'firebase-admin';
import firebaseAccountCredentials from '../../serviceaccount.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

async function getFirebaseAdmin() {
  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // databaseURL: procc
    });
  }

  return admin;
}

export default getFirebaseAdmin;
