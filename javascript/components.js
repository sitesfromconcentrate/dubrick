export function loadHeader(isDarkMode = false) {
    const navClass = isDarkMode ? 'nav nav-dark-mode' : 'nav';
    const html = `
    <div class="navbar container">
        <a href="index.html" class="nav-logo hover-trigger"><img src="assets/images/logo/logo.png" alt="Dubrick Property Management" class="logo-img"></a>
        <div class="nav-links">
            <a href="index.html" class="nav-link hover-trigger">Home</a>
            <a href="services.html" class="nav-link hover-trigger">Services</a>
            <a href="portfolio.html" class="nav-link hover-trigger">Portfolio</a>
            <a href="contact.html" class="nav-link hover-trigger">Contact</a>
        </div>
        <button class="mobile-menu-btn hover-trigger" id="mobile-menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
        </button>
    </div>`;
    const navElement = document.querySelector('nav');
    if(navElement) {
        navElement.className = navClass; // set class based on page type
        navElement.innerHTML = html;
        setActiveLink();
    }
}

export function loadFooter() {
    const year = new Date().getFullYear();
    const html = `
        <div class="footer-bottom">
            <span>© ${year} DUBRICK PROPERTY MANAGEMENT LTD.</span>
        </div>`;
    
    const footerElement = document.querySelector('footer');
    if(footerElement) footerElement.innerHTML = html;
}

export function loadMobileMenu() {
    // We inject the markup, logic is handled in UI.js
    const html = `
        <button id="close-menu" class="hover-trigger">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
        </button>
        <a href="index.html" class="mobile-link hover-trigger display-font">Home</a>
        <a href="services.html" class="mobile-link hover-trigger display-font">Services</a>
        <a href="portfolio.html" class="mobile-link hover-trigger display-font">Portfolio</a>
        <a href="contact.html" class="mobile-link hover-trigger display-font">Contact</a>
    `;
    const menuContainer = document.getElementById('mobile-menu');
    if(menuContainer) menuContainer.innerHTML = html;
}

function setActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html"; 
    document.querySelectorAll('.nav-link').forEach(link => {
        // Clear previous active states if any
        link.classList.remove('active-page'); 
        if(link.getAttribute('href') === page) {
            // Add a class to style via CSS instead
            link.classList.add('active-page');
            // Optional: Accessibility attribute
            link.setAttribute('aria-current', 'page');
        }
    });
}