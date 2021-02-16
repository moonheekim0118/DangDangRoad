import verifyCookie from 'api/verifyCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

// check and verify Session Cookie
const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let authInfo = {
      isLoggedIn: false,
    };
    const cookie = req.cookies;
    if (cookie.user) {
      const authentication = await verifyCookie(cookie.user);
      if (authentication) {
        authInfo = authentication;
      }
    }
    res.status(200).send(authInfo);
  } catch (error) {
    res.status(401).send(error);
  }
};

export default checkAuth;
