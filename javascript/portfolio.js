import { propertyData } from './data.js';

export function loadPortfolioGrid() {
    const gridContainer = document.querySelector('.portfolio-grid');
    
    // Safety check: ensure we are on the page with the grid
    if (!gridContainer) return;

    // Clear any existing content (like loading states)
    gridContainer.innerHTML = '';

    // Convert data object to array and map to HTML
    const entries = Object.entries(propertyData);

    entries.forEach(([id, data], index) => {
        // Calculate delay for staggered animation (100ms, 200ms, etc.)
        const delayClass = index < 4 ? `delay-${(index * 100) + 100}` : '';
        
        // Extract category (e.g., "Commercial • Retail" -> "Commercial")
        const typeShort = data.subtitle.split('•')[0].trim();

        const cardHTML = `
        <a href="property.html?id=${id}" class="prop-card hover-trigger reveal-text ${delayClass}">
            <div class="prop-image-wrapper">
                <img src="${data.image}" class="prop-img" alt="${data.title}">
                <div class="prop-overlay"></div>
            </div>
            <div class="prop-meta">
                <h3 class="prop-title display-font">${data.title}</h3>
                <span class="prop-type">${typeShort}</span>
            </div>
            <p class="prop-loc">${data.location}</p>
        </a>
        `;

        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}