const tab = document.querySelectorAll('.process-tab-item');
const processBlocks = document.querySelectorAll('.process_block');

tab.forEach((el, ind) => {
    el.onclick = () => {
        tab.forEach(c => { c.classList.remove('active-tab') });
        processBlocks.forEach(k => { k.classList.remove('process_block-active') });
        el.classList.add('active-tab');
        processBlocks[ind].classList.add('process_block-active');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".documents-swiper", {
        loop: true,
        navigation: {
            nextEl: ".document-swiper-button-next",
            prevEl: ".document-swiper-button-prev",
        },
        slidesPerView: 2,
        spaceBetween: 30,
        breakpoints: {
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
        }
    });
});