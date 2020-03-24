import {countries} from "@j/storage";

const container = document.querySelector('.locations-list');
const buttons = container.querySelectorAll('button');

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('locations-list__button')) {
    const fragment = document.createDocumentFragment();
    buttons.forEach((item) => {
      item.classList.remove('locations-list__button--active');
      item.parentNode.classList.remove('locations-list__item--active');
    });
    e.target.classList.add('locations-list__button--active');
    e.target.parentNode.classList.add('locations-list__item--active');

    countries.forEach((item) => {
      if (e.target.textContent.toLowerCase() === item[0].toLowerCase()) {
        let li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);
      }
    });

    if (e.target.nextElementSibling.children.length === 0) {
      e.target.nextElementSibling.appendChild(fragment);
    }

  };
});
