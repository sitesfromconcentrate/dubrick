import { loadHeader, loadFooter, loadMobileMenu } from './javascript/components.js';
import { initAnimations } from './javascript/animations.js';
import { initUI } from './javascript/ui.js';
import { loadPropertyPage } from './javascript/property.js';
import { loadPortfolioGrid } from './javascript/portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- FORCE SCROLL TO TOP ---
    // This tells the browser not to restore the previous scroll position
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // This ensures the window is visually at the top
    window.scrollTo(0, 0);
    // 1. Inject Static Components
    loadHeader();
    loadMobileMenu();
    loadFooter();
    // 2. Initialize Page Specific Content
    if (window.location.pathname.includes('property.html')) {
        loadPropertyPage();
    }
    if (window.location.pathname.includes('portfolio.html')) {
        loadPortfolioGrid();
    }
    // 3. Initialize UI (Cursor, Menu, Scroll)
    initUI();
    // 4. Initialize Animations (Reveal, Parallax)
    initAnimations();
});