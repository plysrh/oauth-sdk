import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import { createServer as createViteDevServer } from 'vite';
import handler from './api/mock.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express();
  const vite = await createViteDevServer({
    appType: 'custom',
    server: { middlewareMode: true },
  })
  app.use(express.json());
  app.use('/api/oauth', handler);
  app.use(vite.middlewares);
  app.use('*all', async (request: Request, response: Response) => {
    const url = request.originalUrl;

    try {
      let html = await fs.readFile(
        path.resolve(__dirname, 'index.html'),
        { encoding: 'utf-8' },
      );

      html = await vite.transformIndexHtml(url, html);

      response
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error(error);
      response
        .status(500)
        .setHeader('Content-Type', 'text/plain')
        .end('Internal server error');
    }
  });

  app.listen(5173, () => {
    console.log('ViteDevServer in middleware mode running on http://localhost:5173/');
  });
}

createServer();
