import db from 'firebaseConfigs/db';

const user = async (req, res) => {
  try {
    const userInfo = await db.collection('users').doc(req.query.id).get();
    if (!userInfo.exists) {
      throw 'No User';
    }
    return res.status(200).send({ data: userInfo.data() });
  } catch (error) {
    res.status(400).send(error);
  }
};

export default user;
