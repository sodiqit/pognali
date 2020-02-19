export default class Animate {
  constructor(el, animation) {
    this._el= el;
    this._animation = animation;
    this._animatesEnd = [];

    // if (this._el instanceof NodeList) {
    //   this._el.forEach(item => {
    //     this._checkCoord(item);
    //   });
    // } else {
    //   this._checkCoord(this._el);
    // }
    this._checkHandlerBind = this._checkHandler.bind(this);
    this._checkCoord();
  }

  _bindAnimation(target, i = 1) {
    if (target) {
      target.classList.add(this._animation);

      if (this._animatesEnd[i]) {
        return;
      } else {

        const animate = {
          index: i,
          end: true
        };

        this._animatesEnd.push(animate);
      }

    } else if (target.classList.contain(this._animation)) {
      return;
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
    if (this._el instanceof NodeList && this._el.length === this._animatesEnd.length) {
      window.removeEventListener('scroll', this._checkHandlerBind);
      console.log('removed');
    } else {
      console.log(1);
    }
  }

  _checkHandler() {
    if (this._el instanceof NodeList) {
      this._el.forEach((item, i) => {
        this._watcher(item) ? this._bindAnimation(item, i) : null;
      });
    } else {
      this._watcher(this._el) ? this._bindAnimation(this._el) : null;
    }

    this._unBindHandler();
  }

  _checkCoord() {
    window.addEventListener('scroll', this._checkHandlerBind);
  }

}
