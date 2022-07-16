import { refs } from './refs';
import gallery from '../templates/gallery.hbs';
import startingPage from '../templates/starting-page.hbs';
import { getBreeds } from './api';
import { removeActiveStatus } from './remove-active-status';

function renderGalleryPage() {
  removeActiveStatus();
  const markup = gallery({});
  // buttonVoting.classList.add('active');
  return (refs.containerRightPage.innerHTML = markup);
}

export { renderGalleryPage };
