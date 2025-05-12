
const API_BASE = "https://your-backend.com/api";

async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/login/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('username', data.username);
  window.location.href = 'dashboard.html';
}

async function signupUser(username, email, password) {
  const res = await fetch(`${API_BASE}/signup/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, email, password})
  });
  if (!res.ok) throw new Error("Signup failed");
  await loginUser(email, password);
}

function logoutUser() {
  localStorage.clear();
  window.location.href = 'login.html';
}
