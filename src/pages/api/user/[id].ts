import db from '../../../../firebase/db';

const user = async (req, res) => {
  try {
    const userInfo = await db.collection('users').doc(req.query.id).get();
    if (!userInfo.exists) {
      throw 'No User';
    }
    return res.json({ data: userInfo.data() });
  } catch (error) {
    res.json({ error });
  }
};

export default user;
