import dotenv from 'dotenv';

dotenv.config();


export function apiKeyHeader({
  key = process.env.API_KEY,
  headerName = process.env.API_KEY_HEADER || 'x-api-key',
  extra = {}
} = {}) {
  if (!key) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  return { ...extra, [headerName]: key };
}

// API_KEY=demo-api-key-123
// API_KEY_QUERY_NAME=apikey


export function withApiKeyQuery(url, {
  key = process.env.API_KEY,
  queryName = process.env.API_KEY_QUERY_NAME || 'apikey'
} = {}) {
  if (!key) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  const hasQ = url.includes('?');
  const sep = hasQ ? '&' : '?';
  return `${url}${sep}${encodeURIComponent(queryName)}=${encodeURIComponent(key)}`;
}