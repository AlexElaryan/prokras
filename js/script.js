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
        spaceBetween: 10,
        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            },
        }
    });
    new Swiper(".objects-swiper", {
        loop: true,
        navigation: {
            nextEl: ".object-swiper-button-next",
            prevEl: ".object-swiper-button-prev",
        },
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            },  
        }
    });
});

const objectPicture = document.querySelectorAll('.object_slide-pictures > img');
const objectSlides = document.querySelectorAll('.objects-swiper .swiper-slide img');
const objSwBox = Array.from(document.querySelectorAll('.object-swiper-box'));

objectSlides.forEach(pic => {
    pic.onclick = () => {
        let indexElement = pic.closest('.object-swiper-box');
        let index = objSwBox.indexOf(indexElement)

        objectPicture[index].src = pic.src;
    }
})

const burgerMenu = document.querySelector('.burger-menu');

function burgerClose() {
    burgerMenu.classList.remove('burger-menu-open');
    document.body.style.overflow = 'auto';
}

function burgerOpen() {
    burgerMenu.classList.add('burger-menu-open');
    scrollTo({ top: 0, behavior: 'smooth' })
    document.body.style.overflow = 'hidden';
}