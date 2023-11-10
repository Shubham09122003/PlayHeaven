// Logout
const logoutLink = document.getElementById('logout-link').addEventListener('click', logoutUser);

function logoutUser() {
  sessionStorage.removeItem('currentUser');
  localStorage.removeItem('currentUser');
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: `You have ended session. Until next time!`,
    showConfirmButton: false,
    color: '#E2E8F0',
    background: '#1B202B',
    timer: 3000
  });
  setTimeout(() => {
    window.location.href = '/index.html';
  }, 4000);
}