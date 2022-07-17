import { refs } from './refs';
import breed from '../templates/breed.hbs';
import singleCat from '../templates/breed-single-cat.hbs';
import { getBreeds, getDataListBreeds, getBreedByName } from './api';
import { renderStartingPage } from './render-page-starting';
import { removeActiveStatus } from './remove-active-status';
import { selectedElement } from './selected-element';
import Notiflix from 'notiflix';
import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/components/navigation/navigation.min.css';
// import navigation from 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css';
// import 'swiper/css/bundle';

let pageSingleCat = 9;
let page = 1;
let limit = 5;
let count = 0;
let currentElement;
const buttonBreed = refs.buttonNavigation[1];
let listBreeds;

async function renderBreedPage(num) {
  // снимаем активный статус с других кнопок
  removeActiveStatus();

  count += 1;
  // делаем запрос на породы только раз
  if (count === 1) {
    const responsListBreeds = await getDataListBreeds();
    listBreeds = responsListBreeds.map(breed => {
      let obj = {};
      obj.name = breed.name;
      obj.id = breed.id;
      return obj;
    });
  }

  // запрос на back для галереи
  const respons = await getBreeds(limit, page);

  // если прилетел пустой масив значит лист закончился
  if (respons.length < 1) {
    Notiflix.Notify.failure('at the end of pictures');
  }
  // строка для рендера
  const markup = breed({ respons, listBreeds });

  // рендерим строку пейджа брид в дом
  refs.containerRightPage.innerHTML = markup;

  // ссылки на опции селекта лимит и сам селект и кнопки назад
  const optionArr = document.querySelectorAll('.option');
  const selectLimit = document.querySelector('#limit');
  const buttonBack = document.querySelector('.button-back');
  const selectBreed = document.querySelector('#breeds');

  // вешаем слушателя на кнопку выйти из breed
  buttonBack.addEventListener('click', () => {
    renderStartingPage();
    refs.containerRightPage.classList.add('visually-none');
    refs.startingPageRigtPart.classList.remove('visually-none');
  });

  // реагируем на изменения в селекте
  selectLimit.addEventListener('change', getValueFromSelectPage);
  selectBreed.addEventListener('change', getValueFromSelectPage);
  // даем активный статус опцыи
  selectedElement(optionArr, currentElement);

  // делаем активной кнопку навигации
  buttonBreed.classList.add('active');
  paginator();
}
// берем значение селекта и рисуем новую пейджу
async function getValueFromSelectPage(e) {
  const currenOption = e.target;
  limit = Number(currenOption.value);
  currentElement = currenOption.value;
  switch (currenOption.name) {
    case 'breeds-limit':
      renderBreedPage();
      break;
    case 'breeds-name':
      renderBreedPageByName(currentElement);
      break;
    default:
      break;
  }
}
// получаем дату по имени породы с селекта
async function renderBreedPageByName(name) {
  const respons = await getBreedByName(pageSingleCat, name);

  const markup = singleCat(respons);
  refs.containerRightPage.innerHTML = markup;

  const buttonBack = document.querySelector('.button-back');
  buttonBack.addEventListener('click', () => {
    renderStartingPage();
    refs.containerRightPage.classList.add('visually-none');
    refs.startingPageRigtPart.classList.remove('visually-none');
  });
}

// листаем в перед назад страницы
function paginator() {
  const refBtnNext = document.querySelector('.container-breeds__buttons');
  refBtnNext.addEventListener('click', e => {
    const btnName = e.target.dataset.action;
    const currentBtn = e.target.nodeName;

    if (currentBtn !== 'BUTTON') {
      return;
    }
    // определяем куда кликнули и применяем кейсы
    switch (btnName) {
      case 'next':
        page += 1;
        renderBreedPage();
        // console.log(document.querySelector('[data-action="next"]'));
        // document.querySelector('[data-action="next"]').classList.add('active');
        break;
      case 'prev':
        if (page === 1) {
          return;
        }
        page -= 1;
        renderBreedPage();
        break;

      default:
        break;
    }
  });
}
export { renderBreedPage };
