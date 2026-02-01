(function () {
    pagination(true);
})();

(function () {
    if (!document.body.classList.contains('post-template')) return;

    const cover = document.querySelector('.gh-cover');
    if (!cover) return;

    const image = cover.querySelector('.gh-cover-image');

    window.addEventListener('load', function () {
        cover.style.setProperty('--cover-height', image.clientWidth * image.naturalHeight / image.naturalWidth + 'px');
        cover.classList.remove('loading');
    });
})();

// Afforestation Header Functionality
(function () {
    const header = document.querySelector('.aff-header');
    const mobileToggle = document.querySelector('.aff-mobile-toggle');

    if (!header) return;

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            header.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!header.contains(event.target)) {
                header.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a mobile link
        const mobileLinks = document.querySelectorAll('.aff-mobile-link, .aff-mobile-nav-link');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                header.classList.remove('menu-open');
            });
        });
    }

    // Scroll hide/show behavior
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        if (currentScrollY < 100) {
            header.classList.remove('is-hidden');
        } else if (scrollDelta > 10) {
            // Scrolling down - hide header
            header.classList.add('is-hidden');
            header.classList.remove('menu-open');
        } else if (scrollDelta < -10) {
            // Scrolling up - show header
            header.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
})();
