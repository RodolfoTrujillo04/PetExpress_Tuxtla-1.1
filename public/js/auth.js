document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Login exitoso! Redirigiendo...', 'success');
                    setTimeout(() => {
                        if (data.user.rol === 'admin') {
                            window.location.href = '/admin';
                        } else {
                            window.location.href = '/';
                        }
                    }, 1000);
                } else {
                    showMessage(data.error, 'error');
                }
            } catch (error) {
                showMessage('Error de conexión', 'error');
            }
        });
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});