import { loadHeader, loadFooter, loadMobileMenu } from './javascript/components.js';
import { initAnimations } from './javascript/animations.js';
import { initUI } from './javascript/ui.js';
import { loadPropertyPage } from './javascript/property.js';
import { loadPortfolioGrid } from './javascript/portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Static Components
    loadHeader(false);
    loadMobileMenu();
    loadFooter();
    // 2. Initialize Page Specific Content
    // We run this BEFORE animations so the observer sees the new DOM elements
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