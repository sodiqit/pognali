const filter = document.querySelector('.travellers-filter');

// filter.addEventListener('click', (e) => {
//   if (e.target.classList.contains('travellers-filter__legend')) {
//     let container = e.target.parentNode.parentNode;
//     container.classList.toggle('travellers-filter__fieldset-container--opened');
//   }
// });

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

  _changeDecrCoord(e) {
    let newValue = parseInt(e.target.value);
    let maxValue = parseInt(this._maxInput.value);
    if (newValue >= maxValue) {
      newValue = maxValue - 1;
      e.target.value = maxValue - 1;
    } else if (newValue <= 0) {
      newValue = 0;
      e.target.value = 0;
    }
    let sliderCoords = this._getCoords(this._slider);

    let newLeft = sliderCoords.width / 100 * newValue;

    this._activeBar.style.width = `${(this._increaseButton.getBoundingClientRect().left - sliderCoords.left) - newLeft}px`;
    this._activeBar.style.left = `${newLeft}px`;
    this._decreaseButton.style.left = `${newLeft}px`;
  }

  _changeIncrCoord(e) {
    let newValue = parseInt(e.target.value);
    let minValue = parseInt(this._minInput.value)
    if (newValue <= minValue) {
      newValue = minValue + 1;
      e.target.value = minValue + 1;
    } else if (newValue >= 100) {
      newValue = 100;
      e.target.value = 100;
    }
    let sliderCoords = this._getCoords(this._slider);

    let newLeft = (sliderCoords.width / 100) * newValue;

    console.log((this._decreaseButton.getBoundingClientRect().left - sliderCoords.left));

    this._activeBar.style.width = `${newLeft - (this._decreaseButton.getBoundingClientRect().left - sliderCoords.left)}px`;
    this._activeBar.style.left = `${this._decreaseButton.getBoundingClientRect().left - sliderCoords.left}px`;
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
    let coordParent = this._slider.getBoundingClientRect();

    e.target.ondragstart = () => {
      return false;
    };

    let activeBar = e.target.previousElementSibling;

    const changePos = (event) => {

      let newLeft;

      if (!event.clientX) {
        newLeft = event.touches[0].clientX - coordParent.left;
      } else {
        newLeft = event.clientX - coordParent.left;
      }

      if (newLeft <= this._decreaseButton.getBoundingClientRect().left - coordParent.left + 10) {
        newLeft = this._decreaseButton.getBoundingClientRect().left - coordParent.left + 10;
      } else if (newLeft >= coordParent.width) {
        newLeft = coordParent.width;
      }

      e.target.style.left=`${newLeft}px`;
      activeBar.style.width = `${(this._increaseButton.getBoundingClientRect().left - coordParent.left) - (this._decreaseButton.getBoundingClientRect().left - coordParent.left)}px`;
      activeBar.style.left = `${this._decreaseButton.getBoundingClientRect().left - coordParent.left}px`;
      this._maxInput.value = Math.floor(newLeft / coordParent.width * 100);
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
    let coordParent = this._slider.getBoundingClientRect();

    let activeBar = e.target.nextElementSibling;

    e.target.ondragstart = () => {
      return false;
    };

    const changePos = (event) => {
      let newLeft;

      if (!event.clientX) {
        newLeft = event.touches[0].clientX - coordParent.left;
      } else {
        newLeft = event.clientX - coordParent.left;
      }

      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft >= this._increaseButton.getBoundingClientRect().left - coordParent.left - 10) {
        newLeft = this._increaseButton.getBoundingClientRect().left - coordParent.left - 10;
      } else if (newLeft >= coordParent.width) {
        newLeft = coordParent.width;
      }

      e.target.style.left=`${newLeft}px`;
      activeBar.style.width = `${(this._increaseButton.getBoundingClientRect().left - coordParent.left) - newLeft}px`;
      activeBar.style.left = `${newLeft}px`;
      console.log(coordParent.width, newLeft);
      this._minInput.value = Math.ceil(newLeft / coordParent.width * 100);
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

//TODO: end second button;
