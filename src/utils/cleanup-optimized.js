import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanupOptimized() {
  const assetsDir = path.join(__dirname, '../assets');

  async function cleanDirectory(directoryPath) {
    try {
      const files = await fs.readdir(directoryPath);

      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
          await cleanDirectory(filePath);
        } else {
          // Check if file is an optimized or blur version
          if (file.includes('-optimized') || file.includes('-blur')) {
            try {
              await fs.unlink(filePath);
              console.log(`✅ Deleted: ${file}`);
            } catch (error) {
              console.error(`❌ Error deleting ${file}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error processing directory:', error);
    }
  }

  try {
    console.log('Starting cleanup...');
    await cleanDirectory(assetsDir);
    console.log('Cleanup complete! 🧹');
  } catch (error) {
    console.error('Error:', error);
  }
}

cleanupOptimized().catch(console.error);
