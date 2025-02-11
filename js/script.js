const tab = document.querySelectorAll('.process-tab-item');
const processBox = document.querySelector('.process_box');

tab.forEach((el, ind) => {
    el.onclick = () => {
        processBox.style.transform = `translateX(${ind * (-25)}%)`;
        tab.forEach(c => { c.classList.remove('active-tab') });
        el.classList.add('active-tab');
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