import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
  build: {
    rollupOptions: {
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
        assetFileNames: (assetInfo) => {
          // Get the file extension
          const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
          
          // Get the full path parts
          const pathParts = assetInfo.name?.split('/') || [];
          const fileName = pathParts.pop() || '';
          const directory = pathParts.join('/');

          // Handle different asset types
          if (/\.(mp4|webm|ogg)$/i.test(assetInfo.name || '')) {
            return `assets/media/${fileName}`;
          }
          
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/${fileName}`;
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name || '')) {
            // Preserve the original directory structure for images
            if (directory) {
              return `${directory}/${fileName}`;
            }
            return `assets/images/${fileName}`;
          }
          
          
          return `assets/${fileName}`;
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
