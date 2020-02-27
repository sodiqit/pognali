import './less/styles.less';
import Animate from './js/animation';

const button = document.querySelector('.open-button');
const menu = document.querySelector('.menu');
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');

if (document.documentElement.clientWidth <= 1320) {
  menu.style.opacity = 0;
}

menu.classList.remove('menu--no-js');
modal.classList.remove('modal--no-js');

button.addEventListener('click', () => {
  button.classList.toggle('open-button--opened');
  menu.classList.toggle('menu--opened');
  menu.style.opacity = 1;
});

openModal.addEventListener('click', (e) => {
  e.preventDefault();

  modal.classList.remove('modal--closed');
  modal.classList.add('modal--opened');
});

closeModal.addEventListener('click', (e) => {
  e.preventDefault();

  modal.classList.remove('modal--opened');
  modal.classList.add('modal--closed');
});

const animationRing = new Animate(document.querySelectorAll('.level-ring'), '', {
  custom: true,
  from: 177,
  to: [Math.abs(Math.round(177 - 177 / 100 * 99)), Math.abs(Math.round(177 - 177 / 100 * 80)), Math.abs(Math.round(177 - 177 / 100 * 50))],
  draw(el, progress, i = 0) {
    el.style[this.prop] = Math.max(Math.floor(this.from - progress * this.from), this.to[i]);
  },
  duration: 1000,
  timing: 'linear',
  prop: 'strokeDashoffset'
});

const animationCard = new Animate(document.querySelectorAll('.directions__list__item'), 'direction-card--animation', {
  from: 0,
  to: 1,
  duration: 1000,
  prop: "opacity"
});
