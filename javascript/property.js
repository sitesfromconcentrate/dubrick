import { propertyData } from './data.js';

export function loadPropertyPage() {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('id');
    const data = propertyData[propId];

    if (data) {
        document.title = `${data.title} | DUBRICK`;
        
        // Populate fields
        const titleEl = document.getElementById('dynamic-title');
        if(titleEl) titleEl.innerHTML = `<span>${data.title}</span>`;
        
        const subEl = document.getElementById('dynamic-subtitle');
        if(subEl) subEl.textContent = data.subtitle;
        
        const imgElement = document.getElementById('dynamic-image');
        if(imgElement) {
            imgElement.src = data.image;
            imgElement.alt = data.title;
        }

        const descEl = document.getElementById('dynamic-desc');
        if(descEl) descEl.textContent = data.description;
        
        const locEl = document.getElementById('dynamic-location');
        if(locEl) locEl.textContent = data.location;

        // Render Stats
        const statsContainer = document.getElementById('dynamic-stats');
        if(statsContainer) {
            statsContainer.innerHTML = data.stats.map(stat => `
                <div class="stat-row">
                    <span class="stat-label">${stat.label}</span>
                    <span class="stat-value">${stat.value}</span>
                </div>
            `).join('');
        }
    } else {
        // Simple error handling
        const titleEl = document.getElementById('dynamic-title');
        if(titleEl) titleEl.textContent = "Property Not Found";
        
        const descEl = document.getElementById('dynamic-desc');
        if(descEl) descEl.innerHTML = "We couldn't find the property you're looking for. <a href='portfolio.html' class='underline'>Return to Portfolio</a>.";
    }
}