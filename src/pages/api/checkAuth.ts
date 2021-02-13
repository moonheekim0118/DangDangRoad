import verifyCookie from 'api/verifyCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

// check and verify Session Cookie
const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const propsObject = {
      authenticated: false,
      userId: '',
    };
    const cookie = req.cookies;
    if (cookie.user) {
      const authentication = await verifyCookie(cookie.user);
      propsObject.authenticated = authentication
        ? authentication.authenticated
        : false;
      propsObject.userId = authentication ? authentication.userId : '';
    }
    res.status(200).send(propsObject);
  } catch (error) {
    res.status(401).send(error);
  }
};

export default checkAuth;
