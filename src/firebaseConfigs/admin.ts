import * as admin from 'firebase-admin';

async function getFirebaseAdmin() {
  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.CLIENT_EMAIL,
      }),
    });
  }

  return admin;
}

export default getFirebaseAdmin;
