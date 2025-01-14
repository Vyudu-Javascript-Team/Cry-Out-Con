import { NextApiRequest, NextApiResponse } from 'next';
import { getPageContent, getSettings, getSpeakers } from '../services/sanityContent';

export async function getContentHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const content = await getPageContent();
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getContentHandler:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
}

export async function getSettingsHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const settings = await getSettings();
    if (!settings) {
      res.status(404).json({ error: 'Settings not found' });
      return;
    }
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error in getSettingsHandler:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
}

export async function getSpeakersHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { category } = req.query;
    const speakers = await getSpeakers(category as string);
    res.status(200).json(speakers);
  } catch (error) {
    console.error('Error in getSpeakersHandler:', error);
    res.status(500).json({ error: 'Failed to fetch speakers' });
  }
}
