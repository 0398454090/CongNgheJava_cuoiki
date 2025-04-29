document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    checkAuth();
    
    // Khởi tạo các sự kiện
    initializeEvents();
    
    // Tải dữ liệu người dùng
    loadUserData();
    
    // Tải lịch sử giao dịch
    loadTransactions();
    
    // Tải danh sách yêu thích
    loadFavorites();
    
    // Tải cài đặt thông báo
    loadNotificationSettings();
});

// // Kiểm tra đăng nhập
// function checkAuth() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         window.location.href = '/pages/login.html';
//         return;
//     }
// }

// Khởi tạo các sự kiện
function initializeEvents() {
    // Form thông tin cá nhân
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Form bảo mật
    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', handlePasswordChange);
    }
    
    // Form thông báo
    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', handleNotificationSettings);
    }
    
    // Xử lý đổi ảnh đại diện
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarPreview);
    }
    
    const saveAvatarBtn = document.getElementById('saveAvatar');
    if (saveAvatarBtn) {
        saveAvatarBtn.addEventListener('click', handleAvatarSave);
    }
}

// Tải dữ liệu người dùng
async function loadUserData() {
    try {
        // TODO: Thay thế bằng API call thực tế
        const userData = await fetchUserData();
        
        // Cập nhật thông tin hiển thị
        document.getElementById('userName').textContent = userData.fullName;
        document.getElementById('userEmail').textContent = userData.email;
        
        // Cập nhật form thông tin cá nhân
        document.getElementById('fullName').value = userData.fullName;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('birthDate').value = userData.birthDate;
        document.getElementById('address').value = userData.address;
        
        // Cập nhật ảnh đại diện
        if (userData.avatar) {
            document.querySelector('.rounded-circle').src = userData.avatar;
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
        showNotification('Không thể tải thông tin người dùng', 'error');
    }
}

// Tải lịch sử giao dịch
async function loadTransactions() {
    try {
        // TODO: Thay thế bằng API call thực tế
        const transactions = await fetchTransactions();
        
        const tableBody = document.getElementById('transactionsTableBody');
        if (!tableBody) return;
        
        // Xóa dữ liệu cũ
        tableBody.innerHTML = '';
        
        // Thêm dữ liệu mới
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.property}</td>
                <td>${transaction.type}</td>
                <td>${formatCurrency(transaction.amount)}</td>
                <td><span class="badge bg-${getStatusBadgeClass(transaction.status)}">${transaction.status}</span></td>
                <td>${formatDate(transaction.date)}</td>
            `;
            
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Lỗi khi tải lịch sử giao dịch:', error);
        showNotification('Không thể tải lịch sử giao dịch', 'error');
    }
}

// Tải danh sách yêu thích
async function loadFavorites() {
    try {
        // TODO: Thay thế bằng API call thực tế
        const favorites = await fetchFavorites();
        
        const container = document.getElementById('favoritesContainer');
        if (!container) return;
        
        // Xóa dữ liệu cũ
        container.innerHTML = '';
        
        // Thêm dữ liệu mới
        favorites.forEach(property => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            
            col.innerHTML = `
                <div class="card property-card">
                    <img src="${property.image}" class="card-img-top" alt="${property.name}">
                    <div class="card-body">
                        <h5 class="card-title">${property.name}</h5>
                        <p class="card-text">${formatCurrency(property.price)} | ${property.area} | ${property.bedrooms} phòng ngủ</p>
                        <div class="d-flex justify-content-between">
                            <a href="/pages/property-detail.html?id=${property.id}" class="btn btn-primary btn-sm">Xem chi tiết</a>
                            <button class="btn btn-outline-danger btn-sm" onclick="removeFavorite('${property.id}')">
                                <i class="bi bi-heart-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(col);
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách yêu thích:', error);
        showNotification('Không thể tải danh sách yêu thích', 'error');
    }
}

// Tải cài đặt thông báo
async function loadNotificationSettings() {
    try {
        // TODO: Thay thế bằng API call thực tế
        const settings = await fetchNotificationSettings();
        
        document.getElementById('emailNotifications').checked = settings.emailNotifications;
        document.getElementById('smsNotifications').checked = settings.smsNotifications;
        document.getElementById('priceAlerts').checked = settings.priceAlerts;
        document.getElementById('newListings').checked = settings.newListings;
    } catch (error) {
        console.error('Lỗi khi tải cài đặt thông báo:', error);
        showNotification('Không thể tải cài đặt thông báo', 'error');
    }
}

// Xử lý cập nhật thông tin cá nhân
async function handleProfileUpdate(event) {
    event.preventDefault();
    
    try {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthDate: document.getElementById('birthDate').value,
            address: document.getElementById('address').value
        };
        
        // TODO: Thay thế bằng API call thực tế
        await updateProfile(formData);
        
        showNotification('Cập nhật thông tin thành công', 'success');
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
        showNotification('Không thể cập nhật thông tin', 'error');
    }
}

