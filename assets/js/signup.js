const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

passwordInput.addEventListener('input', function () {
    const password = this.value;
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    strengthContainer.className = 'password-strength';

    if (password.length === 0) {
        strengthText.textContent = '-';
    } else if (strength <= 2) {
        strengthContainer.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthContainer.classList.add('strength-medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthContainer.classList.add('strength-strong');
        strengthText.textContent = 'Strong';
    }
});

const signupForm = document.getElementById('signupForm');
const alertMessage = document.getElementById('alertMessage');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearValidation();
    let isValid = true;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const businessName = document.getElementById('businessName').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    if (!firstName || firstName.length < 2) {
        setInvalid('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }
    if (!lastName || lastName.length < 2) {
        setInvalid('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        setInvalid('email', 'Please enter a valid email address');
        isValid = false;
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phone || phone.length < 10 || !phoneRegex.test(phone)) {
        setInvalid('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    if (!businessName || businessName.length < 2) {
        setInvalid('businessName', 'Business name must be at least 2 characters');
        isValid = false;
    }
    if (!password || password.length < 8) {
        setInvalid('password', 'Password must be at least 8 characters');
        isValid = false;
    } else if (!/[A-Z]/.test(password)) {
        setInvalid('password', 'Password must contain at least one uppercase letter');
        isValid = false;
    } else if (!/[a-z]/.test(password)) {
        setInvalid('password', 'Password must contain at least one lowercase letter');
        isValid = false;
    } else if (!/[0-9]/.test(password)) {
        setInvalid('password', 'Password must contain at least one number');
        isValid = false;
    }
    if (password !== confirmPassword) {
        setInvalid('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    if (!agreeTerms) {
        setInvalid('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }

    if (!isValid) {
        showAlert('Please fix the errors in the form', 'danger');
        return;
    }
    const formData = {
        firstName,
        lastName,
        email,
        phone,
        businessName,
        password
    };

    console.log('Signup data:', formData);

    showAlert('Account created successfully! Redirecting to login...', 'success');

    document.getElementById('submitBtn').disabled = true;

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});
function setInvalid(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');

    if (field) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    }

    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearValidation() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'businessName', 'password', 'confirmPassword'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + 'Error');

        if (field) {
            field.classList.remove('is-invalid', 'is-valid');
        }

        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    });
}
document.getElementById('googleSignup').addEventListener('click', function () {
    console.log('Google signup clicked');
    showAlert('Google signup feature coming soon!', 'success');
});

document.getElementById('microsoftSignup').addEventListener('click', function () {
    console.log('Microsoft signup clicked');
    showAlert('Microsoft signup feature coming soon!', 'success');
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
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim()) {
            this.classList.add('is-valid');
        }
    });
});
