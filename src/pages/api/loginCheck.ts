import verifyCookie from 'libs/verifyCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

// check and verify Session Cookie
const loginCheck = async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.status(200).json(authInfo);
  } catch (error) {
    res.status(401).json({ isLoggedIn: false });
  }
};

export default loginCheck;