// Xử lý đổi mật khẩu
async function handlePasswordChange(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu mới không khớp', 'error');
        return;
    }
    
    try {
        // TODO: Thay thế bằng API call thực tế
        await changePassword(currentPassword, newPassword);
        
        // Xóa form
        event.target.reset();
        
        showNotification('Đổi mật khẩu thành công', 'success');
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        showNotification('Không thể đổi mật khẩu', 'error');
    }
}

// Xử lý cài đặt thông báo
async function handleNotificationSettings(event) {
    event.preventDefault();
    
    try {
        const settings = {
            emailNotifications: document.getElementById('emailNotifications').checked,
            smsNotifications: document.getElementById('smsNotifications').checked,
            priceAlerts: document.getElementById('priceAlerts').checked,
            newListings: document.getElementById('newListings').checked
        };
        
        // TODO: Thay thế bằng API call thực tế
        await updateNotificationSettings(settings);
        
        showNotification('Cập nhật cài đặt thành công', 'success');
    } catch (error) {
        console.error('Lỗi khi cập nhật cài đặt:', error);
        showNotification('Không thể cập nhật cài đặt', 'error');
    }
}

// Xử lý xem trước ảnh đại diện
function handleAvatarPreview(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('avatarPreview').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Xử lý lưu ảnh đại diện
async function handleAvatarSave() {
    const fileInput = document.getElementById('avatarInput');
    const file = fileInput.files[0];
    if (!file) {
        showNotification('Vui lòng chọn ảnh', 'error');
        return;
    }
    
    try {
        // TODO: Thay thế bằng API call thực tế
        const formData = new FormData();
        formData.append('avatar', file);
        
        await updateAvatar(formData);
        
        // Cập nhật ảnh đại diện
        document.querySelector('.rounded-circle').src = document.getElementById('avatarPreview').src;
        
        // Đóng modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('changeAvatarModal'));
        modal.hide();
        
        showNotification('Cập nhật ảnh đại diện thành công', 'success');
    } catch (error) {
        console.error('Lỗi khi cập nhật ảnh đại diện:', error);
        showNotification('Không thể cập nhật ảnh đại diện', 'error');
    }
}

// Xóa khỏi danh sách yêu thích
async function removeFavorite(propertyId) {
    try {
        // TODO: Thay thế bằng API call thực tế
        await removeFavoriteProperty(propertyId);
        
        // Tải lại danh sách
        loadFavorites();
        
        showNotification('Đã xóa khỏi danh sách yêu thích', 'success');
    } catch (error) {
        console.error('Lỗi khi xóa khỏi danh sách yêu thích:', error);
        showNotification('Không thể xóa khỏi danh sách yêu thích', 'error');
    }
}

// Lấy class cho badge trạng thái
function getStatusBadgeClass(status) {
    switch (status) {
        case 'Hoàn thành':
            return 'success';
        case 'Đang xử lý':
            return 'warning';
        case 'Đã hủy':
            return 'danger';
        default:
            return 'secondary';
    }
}

// Định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Định dạng ngày tháng
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN');
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    // TODO: Implement notification UI
    console.log(`${type}: ${message}`);
}

// Mock API calls
async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                fullName: 'Nguyễn Văn A',
                email: 'nguyenvana@email.com',
                phone: '0123456789',
                birthDate: '1990-01-01',
                address: '123 Đường ABC, Quận 1, TP.HCM',
                avatar: '/assets/images/avatar-default.jpg'
            });
        }, 1000);
    });
}

async function fetchTransactions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 'GD001',
                    property: 'Căn hộ cao cấp Quận 1',
                    type: 'Mua bán',
                    amount: 2500000000,
                    status: 'Hoàn thành',
                    date: '2024-05-15'
                },
                {
                    id: 'GD002',
                    property: 'Nhà phố Quận 2',
                    type: 'Cho thuê',
                    amount: 15000000,
                    status: 'Đang xử lý',
                    date: '2024-05-14'
                }
            ]);
        }, 1000);
    });
}

async function fetchFavorites() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 'P001',
                    name: 'Căn hộ cao cấp Quận 1',
                    price: 2500000000,
                    area: '100m²',
                    bedrooms: 3,
                    image: '/assets/images/properties/apartment1.jpg'
                },
                {
                    id: 'P002',
                    name: 'Nhà phố Quận 2',
                    price: 3800000000,
                    area: '150m²',
                    bedrooms: 4,
                    image: '/assets/images/properties/house1.jpg'
                }
            ]);
        }, 1000);
    });
}

async function fetchNotificationSettings() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                emailNotifications: true,
                smsNotifications: false,
                priceAlerts: true,
                newListings: true
            });
        }, 1000);
    });
}

async function updateProfile(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}

async function changePassword(currentPassword, newPassword) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}

async function updateNotificationSettings(settings) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}

async function updateAvatar(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}

async function removeFavoriteProperty(propertyId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
} 