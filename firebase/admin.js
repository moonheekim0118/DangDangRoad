import * as admin from 'firebase-admin';
import serviceAccount from '../serviceaccount.json';

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
