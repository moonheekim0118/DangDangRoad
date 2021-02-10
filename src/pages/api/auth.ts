import { serialize } from 'cookie';
import getFirebaseAdmin from '../../../firebase/admin';

// 쿠키 생성해주는 api
const auth = async (req, res) => {
  const admin = await getFirebaseAdmin();
  const expiresIn = 60 * 60 * 1000; // 1hour
  if (req.method === 'POST') {
    let idToken = req.body.token; // 토큰 가져오기
    const cookie = await admin
      .auth()
      .verifyIdToken(idToken) // 파이어베이스 토큰 인증
      .then((decodedIdToken) => {
        // 1 hour 안에 로그인 요청 했을 시
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 60 * 60) {
          return admin.auth().createSessionCookie(idToken, { expiresIn });
        }
        // 1 hour 안에 로그인 요청 X ==> 다시 로그인해야함
        res.status(401).send('Recent Sign in required');
      });
    // 쿠키 생성 완료 -> 토큰 인증 완료 -> authentication 완료
    if (cookie) {
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // production 시 secure
        path: '/',
      };
      res.setHeader('Set-Cookie', serialize('user', cookie, options)); // 쿠키 set
      res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }));
    } else {
      // Authentication 잘못됨
      res.status(401).send('Invalid Authentication');
    }
  }
};

export default auth;
