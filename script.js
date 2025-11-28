import { loadHeader, loadFooter, loadMobileMenu } from './javascript/components.js';
import { initAnimations } from './javascript/animations.js';
import { initUI } from './javascript/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Components
    // Check if we are on portfolio page for dark mode nav
    const isPortfolio = window.location.pathname.includes('portfolio.html');
    loadHeader(isPortfolio); 
    loadMobileMenu();
    loadFooter();
    // 2. Initialize UI (Cursor, Menu, Scroll)
    initUI();
    // 3. Initialize Animations (Reveal, Parallax)
    initAnimations();
    // 4. Page Specific Logic
    if (window.location.pathname.includes('property.html')) {
        // Dynamic import to only load this logic when needed
        import('./javascript/property.js')
            .then(module => module.loadPropertyPage());
    }
});