import { refs } from './refs';
import breed from '../templates/breed.hbs';
import { getBreeds, getDataListBreeds } from './api';
import { renderStartingPage } from './render-page-starting';
import { removeActiveStatus } from './remove-active-status';
import { selectedElement } from './selected-element';
import Notiflix from 'notiflix';

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
    // listBreeds = responsListBreeds.map(breed => breed.name);
    listBreeds = responsListBreeds.map(breed => {
      let obj = {};
      obj.name = breed.name;
      obj.id = breed.id;
      return obj;
    });
    console.log(listBreeds);
  }

  // запрос на для галереи
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
  const select = document.querySelector('#limit');
  const buttonBack = document.querySelector('.button-back');

  // вешаем слушателя на кнопку выйти из breed
  buttonBack.addEventListener('click', () => {
    renderStartingPage();
    refs.containerRightPage.classList.add('visually-none');
    refs.startingPageRigtPart.classList.remove('visually-none');
  });

  // реагируем на изменения в селекте
  select.addEventListener('change', getLimitPage);
  selectedElement(optionArr, currentElement);

  // делаем активной кнопку навигации
  buttonBreed.classList.add('active');
  paginator();
}
// берем значение селекта и рисуем новую пейджу
async function getLimitPage(e) {
  const currenOption = e.target;
  limit = Number(currenOption.value);
  currentElement = currenOption.value;
  renderBreedPage();
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
