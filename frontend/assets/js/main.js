// Hàm khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    setupEventListeners();
});

// Khởi tạo navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Xử lý form submit
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });

    // Xử lý responsive menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    }
}

// Xử lý form submit
function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form data
    if (validateFormData(data)) {
        // Gửi dữ liệu lên server
        submitFormData(data)
            .then(response => {
                showNotification('Thành công!', 'success');
                form.reset();
            })
            .catch(error => {
                showNotification('Có lỗi xảy ra!', 'error');
            });
    }
}

// Validate form data
function validateFormData(data) {
    // Implement validation logic here
    return true;
}

// Submit form data to server
async function submitFormData(data) {
    // Implement API call here
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000);
    });
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 