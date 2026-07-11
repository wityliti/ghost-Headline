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
    const megas = document.querySelectorAll('.aff-mega');

    if (!header) return;

    // Desktop mega menus — keep open while hovering trigger or panel
    megas.forEach(function (mega) {
        mega.addEventListener('mouseenter', function () {
            megas.forEach(function (other) {
                if (other !== mega) other.classList.remove('is-open');
            });
            mega.classList.add('is-open');
        });

        mega.addEventListener('mouseleave', function () {
            mega.classList.remove('is-open');
        });

        const toggle = mega.querySelector('.aff-mega-toggle');
        if (toggle) {
            toggle.addEventListener('focus', function () {
                megas.forEach(function (other) {
                    if (other !== mega) other.classList.remove('is-open');
                });
                mega.classList.add('is-open');
            });
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            megas.forEach(function (mega) {
                mega.classList.remove('is-open');
            });
            header.classList.remove('menu-open');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            const isOpen = header.classList.toggle('menu-open');
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', function (event) {
            if (!header.contains(event.target)) {
                header.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        const mobileLinks = document.querySelectorAll('.aff-mobile-link, .aff-mobile-nav-link, .aff-mobile-actions a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                header.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
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
            header.classList.add('is-hidden');
            header.classList.remove('menu-open');
            megas.forEach(function (mega) {
                mega.classList.remove('is-open');
            });
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        } else if (scrollDelta < -10) {
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
