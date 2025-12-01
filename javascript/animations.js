export function initAnimations() {
    // --- Text Reveal ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal-text').forEach(el => {
        observer.observe(el);
    });
    // --- Parallax ---
    const parallaxImages = document.querySelectorAll('.parallax-img');
    function updateParallax() {
        parallaxImages.forEach(img => {
            const speed = img.getAttribute('data-speed');
            const wrapper = img.parentElement;
            const rect = wrapper.getBoundingClientRect();
            // Only animate if in view
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                const yPos = centerOffset * speed; 
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    if(parallaxImages.length > 0) {
        window.addEventListener('scroll', () => requestAnimationFrame(updateParallax));
        updateParallax();
    }
}