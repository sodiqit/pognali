export default class Animate {
  constructor(el, animation, options = {}) {
    this._el= el;
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
    console.log(this._el instanceof NodeList);
    this._checkHandlerBind = this._checkHandler.bind(this);
    this._checkCoord();
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
    if (this._el instanceof NodeList && this._el.length === this._animatesEnd.length && this._animatesEnd[0] !== undefined) {
      window.removeEventListener('scroll', this._checkHandlerBind);
      console.log('removed');
    } else if (!(this._el instanceof NodeList) && this._animatesEnd.length > 0) {
      window.removeEventListener('scroll', this._checkHandlerBind);
      console.log('removed');
    }
  }

  _checkHandler() {
    if (this._el instanceof NodeList) {
      this._el.forEach((item, i) => {
        if (Object.keys(this._options).length !== 0) {
          this._watcher(item) ? this._animate(item, i) : null;
        } else {
          this._watcher(item) ? this._bindAnimation(item, i) : null;
        }
      });
    } else {
      if (Object.keys(this._options).length !== 0) {
        this._watcher(this._el) ? this._animate() : null;
      } else {
        this._watcher(this._el) ? this._bindAnimation(this._el) : null;
      }

    }

    this._unBindHandler();
  }

  _checkCoord() {
    window.addEventListener('scroll', this._checkHandlerBind);
  }

  _animate(item = this._el, i = 0) {

    if (this._animatesEnd[i]) {
      return;
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
        this._animatesEnd[i] = {
          index: i,
          end: true
        };

        console.log(this._animatesEnd);
      }
    }

    requestAnimationFrame(animate);
  }
}
