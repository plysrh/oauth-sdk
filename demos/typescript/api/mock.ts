import { createServer } from 'http';
import { MOCK_USER } from './constants';

async function handler(request: { method: string; body: { provider: string; code: string } }) {
  if (request.method !== 'POST') {
    return { status: 405, json: { error: 'Method not allowed' } };
  }

  const { provider, code } = request.body;

  if (!code || !provider) {
    return { status: 400, json: { error: 'Missing code or provider' } };
  }

  if (code === 'invalid_code') {
    return { status: 500, json: { error: 'Authentication failed' } };
  }

  return {
    status: 200,
    json: {
      user: {
        id: MOCK_USER.ID,
        name: MOCK_USER.NAME,
        email: MOCK_USER.EMAIL,
        avatar: MOCK_USER.AVATAR,
        provider: MOCK_USER.PROVIDER,
      },
    },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = createServer(async (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
      response.writeHead(200);
      response.end();

      return;
    }

    if (request.url === '/backend' && request.method === 'POST') {
      let body = '';

      request.on('data', chunk => {
        body += chunk;
      });
      request.on('end', async () => {
        try {
          const parsedBody = JSON.parse(body);
          const result = await handler({ method: 'POST', body: parsedBody });

          response.writeHead(result.status, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(result.json));
        } catch {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Not found' }));
    }
  });
  const port = 3001;

  server.listen(port, () => {
    console.log(`Mock backend server running on http://localhost:${port}`);
  });
}
