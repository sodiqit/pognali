import Animate from '@j/animation';

const animationRing = new Animate(document.querySelectorAll('.level-ring'), '', {
  custom: true,
  from: 177,
  to: [Math.abs(Math.round(177 - 177 / 100 * 80))],
  draw(el, progress, i = 0) {
    el.style[this.prop] = Math.max(Math.floor(this.from - progress * this.from), this.to[i]);
  },
  duration: 1000,
  timing: 'linear',
  prop: 'strokeDashoffset'
});


