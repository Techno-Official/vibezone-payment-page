const API_BASE = "https://vibezone-backend.fly.dev/api";

// Enhanced checkAuth to support fallback from URL
function checkAuth() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    // Fallback if missing in localStorage
    if (!username) {
        const params = new URLSearchParams(window.location.search);
        const usernameFromUrl = params.get('username');
        if (usernameFromUrl) {
            localStorage.setItem('username', usernameFromUrl);
            username = usernameFromUrl;
        }
    }

    if (!username) {
        // Not logged in - redirect to login page
        window.location.href = 'login.html';
    }
}

// Login function
async function loginUser(email, password) {
    const res = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    window.location.href = 'dashboard.html';
}

// Signup function
async function signupUser(username, email, password) {
    const res = await fetch(`${API_BASE}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (!res.ok) throw new Error("Signup failed");

    // Auto login after signup
    await loginUser(email, password);
}

// Logout function
function logoutUser() {
    localStorage.clear();
    window.location.href = 'login.html';
}
