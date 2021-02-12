import { serialize } from 'cookie';
import getFirebaseAdmin from 'firebaseConfigs/admin';

const EXPIRE = 60 * 60;
// 쿠키 생성해주는 api
const auth = async (req, res) => {
  try {
    const admin = await getFirebaseAdmin();
    const expiresIn = EXPIRE * 1000; // 1hour
    if (req.method === 'POST') {
      const idToken = req.body.token; // 토큰 가져오기
      const decodedIdToken = await admin.auth().verifyIdToken(idToken); // 파이어베이스 토큰 인증
      let cookie;
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < EXPIRE) {
        cookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
      } else {
        res.status(401).send('Recent Sign In Required!');
      }

      // 쿠키 생성 완료 -> 토큰 인증 완료 -> authentication 완료
      if (cookie) {
        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // production 시 secure
          path: '/',
        };
        res.setHeader('Set-Cookie', serialize('user', cookie, options)); // 쿠키 set
        res
          .status(200)
          .end(JSON.stringify({ response: 'Succesfull logged in' }));
      } else {
        // Authentication 잘못됨
        res.status(401).send('Invalid Authentication');
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default auth;
