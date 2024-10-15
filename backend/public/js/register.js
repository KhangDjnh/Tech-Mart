document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (response.ok) {
      alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
      window.location.href = '/login.html';  // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
  } else {
      alert(data.message);
  }
});
