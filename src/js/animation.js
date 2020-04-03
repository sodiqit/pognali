export default class Animate {
  constructor(el, animation, options = {}) {
    this._el= [...el];
    this._animation = animation;
    this._options = options;
    this._animatesEnd = [];

    if (this._options) {
      this._animateSettings = {
        timing: {
          linear(timeFraction) {
            return timeFraction;
          },
          ease(timeFraction) {
            return Math.pow(timeFraction, 2);
          }
        }
      }
    }

    this._checkHandlerBind = this._checkHandler.bind(this);
    this._checkEl();

    this._el.forEach((item) => {
      item.style[this._options.prop] = this._options.from;
    });

  }

  get animateEnd() {
    return this._el.length === this._animatesEnd.length && this._animatesEnd[0] !== undefined;
  }

  _checkEl() {
    const result = this._el.map((item) => {
      return this._watcher(item);
    });

    for (let i = 0; i < this._el.length; i++) {
      if (result[i]) {
        this._options.custom ? this._animate(this._el[i], i) : this._bindAnimation(this._el[i]);
      }
    }

    if (!this.animateEnd) {
      this._checkCoord();
    } else {
      return;
    }
  }

  _bindAnimation(target, i = 0) {
    if (target) {
      target.classList.add(this._animation);

      if (this._animatesEnd[i]) {
        return;
      } else {

        const animate = {
          index: i,
          end: true
        };

        this._animatesEnd[animate.index] = animate;
      }

    } else {
      throw new Error('el not defined');
    }
  }

  _watcher(target) {
    const targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
      left: window.scrollX + target.getBoundingClientRect().left,
      right: window.scrollX + target.getBoundingClientRect().right
    };

    const windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom &&
        targetPosition.right > windowPosition.left &&
        targetPosition.left < windowPosition.right) {
      return true;
    } else {
      return false;
    }
  }

  _unBindHandler() {
    if (this.animateEnd) {
      this._el.forEach((item) => {
        item.style[this._options.prop] = this._options.to;
      });
      this._animation ? setTimeout(() => this._el.forEach(item => item.classList.remove(this._animation)), this._options.duration + 500) : null;
      window.removeEventListener('scroll', this._checkHandlerBind);
      console.log('removed');
    }
  }

  _checkHandler() {
    this._el.forEach((item, i) => {
      if (this._options.custom) {
        this._watcher(item) ? this._animate(item, i) : null;
      } else {
        this._watcher(item) ? this._bindAnimation(item, i) : null;
      }
    });

    this._unBindHandler();
  }

  _checkCoord() {
    window.addEventListener('scroll', this._checkHandlerBind);
  }

  _animate(item = this._el, i = 0) {

    if (this._animatesEnd[i]) {
      return;
    }

    this._animatesEnd[i] = {
      index: i,
      end: true
    }

    let start = performance.now();

    let animate = (time) => {
      let timeFraction = (time - start) / this._options.duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = this._animateSettings.timing[this._options.timing](timeFraction);

      this._options.draw(item, progress, i) // отрисовать её

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }
}
