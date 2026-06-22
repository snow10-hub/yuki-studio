'use strict';
{

    const menuToggle = document.querySelector('.menu-toggle');
    const globalNav = document.querySelector('.global-nav');
    const navLinks = document.querySelectorAll('.global-nav a');

    if (menuToggle && globalNav) {
        const closeMenu = () => {
            menuToggle.classList.remove('is-open');
            globalNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'メニューを開く');
        };

        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();

            const isOpen = menuToggle.classList.toggle('is-open');

            globalNav.classList.toggle('is-open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute(
                'aria-label',
                isOpen ? 'メニューを閉じる' : 'メニューを開く'
            );
        });

        globalNav.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', () => {
            if (globalNav.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }


    const lightboxLinks = document.querySelectorAll('.js-lightbox');
    const lightbox = document.querySelector('#image-lightbox');
    const lightboxImage = lightbox?.querySelector('img');
    const lightboxClose = lightbox?.querySelector('.image-lightbox-close');

    if (lightbox && lightboxImage) {
        const closeLightbox = () => {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImage.src = '';
            lightboxImage.alt = '';
        };

        lightboxLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                const image = link.querySelector('img');

                lightboxImage.src = link.href;
                lightboxImage.alt = image ? image.alt : '';
                lightbox.classList.add('is-open');
                lightbox.setAttribute('aria-hidden', 'false');
            });
        });

        lightbox.addEventListener('click', closeLightbox);

        lightboxImage.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        lightboxClose?.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }
}
