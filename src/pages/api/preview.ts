import { NextApiRequest, NextApiResponse } from 'next';
import { getPageContent } from '../../services/sanityContent';

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id || !req.query.type) {
    return res.status(401).json({ message: 'Invalid preview request' });
  }

  // Enable preview mode
  res.setPreviewData({
    documentId: req.query.id,
    documentType: req.query.type,
  });

  // Redirect to the path from the fetched document
  // We can use different logic for different document types
  switch (req.query.type) {
    case 'speaker':
      res.redirect(`/speakers/${req.query.id}`);
      break;
    case 'section':
      res.redirect('/');
      break;
    default:
      res.redirect('/');
  }
}
