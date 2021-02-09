import { serialize } from 'cookie';
import getFirebaseAdmin from '../../../firebase/admin';

const auth = async (req, res) => {
  const admin = await getFirebaseAdmin();
  const expiresIn = 60 * 60 * 1000;
  if (req.method === 'POST') {
    let idToken = req.body.token;
    const cookie = await admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 60 * 60) {
          return admin.auth().createSessionCookie(idToken, { expiresIn });
        }
        res.status(401).send('Recent Sign in required');
      });
    if (cookie) {
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === 'true',
        path: '/',
      };
      res.setHeader('Set-Cookie', serialize('user', cookie, options));
      res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }));
    } else {
      res.status(401).send('Invalid Authentication');
    }
  }
};

export default auth;
