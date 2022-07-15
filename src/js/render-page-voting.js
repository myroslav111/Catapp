import { refs } from './refs';
import voting from '../templates/voting.hbs';
import startingPage from '../templates/starting-page.hbs';
import { getBreeds } from './api';
import { removeActiveStatus } from './remove-active-status';

function renderVotingPage() {
  removeActiveStatus();
  const markup = voting({});
  return (refs.containerRightPage.innerHTML = markup);
}

export { renderVotingPage };
// const buttonVoting = refs.buttonNavigation[0];
// buttonVoting.classList.remove('active');
