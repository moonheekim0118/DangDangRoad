import verifyCookie from 'api/verifyCookie';

// remove Session-Cookie
const checkAuth = async (req, res) => {
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
