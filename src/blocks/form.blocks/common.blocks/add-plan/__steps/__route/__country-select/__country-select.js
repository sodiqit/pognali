const buttons = document.querySelectorAll('.country-select__change-button');
const selects = document.querySelectorAll('.country-select');

selects.forEach((item, i) => {
  buttons[i].addEventListener('click', () => {
    item.classList.toggle('country-select--opened');
  });
});
