import db from 'firebaseConfigs/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    if (id && typeof id === 'string') {
      const userInfo = await db.collection('users').doc(id).get();
      if (!userInfo.exists) {
        throw 'No User';
      }
      return res.status(200).send({ data: userInfo.data() });
    } else {
      throw 'No User';
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export default user;
