// Xử lý đăng nhập
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await loginUser(email, password);
        if (response.success) {
            localStorage.setItem('token', response.token);
            window.location.href = '/pages/profile.html';
        }
    } catch (error) {
        showNotification('Đăng nhập thất bại: ' + error.message, 'error');
    }
}

// Xử lý đăng ký
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    if (formData.password !== formData.confirmPassword) {
        showNotification('Mật khẩu không khớp!', 'error');
        return;
    }
    
    try {
        const response = await registerUser(formData);
        if (response.success) {
            showNotification('Đăng ký thành công!', 'success');
            window.location.href = '/pages/login.html';
        }
    } catch (error) {
        showNotification('Đăng ký thất bại: ' + error.message, 'error');
    }
}

// API calls
async function loginUser(email, password) {
    // Implement API call here
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            success: true,
            token: 'dummy-token'
        }), 1000);
    });
}

async function registerUser(userData) {
    // Implement API call here
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            success: true
        }), 1000);
    });
}

// Kiểm tra trạng thái đăng nhập
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/pages/login.html';
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/pages/login.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}); 