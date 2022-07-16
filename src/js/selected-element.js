import { refs } from './refs';
function selectedElement(elements, currentElement) {
  elements.forEach(opt => {
    if (opt.value === currentElement) {
      opt.setAttribute('selected', 'true');
    }
  });
}
export { selectedElement };
