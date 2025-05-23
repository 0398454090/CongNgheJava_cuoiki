// Khởi tạo danh sách bất động sản
async function initializeListings() {
    try {
        const listings = await fetchListings();
        displayListings(listings);
        setupFilters();
    } catch (error) {
        showNotification('Không thể tải danh sách bất động sản', 'error');
    }
}

// Lấy danh sách bất động sản từ API
async function fetchListings(filters = {}) {
    // Implement API call here
    return new Promise((resolve) => {
        setTimeout(() => resolve([
            {
                id: 1,
                title: 'Căn hộ cao cấp Quận 1',
                price: '2.5 tỷ',
                location: 'Quận 1, TP.HCM',
                area: '100m²',
                bedrooms: 3,
                bathrooms: 2,
                image: '/assets/images/listings/apartment1.jpg'
            },
            // Thêm các bất động sản mẫu khác
        ]), 1000);
    });
}

// Hiển thị danh sách bất động sản
function displayListings(listings) {
    const container = document.getElementById('listingsContainer');
    if (!container) return;

    container.innerHTML = listings.map(listing => `
        <div class="property-card">
            <img src="${listing.image}" alt="${listing.title}">
            <div class="property-info">
                <h3>${listing.title}</h3>
                <p class="price">${listing.price}</p>
                <p class="location">${listing.location}</p>
                <div class="details">
                    <span>${listing.area}</span>
                    <span>${listing.bedrooms} phòng ngủ</span>
                    <span>${listing.bathrooms} phòng tắm</span>
                </div>
                <button onclick="viewListingDetails(${listing.id})" class="btn btn-primary">
                    Xem chi tiết
                </button>
            </div>
        </div>
    `).join('');
}

// Thiết lập bộ lọc
function setupFilters() {
    const filterForm = document.getElementById('filterForm');
    if (!filterForm) return;

    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(filterForm);
        const filters = Object.fromEntries(formData.entries());
        
        try {
            const listings = await fetchListings(filters);
            displayListings(listings);
        } catch (error) {
            showNotification('Không thể áp dụng bộ lọc', 'error');
        }
    });
}

// Xem chi tiết bất động sản
function viewListingDetails(id) {
    window.location.href = `/pages/listing-detail.html?id=${id}`;
}

// Tải chi tiết bất động sản
async function loadListingDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        showNotification('Không tìm thấy thông tin bất động sản', 'error');
        return;
    }
    
    try {
        const listing = await fetchListingDetails(id);
        displayListingDetails(listing);
    } catch (error) {
        showNotification('Không thể tải thông tin chi tiết', 'error');
    }
}

// Lấy thông tin chi tiết bất động sản
async function fetchListingDetails(id) {
    // Implement API call here
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            id: id,
            title: 'Căn hộ cao cấp Quận 1',
            price: '2.5 tỷ',
            location: 'Quận 1, TP.HCM',
            area: '100m²',
            bedrooms: 3,
            bathrooms: 2,
            description: 'Mô tả chi tiết về bất động sản...',
            images: [
                '/assets/images/listings/apartment1.jpg',
                '/assets/images/listings/apartment1-2.jpg'
            ]
        }), 1000);
    });
}

// Hiển thị chi tiết bất động sản
function displayListingDetails(listing) {
    const container = document.getElementById('listingDetails');
    if (!container) return;

    container.innerHTML = `
        <div class="listing-details">
            <div class="image-gallery">
                ${listing.images.map(img => `
                    <img src="${img}" alt="${listing.title}">
                `).join('')}
            </div>
            <div class="info">
                <h1>${listing.title}</h1>
                <p class="price">${listing.price}</p>
                <p class="location">${listing.location}</p>
                <div class="details">
                    <span>${listing.area}</span>
                    <span>${listing.bedrooms} phòng ngủ</span>
                    <span>${listing.bathrooms} phòng tắm</span>
                </div>
                <p class="description">${listing.description}</p>
                <button onclick="contactAgent(${listing.id})" class="btn btn-primary">
                    Liên hệ người môi giới
                </button>
            </div>
        </div>
    `;
}

// Liên hệ người môi giới
function contactAgent(listingId) {
    // Implement contact form or chat functionality
    showNotification('Đã gửi yêu cầu liên hệ', 'success');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('listingsContainer')) {
        initializeListings();
    } else if (document.getElementById('listingDetails')) {
        loadListingDetails();
    }
}); 