import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

new Swiper('.goods__block', {   //активируем Swiper 
    slidesPerView: 1,           //колличество отображаемых слайдов 
    spaceBetween: 20,           //расстояние между соседними слайдами 
    breakpoints: {              //колличество слайдов на разных разрешениях экрана 
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2, 
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    },
    navigation: {           //подключаем кнопки 
        prevEl: 'goods__arrow_prev',
        nextEl: 'goods__arrow_next',
    }
});




