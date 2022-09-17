import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

// simplebar
new SimpleBar(document.querySelector('.country__list'), {
    classNames: {
        scrollbar: 'country__scrollbar',
        track: 'country__track',
    }
})

// slider 
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
    },
    preventClicks: true,    // убираем клик по кнопкам "узнать больше"
    a11y: false,            //
});

// modal 
const productMore = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');
const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

productMore.forEach((btn) => {
    btn.addEventListener('click', () => {
        modal.classList.add('modal_open')
    })
});

modal.addEventListener('click', ({target}) => {
    if (target === modal) {
        modal.classList.remove('modal_open')
    }
});

formInput.forEach((input, i) => {
    input.addEventListener('focus', () => {
        formPlaceholder[i].classList.add('form__placeholder_active');
    })
    input.addEventListener('blur', () => {
        if (input.value === '') {
            formPlaceholder[i].classList.remove('form__placeholder_active');
        }
    })
})



// currency 

const dataCurrency = {};

const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('EU', {
        style: 'currency', 
        currency, 
        maximumFractionDigits: 2, 
    }).format(value);
}

const showPrice = (currency = 'USD') => {
    const priceElems = document.querySelectorAll('[data-price]')

    priceElems.forEach(elem => {
        elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
    })
}

const myHeaders = new Headers();
myHeaders.append("apikey", "07hkodHH1xfqKXXgZ4K1TCzJl50F5Wml");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates)
    showPrice();
  })
  .catch(error => console.log('error', error));

  // choises 

const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
    countryWrapper.classList.toggle('country__wrapper_open')
});

countryWrapper.addEventListener('click', ({target}) => {
    if (target.classList.contains('country__choise')) {
        countryWrapper.classList.remove('country__wrapper_open');
        showPrice(target.dataset.currency);
    }
});

const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

const timer = (deadline) => {
    const unitDay = document.querySelector('.timer__unit_day');
    const unitHours = document.querySelector('.timer__unit_hours');
    const unitMinutes = document.querySelector('.timer__unit_minutes');
    const descriptionDay = document.querySelector('.timer__unit-description_day');
    const descriptionHourse = document.querySelector('.timer__unit-description_hours');
    const descriptionMinutes = document.querySelector('.timer__unit-description_minutes');

    const getTimeRemaning = () => {
        const dateStop = new Date(deadline).getTime(); // переводим в миллисекунды 
        const dateNow = Date.now(); // Текущая дата 
        const timeRemaning = dateStop - dateNow; // Разница, сколько осталось 
        const ms = timeRemaning; // Переменная для миллисекунд 
        const s = timeRemaning / 1000 % 60; // Переводим в секунды  
        const m = Math.floor(timeRemaning / 1000 / 60 % 60); // Переводим в минуты 
        const h = Math.floor(timeRemaning / 1000 / 60 / 60 % 24); // Переводим в часы 
        const d = Math.floor(timeRemaning / 1000 / 60 / 60 / 24 % 365); // Переводим в дни 

        return{timeRemaning, m, h, d};
    }
    const start = () => {
        const timer = getTimeRemaning();

        unitDay.textContent = timer.d;
        unitHours.textContent = timer.h; 
        unitMinutes.textContent = timer.m;

        descriptionDay.textContent = declOfNum(timer.d, ['день', 'дня', 'дней'])
        descriptionHourse.textContent = declOfNum(timer.h, ['час', 'часа', 'часов'])
        descriptionMinutes.textContent = declOfNum(timer.m, ['минута', 'минуты', 'минут'])

        const timerId = setTimeout(start, 60000);

        if (timer.timeRemaning < 0) {
            clearTimeout(timerId)
            unitDay.textContent = '0';
            unitHours.textContent = '0'; 
            unitMinutes.textContent = '0';
        }
    }
    start();
}
timer('2023/09/07 20:00') // До этой даты ведёт отчёт 
