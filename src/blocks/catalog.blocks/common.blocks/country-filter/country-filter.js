import "./__locations-list/__locations-list";

const openButton = document.querySelector('.country-filter__button');
const closeButton = document.querySelector('.country-filter__bottom-button');
const section = document.querySelector('.country-filter');
const text = openButton.querySelector('span');

section.classList.add('country-filter--closed');

openButton.addEventListener('click', () => {
  if (section.classList.contains('country-filter--closed')) {
    section.classList.remove('country-filter--closed');
    section.classList.add('country-filter--opened');
    text.textContent = "Свернуть";
  } else {
    section.classList.remove('country-filter--opened');
    section.classList.add('country-filter--closed');
    text.textContent = "Показать все";
  }
});

closeButton.addEventListener('click', () => {
  section.classList.remove('country-filter--opened');
  section.classList.add('country-filter--closed');
  text.textContent = "Показать все";
});
