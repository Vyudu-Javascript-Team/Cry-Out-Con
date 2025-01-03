import express from 'express';
import payload from 'payload';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { registerEndpoints } from './src/api/endpoints';

dotenv.config();

const app = express();

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/ces-cms',
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Register API endpoints
registerEndpoints(payload);

// Enable CORS for your frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve admin panel
app.use('/admin', payload.authenticate);

// Redirect root to Admin panel
// app.get('/', (_, res) => {
//   res.redirect('/admin');
// });

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});