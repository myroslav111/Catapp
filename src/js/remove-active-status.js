import { refs } from './refs';

function removeActiveStatus(){
    refs.buttonNavigation.forEach(btn => {
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
        }
      });
}

export {removeActiveStatus}