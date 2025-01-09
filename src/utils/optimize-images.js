import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const assetsDir = path.join(__dirname, '../assets');
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  
  async function processDirectory(directoryPath) {
    try {
      const files = await fs.readdir(directoryPath);
      
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isDirectory()) {
          // Recursively process subdirectories
          await processDirectory(filePath);
        } else {
          const ext = path.extname(file).toLowerCase();
          if (imageExtensions.includes(ext) && 
              !file.includes('-optimized') && 
              !file.includes('-blur')) {

            const outputPath = filePath.replace(ext, `-optimized${ext}`);
            const blurPath = filePath.replace(ext, `-blur${ext}`);
            
            try {
                const metadata = await sharp(filePath).metadata();

              await sharp(filePath)
                .resize({
                  width: metadata.width > 1920 ? 1920 : metadata.width, 
                  height: metadata.height > 1920 ? 1920 : metadata.height, 
                  fit: 'inside', 
                  withoutEnlargement: true 
                })
                .jpeg({
                  quality: 80,
                  progressive: true,
                  mozjpeg: true
                })
                .toFile(outputPath);

              // create blur version
              await sharp(filePath)
              .resize({
                width: Math.round(metadata.width / 20),
                height: Math.round(metadata.height / 20),
                fit: 'inside'
              })
                .blur(5)
                .jpeg({
                  quality: 30
                })
                .toFile(blurPath);

              const originalSize = stats.size;
              const optimizedStats = await fs.stat(outputPath);
              const savedSize = ((originalSize - optimizedStats.size) / originalSize * 100).toFixed(2);
              
              console.log(`✅ Optimized: ${file}`);
              console.log(`   Size reduced by ${savedSize}%`);
            } catch (error) {
              console.error(`❌ Error optimizing ${file}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error processing directory:', error);
    }
  }

  try {
    await fs.access(assetsDir);
    console.log('Starting image optimization...');
    console.log('Assets directory:', assetsDir);
    await processDirectory(assetsDir);
    console.log('Image optimization complete! 🎉');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Assets directory not found at: ${assetsDir}`);
    } else {
      console.error('Error:', error);
    }
  }
}

// Run the optimization
optimizeImages().catch(console.error);
