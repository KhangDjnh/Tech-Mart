document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Đăng nhập thành công');
      // Điều hướng tới trang chính
  } else {
      alert(data.message);
  }
});
