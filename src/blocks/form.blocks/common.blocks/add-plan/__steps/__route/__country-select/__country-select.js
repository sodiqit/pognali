const button = document.querySelectorAll('.country-select__change-button')[2];
const select = document.querySelectorAll(".country-select")[2];

console.log(button);

button.addEventListener('click', () => {
  console.log('click')
  select.classList.toggle('country-select--opened');
});
