
function checkAuth() {
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
  }
}

function getUsername() {
  return localStorage.getItem('username');
}
