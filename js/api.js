
const token = localStorage.getItem('token');

async function fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  });
}
