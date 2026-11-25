import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

const POSTS_IMAGES_URL = '/posts/images/';
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function postsImagesPlugin() {
  const imagesRoot = path.resolve(__dirname, 'posts', 'images');

  return {
    name: 'posts-images',
    configureServer(server: { middlewares: { use: (fn: unknown) => void } }) {
      server.middlewares.use((req: { url?: string }, res: any, next: () => void) => {
        const url = req.url || '';
        if (!url.startsWith(POSTS_IMAGES_URL)) {
          next();
          return;
        }
        try {
          const relative = decodeURIComponent(url.split('?')[0].slice(POSTS_IMAGES_URL.length));
          const filePath = path.resolve(imagesRoot, relative);
          if (!filePath.startsWith(imagesRoot + path.sep)) {
            next();
            return;
          }
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            next();
            return;
          }
          const ext = path.extname(filePath).toLowerCase();
          res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          fs.createReadStream(filePath).pipe(res);
        } catch {
          next();
        }
      });
    },
    closeBundle() {
      const destination = path.resolve(__dirname, 'dist', 'posts', 'images');
      if (!fs.existsSync(imagesRoot)) return;
      fs.mkdirSync(destination, { recursive: true });
      fs.cpSync(imagesRoot, destination, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), postsImagesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    allowedHosts: true,
  },
});
