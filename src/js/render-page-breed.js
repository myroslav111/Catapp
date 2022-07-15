import { refs } from './refs';
import voting from '../templates/voting.hbs';
import breed from '../templates/breed.hbs';
import gallery from '../templates/gallery.hbs';
import startingPage from '../templates/starting-page.hbs';
import { getBreeds } from './api';
import { renderStartingPage } from './render-page-starting';
import { removeActiveStatus } from './remove-active-status';

let page = 1;
const buttonBreed = refs.buttonNavigation[1];
async function renderBreedPage(num) {
  removeActiveStatus();
  // делаем аргумент по дефолту
  let numLimit = num ? num : 10;
  let numPage = page ? num : 1;
  const respons = await getBreeds(numLimit, page);
  const markup = breed(respons);
  console.log(respons);
  // рендерим строку пейджа брид в дом
  refs.containerRightPage.innerHTML = markup;
  // вешаем слушателя на кнопку выйти из бредд
  document.querySelector('.button-back').addEventListener('click', () => {
    renderStartingPage();
    refs.containerRightPage.classList.add('visually-none');
    refs.startingPageRigtPart.classList.remove('visually-none');
  });
  // реагируем на изменения в селекте
  console.dir(document.querySelector('#limit').value);
  document.querySelector('#limit').addEventListener('change', getLimitPage);
  buttonBreed.classList.add('active');
  paginator();
}
// берем значение селекта
async function getLimitPage() {
  const limit = document.querySelector('#limit').value;
  renderBreedPage(Number(limit));
}

function paginator() {
  // const refBtnNext = document.querySelector('.container-breeds__paginator-next');
  const refBtnNext = document.querySelector('.container-breeds__buttons');
  console.log(refBtnNext);
  refBtnNext.addEventListener('click', e => {
    console.dir(e.target.dataset.action);
    const btnName = e.target.dataset.action;
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    switch (btnName) {
      case 'next':
        page += 1;
        console.log(page);
        renderBreedPage(Number(limit));
        break;
      case 'prev':
        if (page === 1) {
          return;
        }
        page -= 1;
        console.log(page);
        renderBreedPage(Number(limit));
        break;

      default:
        break;
    }
  });
}
export { renderBreedPage };
