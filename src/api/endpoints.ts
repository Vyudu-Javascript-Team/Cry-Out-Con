import { Request, Response } from 'express';
import { getContent, getSiteSettings } from '../services/sanityContent';

export const registerEndpoints = (app: any): void => {
  app.get('/api/content', async (req: Request, res: Response) => {
    try {
      const content = await getContent();
      res.json(content);
    } catch (error) {
      console.error('Error in /api/content:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/settings', async (req: Request, res: Response) => {
    try {
      const settings = await getSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error('Error in /api/settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};
