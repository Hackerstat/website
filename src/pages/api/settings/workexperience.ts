import { NextApiRequest, NextApiResponse } from 'next';
import { updateExperience, deleteExperience, retrieveWorkExperience, addWorkExperience } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'GET') {
      try {
        const workExperience = await retrieveWorkExperience(req);
        res.status(200).json({ workExperience: workExperience });
      } catch (e) {
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'POST') {
      try {
        await addWorkExperience(req);
        res.status(200).send('OK');
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'PATCH') {
      try {
        await updateExperience(req);
        res.status(204).send('UPDATED');
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'DELETE') {
      try {
        await deleteExperience(req);
        res.status(204).send('DELETED');
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    }
  },
);

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
