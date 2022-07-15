import { refs } from './refs';
import { renderVotingPage } from './render-page-voting';
import { renderBreedPage } from './render-page-breed';
import { renderGalleryPage } from './render-page-gallery';
import { renderStartingPage } from './render-page-starting';

// вешаем слушателей на кнопки навигации
refs.buttonNavigation.forEach(btn => btn.addEventListener('click', goToPage));
// фун. подгрузки нужного пэйджа
function goToPage(e) {
  const btnDataValue = e.target.dataset.action;
  const btnDataCurrent = e.target.dataset.name;
  const buttonVoting = refs.buttonNavigation[0];
  const buttonBreed = refs.buttonNavigation[1];
  const buttonGallery = refs.buttonNavigation[2];
  refs.startingPageRigtPart.classList.add('visually-none');
  refs.containerRightPage.classList.remove('visually-none');
  // условия опредиления пейдж кнопка === нужный пейдж
  switch (btnDataValue) {
    case 'voting':
      renderVotingPage();
      goBackStartingPage();
      buttonVoting.classList.add('active');
      break;
    case 'breeds':
      renderBreedPage();
      goBackStartingPage();

      break;
    case 'gallery':
      renderGalleryPage();
      goBackStartingPage();
      buttonGallery.classList.add('active');

      break;

    default:
      break;
  }
}
// добавляем слушателя на кнопку назад и закрываем
function goBackStartingPage() {
  const refToButtonBack = document.querySelector('.button-back');
  refToButtonBack.addEventListener('click', () => {
    renderStartingPage();
    refs.containerRightPage.classList.add('visually-none');
    refs.startingPageRigtPart.classList.remove('visually-none');
  });
}
