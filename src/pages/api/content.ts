import { NextApiRequest, NextApiResponse } from 'next';
import { getContentHandler } from '../../api/endpoints';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  await getContentHandler(req, res);
}
