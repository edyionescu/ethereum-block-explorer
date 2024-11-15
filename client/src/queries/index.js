const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

async function fetchLatestBlocks({ queryKey }) {
  const [endpoint] = queryKey;

  let response;
  try {
    response = await fetch(`${SERVER}/latest-blocks`);
  } catch {
    // 'react-query' expects an error to be thrown when the response is not ok
    throw new Error(`Failed to fetch /${endpoint}`);
  }

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json(); // 'react-query' expects a promise
}

async function fetchBlock({ queryKey }) {
  const [endpoint, number] = queryKey;

  if (!number) {
    throw new Error(`Missing block number on /${endpoint}`);
  }

  let response;
  try {
    const qs = new URLSearchParams({ number });
    response = await fetch(`${SERVER}/block?${qs}`);
  } catch {
    throw new Error(`Failed to fetch /${endpoint}`);
  }

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json();
}

async function fetchTransaction({ queryKey }) {
  const [endpoint, hash] = queryKey;

  let response;
  try {
    const qs = new URLSearchParams({ hash });
    response = await fetch(`${SERVER}/transaction?${qs}`);
  } catch {
    throw new Error(`Failed to fetch /${endpoint}`);
  }

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json();
}

export { fetchLatestBlocks, fetchBlock, fetchTransaction, HOUR, MINUTE, SECOND };
