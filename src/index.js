import './less/styles.less';

const button = document.querySelector('.open-button');
const menu = document.querySelector('.menu');

menu.style.opacity = 0;
menu.classList.remove('menu--no-js');

button.addEventListener('click', () => {
  button.classList.toggle('open-button--opened');
  menu.classList.toggle('menu--opened');
  menu.style.opacity = 1;
});
