import "./__filter/__filter";
import Animate from "@j/animation";

const levelRings = [...document.querySelectorAll('.level-ring')];

const animate = new Animate(levelRings, '', {
  custom: true,
  from: 176,
  to: levelRings.map(el => Math.abs(Math.round(176 - 176 / 100 * (+el.previousElementSibling.previousElementSibling.textContent)))),
  draw(el, progress, i = 0) {
    el.style[this.prop] = Math.max(Math.floor(this.from - progress * this.from), this.to[i]);
  },
  duration: 1000,
  timing: 'linear',
  prop: 'strokeDashoffset'
});
