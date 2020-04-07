const filter = document.querySelector('.travellers-filter');

filter.addEventListener('click', (e) => {
  if (e.target.classList.contains('travellers-filter__legend')) {
    let container = e.target.parentNode.parentNode;
    container.classList.toggle('travellers-filter__fieldset-container--opened');
  }
});

class RangeSlider {
  constructor(slider, inputs) {
    this._slider = slider;
    this._minInput = inputs.querySelector('input[name="min"]');
    this._maxInput = inputs.querySelector('input[name="max"]');
    this._decreaseButton = this._slider.querySelector('.decrease-level');
    this._increaseButton = this._slider.querySelector('.increase-level');
    this._activeBar = this._slider.querySelector('.travellers-filter__active');

    this.startDragDecr = this._startDragDecr.bind(this);
    this.startDragIncr = this._startDragIncr.bind(this);
    this.changeDecrCoord = this._changeDecrCoord.bind(this);
    this.changeIncrCoord = this._changeIncrCoord.bind(this);
    this._bind();
  }

  _makePercent(parent, val) {
    return (val / parent * 100);
  }

  _changeDecrCoord(e) {
    let coordSlider = this._getCoords(this._slider);
    let coordIncrButton = this._getCoords(this._increaseButton);

    let newValue = parseInt(e.target.value);
    let maxValue = parseInt(this._maxInput.value);

    if (newValue >= maxValue) {
      newValue = maxValue - 1;
      e.target.value = maxValue - 1;
    } else if (newValue <= 0) {
      newValue = 0;
      e.target.value = 0;
    }

    let newLeft = newValue;

    this._activeBar.style.width = `${this._makePercent(coordSlider.width,(coordIncrButton.left - coordSlider.left)) - newLeft}%`;
    this._activeBar.style.left = `${newLeft}%`;
    this._decreaseButton.style.left = `${newLeft}%`;
  }

  _changeIncrCoord(e) {
    let coordSlider = this._getCoords(this._slider);
    let coordDecrButton = this._getCoords(this._decreaseButton);

    let newValue = parseInt(e.target.value);
    let minValue = parseInt(this._minInput.value);

    if (newValue <= minValue) {
      newValue = minValue + 1;
      e.target.value = minValue + 1;
    } else if (newValue >= 100) {
      newValue = 100;
      e.target.value = 100;
    }

    let newLeft = (coordSlider.width / 100) * newValue;

    this._activeBar.style.width = `${newLeft - (coordDecrButton.left - coordSlider.left)}px`;
    this._activeBar.style.left = `${coordDecrButton.left - coordSlider.left}px`;
    this._increaseButton.style.left = `${newLeft}px`;
  }

  _getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right + pageXOffset,
      width: box.width
    };
  }

  _startDragIncr(e) {
    let coordParent = this._getCoords(this._slider);

    e.target.ondragstart = () => {
      return false;
    };

    const changePos = (event) => {

      let newLeft;
      let coordDecrButton = this._getCoords(this._decreaseButton);
      let coordIncrButton = this._getCoords(this._increaseButton);

      if (!event.clientX) {
        newLeft = event.touches[0].clientX - coordParent.left;
      } else {
        newLeft = event.clientX - coordParent.left;
      }

      if (newLeft <= coordDecrButton.left - coordParent.left + coordDecrButton.width) {
        newLeft = coordDecrButton.left - coordParent.left + coordDecrButton.width;
      } else if (newLeft >= coordParent.width) {
        newLeft = coordParent.width;
      } else if (newLeft <= 0) {
        newLeft = 0;
      }

      e.target.style.left=`${this._makePercent(coordParent.width, newLeft)}%`;
      this._activeBar.style.width = `${this._makePercent(coordParent.width, (coordIncrButton.left - coordParent.left) - (coordDecrButton.left - coordParent.left) + 5)}%`;
      this._activeBar.style.left = `${this._makePercent(coordParent.width, coordDecrButton.left - coordParent.left)}%`;
      this._maxInput.value = Math.ceil(this._makePercent(coordParent.width, newLeft));
    }

    const deleteList = () => {
      document.removeEventListener('mousemove', changePos);
      document.removeEventListener('touchmove', changePos);
      document.removeEventListener('mouseup', deleteList);
      document.removeEventListener('touchend', deleteList);
    }

    document.addEventListener('mousemove', changePos);
    document.addEventListener('touchmove', changePos);
    document.addEventListener('mouseup', deleteList);
    document.addEventListener('touchend', deleteList);
  }

  _startDragDecr(e) {
    let coordParent = this._getCoords(this._slider);

    e.target.ondragstart = () => {
      return false;
    };

    const changePos = (event) => {
      let newLeft;

      let coordIncrButton = this._getCoords(this._increaseButton);

      if (!event.clientX) {
        newLeft = event.touches[0].clientX - coordParent.left;
      } else {
        newLeft = event.clientX - coordParent.left;
      }

      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft >= coordIncrButton.left - coordParent.left - coordIncrButton.width) {
        newLeft = coordIncrButton.left - coordParent.left - coordIncrButton.width;
      } else if (newLeft >= coordParent.width) {
        newLeft = coordParent.width;
      }

      e.target.style.left=`${this._makePercent(coordParent.width,newLeft)}%`;
      this._activeBar.style.width = `${this._makePercent(coordParent.width, (coordIncrButton.left - coordParent.left) - newLeft)}%`;
      this._activeBar.style.left = `${this._makePercent(coordParent.width,newLeft)}%`;
      this._minInput.value = Math.floor(this._makePercent(coordParent.width,newLeft));
    }

    const deleteList = () => {
      document.removeEventListener('mousemove', changePos);
      document.removeEventListener('touchmove', changePos);
      document.removeEventListener('mouseup', deleteList);
      document.removeEventListener('touchend', deleteList);
    }

    document.addEventListener('mousemove', changePos);
    document.addEventListener('touchmove', changePos);
    document.addEventListener('mouseup', deleteList);
    document.addEventListener('touchend', deleteList);
  }

  _bind() {
    this._decreaseButton.addEventListener('mousedown', this.startDragDecr);
    this._decreaseButton.addEventListener('touchstart', this.startDragDecr);
    this._increaseButton.addEventListener('mousedown', this.startDragIncr);
    this._increaseButton.addEventListener('touchstart', this.startDragIncr);
    this._minInput.addEventListener('change', this.changeDecrCoord);
    this._maxInput.addEventListener('change', this.changeIncrCoord);
  }
}

const rangeSlider = new RangeSlider(filter.querySelector('.travellers-filter__range-slider'), filter.querySelector('.travellers-filter__input-container'));
