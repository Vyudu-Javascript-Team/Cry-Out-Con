import express from 'express';
import dotenv from 'dotenv';
import { registerEndpoints } from './src/api/endpoints';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static('dist'));

// Register API endpoints
registerEndpoints(app);

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});