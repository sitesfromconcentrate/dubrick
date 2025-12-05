import { propertyData } from './data.js';

export function loadPropertyPage() {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('id');
    const data = propertyData[propId];
    if (data) {
        // update title
        document.title = `${data.title} | DUBRICK`;
        // update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `Property Management details for ${data.title} in ${data.location}. ${data.subtitle}.`);
        }
        // populate fields
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
        const statsContainer = document.getElementById('dynamic-stats');
        if(statsContainer) {
            statsContainer.innerHTML = data.stats.map(stat => `
                <div class="stat-row">
                    <span class="stat-label">${stat.label}</span>
                    <span class="stat-value">${stat.value}</span>
                </div>
            `).join('');
        }
        // --- MAP INITIALIZATION START ---
        // 1. Check if map container exists and has coordinates
        const mapContainer = document.getElementById('property-map');
        if (mapContainer && data.lat && data.lng) {
            // 2. Initialize Leaflet
            // We disable scrollWheelZoom so users don't get stuck while scrolling the page
            const map = L.map('property-map', {
                scrollWheelZoom: false
            }).setView([data.lat, data.lng], 15);
            // 3. Add Tiles (CartoDB Positron - clean, grey, professional)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);
            // 4. Add Marker
            L.marker([data.lat, data.lng]).addTo(map)
                .bindPopup(`<b style="font-family: 'Grotesk'">${data.title}</b><br>${data.location}`)
                .openPopup();
            // 5. Force a resize to ensure tiles load correctly if container was hidden/animated
            setTimeout(() => { map.invalidateSize(); }, 300);
        } else if (mapContainer) {
            // Hide container if no coordinates exist for this specific property
            mapContainer.style.display = 'none';
        }
    } else {
        // simple error handling
        const titleEl = document.getElementById('dynamic-title');
        if(titleEl) titleEl.textContent = "Property Not Found";
        const descEl = document.getElementById('dynamic-desc');
        if(descEl) descEl.innerHTML = "We couldn't find the property you're looking for. <a href='portfolio.html' class='underline'>Return to Portfolio</a>.";
    }
}