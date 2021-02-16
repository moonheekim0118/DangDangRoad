import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

// remove Session-Cookie for logging out
const removeAuth = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    serialize('user', '', {
      maxAge: -1,
      path: '/',
    })
  );
  res.status(200).send('ok');
};

export default removeAuth;
