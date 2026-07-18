import { createRequestHandler } from '../server/app.mjs';
import { config } from '../server/config.mjs';
import { bootstrapAdmin, cleanupExpiredRecords, createDatabase } from '../server/database.mjs';

const handlerPromise = createDatabase(config.databaseUrl).then(async (db) => {
  await bootstrapAdmin(db);
  await cleanupExpiredRecords(db);
  return createRequestHandler({ db, config });
});

export default async function handler(req, res) {
  const rewrittenUrl = new URL(req.url, 'http://localhost');
  const forwardedPath = rewrittenUrl.searchParams.get('__path');

  if (forwardedPath) {
    rewrittenUrl.searchParams.delete('__path');
    const query = rewrittenUrl.searchParams.toString();
    req.url = `/api/${forwardedPath}${query ? `?${query}` : ''}`;
  }

  return (await handlerPromise)(req, res);
}
