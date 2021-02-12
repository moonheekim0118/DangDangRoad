import { serialize } from 'cookie';

// remove Session-Cookie
const removeAuth = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    serialize('user', '', {
      maxAge: -1,
      path: '/',
    })
  );
  res.end();
};

export default removeAuth;
