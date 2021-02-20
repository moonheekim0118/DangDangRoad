import type { NextApiRequest, NextApiResponse } from 'next';
import updatePasswordAdmin from 'adminSDK/updatePassword';

/** update password API for sdk access */
const updatePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const userId = req.body.id;
      const newPassword = req.body.newPassword;
      await updatePasswordAdmin(userId, newPassword);
      res.status(200).send('ok');
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export default updatePassword;
