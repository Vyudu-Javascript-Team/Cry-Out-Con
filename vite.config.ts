import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { PreRenderedAsset } from 'rollup';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 90
      },
      jpeg: {
        quality: 90
      },
      png: {
        quality: 90
      },
      webp: {
        quality: 90
      }
    })
  ],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.ico', '**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.otf'],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            'framer-motion'
          ]
        },
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          const filePath = assetInfo.originalFileNames?.[0] || assetInfo.name || '';
          
          if (!filePath) {
            return 'assets/[name][extname]';
          }

          const cleanPath = filePath.replace(/^src\//, '');

          switch (true) {
            // Images - maintain original structure
            case /\.(png|jpe?g|gif|svg|webp|ico)$/i.test(filePath):
              return cleanPath;

            // Fonts
            case /\.(woff2?|eot|ttf|otf)$/i.test(filePath):
              return cleanPath.includes('fonts/') 
                ? cleanPath 
                : `assets/fonts/${cleanPath.split('/').pop()}`;

            // Videos
            case /\.(mp4|webm|ogg)$/i.test(filePath):
              return cleanPath.includes('videos/') 
                ? cleanPath 
                : `assets/videos/${cleanPath.split('/').pop()}`;

            // Default case for other assets
            default:
              return `assets/${cleanPath.split('/').pop()}`;
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    chunkSizeWarningLimit: 2000, // Increase warning limit to 2MB
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined
    sourcemap: true
  },
  optimizeDeps: {
    exclude: ['three']
  },
  resolve: {
    alias: {
      'locomotive-scroll': 'locomotive-scroll/dist/locomotive-scroll.modern.js'
    }
  }
});
