// Search functionality
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', performSearch);
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
        // Here you would typically make an API call to your backend
        console.log(`Searching for: ${searchTerm}`);
        // Placeholder for API call
        // fetch('/api/search?q=' + encodeURIComponent(searchTerm))
        //     .then(response => response.json())
        //     .then(data => displayResults(data))
        //     .catch(error => console.error('Error:', error));
    }
}

// Category card click handlers
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h4').textContent;
        // Here you would typically navigate to the category page
        console.log(`Navigating to category: ${category}`);
    });
});

// Deal card hover effects
const dealCards = document.querySelectorAll('.deal-card');
dealCards.forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('h4').textContent;
        const price = card.querySelector('.best-price').textContent;
        // Here you would typically navigate to the product detail page
        console.log(`Viewing product: ${productName} at ${price}`);
    });
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            nav.insertBefore(menuButton, navLinks);
            menuButton.addEventListener('click', () => {
                navLinks.classList.toggle('show');
                menuButton.innerHTML = navLinks.classList.contains('show') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
    }
}

// Initialize mobile menu
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Price formatting helper
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Example function to display search results (to be implemented)
function displayResults(data) {
    const dealsGrid = document.querySelector('.deals-grid');
    dealsGrid.innerHTML = ''; // Clear existing results
    
    if (data && data.length > 0) {
        data.forEach(item => {
            const dealCard = createDealCard(item);
            dealsGrid.appendChild(dealCard);
        });
    } else {
        dealsGrid.innerHTML = '<p class="no-results">No results found</p>';
    }
}

// Helper function to create deal cards
function createDealCard(item) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.innerHTML = `
        <div class="deal-image">
            <img src="${item.image || 'https://via.placeholder.com/200'}" alt="${item.name}">
        </div>
        <div class="deal-info">
            <h4>${item.name}</h4>
            <div class="price-comparison">
                <span class="best-price">${formatPrice(item.price)}</span>
                <span class="original-price">${formatPrice(item.originalPrice)}</span>
            </div>
            <div class="store-info">
                <img src="${item.storeIcon}" alt="${item.storeName}">
                <span>${item.storeName}</span>
            </div>
        </div>
    `;
    return card;
} 