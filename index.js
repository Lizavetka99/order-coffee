document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector('.submit-button');
    const lightboxBlock = document.querySelector('.lightbox_block');
    const lightboxBackdrop = document.querySelector('.lightbox_backdrop');
    const lightboxClose = document.querySelector('.lightbox_close');

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxBlock.style.display = 'flex';
        lightboxBackdrop.style.display = 'block';
    });

    lightboxClose.addEventListener('click', () => {
        lightboxBlock.style.display = 'none';
        lightboxBackdrop.style.display = 'none';
    });
});


