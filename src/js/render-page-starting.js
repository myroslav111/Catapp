import { refs } from './refs';
import gallery from '../templates/gallery.hbs';
import startingPage from '../templates/starting-page.hbs';
import { getBreeds } from './api';
import {removeActiveStatus} from './remove-active-status';
// возращаем стартовую страницу
function renderStartingPage() {
    removeActiveStatus()
  return (refs.containerRightPage.innerHTML = '');
}

export { renderStartingPage };
