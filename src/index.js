import './less/styles.less';
import Animate from './js/animation';

const button = document.querySelector('.open-button');
const menu = document.querySelector('.menu');

if (document.documentElement.clientWidth <= 1320) {
  menu.style.opacity = 0;
}

menu.classList.remove('menu--no-js');

button.addEventListener('click', () => {
  button.classList.toggle('open-button--opened');
  menu.classList.toggle('menu--opened');
  menu.style.opacity = 1;
});

const animationRing = new Animate(document.querySelectorAll('.level-ring'), '', {
  from: 177,
  to: [Math.abs(Math.round(177 - 177 / 100 * 99)), Math.abs(Math.round(177 - 177 / 100 * 80)), Math.abs(Math.round(177 - 177 / 100 * 50))],
  draw(el, progress, i = 0) {
    el.style[this.prop] = Math.max(Math.floor(this.from - progress * this.from), this.to[i]);
  },
  duration: 1000,
  timing: 'linear',
  prop: 'strokeDashoffset'
});

const animationCard = new Animate(document.querySelectorAll('.directions__list__item'), '', {
  from: 0,
  to: 1,
  draw(el, progress) {
    el.style[this.prop] = Math.min(this.from + progress, this.to);
  },
  duration: 500,
  timing: 'linear',
  prop: "opacity"
});
