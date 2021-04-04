import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import getFirebaseAdmin from 'firebaseConfigs/admin';

const EXPIRE = 60 * 60;

/** creating new Session-Cookie in browser */
const createAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const admin = await getFirebaseAdmin();
    const expiresIn = EXPIRE * 1000; // 1hour
    if (req.method === 'POST') {
      const idToken = req.body.token; // get token
      const decodedIdToken = await admin.auth().verifyIdToken(idToken); // verifyToken
      let cookie = null as unknown;
      // check if token is created in an hour
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < EXPIRE) {
        cookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
      } else {
        res.status(401).json('Recent Sign In Required!');
      }

      // cookie is created
      if (cookie) {
        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // in Production mode
          path: '/',
        };

        res.setHeader('Set-Cookie', serialize('user', cookie, options)); // store cookie
        res.status(200).json('Succesfull logged in');
      } else {
        // unauthenticated
        res.status(401).json('Invalid Authentication');
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.data);
  }
};

export default createAuth;
