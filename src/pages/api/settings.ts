import { NextApiRequest, NextApiResponse } from 'next';
import { getSettingsHandler } from '../../api/endpoints';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  await getSettingsHandler(req, res);
}
