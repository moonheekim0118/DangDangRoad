import type { NextApiRequest, NextApiResponse } from 'next';
import destroyAccount from 'adminSDK/destroyAccount';

/** destroy User API fro sdk access*/
const destroyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const userId = req.body.id;
      await destroyAccount(userId);
      res.status(200).send('ok');
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export default destroyUser;
