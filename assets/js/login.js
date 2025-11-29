
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

const loginForm = document.getElementById('loginForm');
const alertMessage = document.getElementById('alertMessage');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    console.log('Login attempt:', { email, password, rememberMe });
    showAlert('Login successful! Redirecting...', 'success');
    setTimeout(() => {
        console.log('Redirecting to dashboard...');
    }, 1500);
});
document.getElementById('googleLogin').addEventListener('click', function() {
    console.log('Google login clicked');
    showAlert('Google login feature coming soon!', 'success');
});

document.getElementById('microsoftLogin').addEventListener('click', function() {
    console.log('Microsoft login clicked');
    showAlert('Microsoft login feature coming soon!', 'success');
});

function showAlert(message, type) {
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type}`;
    alertMessage.style.display = 'block';
    
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 5000);
}

const inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});
