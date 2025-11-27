document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }    
    // --- Dual Cursor Logic ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const hoverTriggers = document.querySelectorAll('.hover-trigger');
    if (window.matchMedia("(pointer: fine)").matches) { // only run on non-touch devices
        document.body.classList.add('custom-cursor-active');
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        document.addEventListener('mousemove', (e) => { // track mouse position
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px'; // move dot instantly
            cursorDot.style.top = mouseY + 'px';
        });
        function animateRing() { // with a slight delay (Lerp)
            ringX += (mouseX - ringX) * 0.15; // makes ring follow mouse smoothly
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();
        hoverTriggers.forEach(trigger => { // handle hover states
            trigger.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            trigger.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    // --- Text Reveal on Scroll ---
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
    // --- Parallax Effect ---
    const parallaxImages = document.querySelectorAll('.parallax-img');
    function updateParallax() {
        parallaxImages.forEach(img => {
            const speed = img.getAttribute('data-speed');
            const wrapper = img.parentElement; // Get the container
            const rect = wrapper.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) { // only animate if element is in view (performance boost)
                const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2); // calculate distance from center of viewport
                const yPos = centerOffset * speed; 
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });
    updateParallax(); // call on load to set initial positions
    // --- Mobile Menu ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    function toggleMenu() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});