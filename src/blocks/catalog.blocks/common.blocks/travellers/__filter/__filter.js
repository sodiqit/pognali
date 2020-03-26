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

    this.startDragDecr = this._startDragDecr.bind(this);
    this.startDragIncr = this._startDragIncr.bind(this);
    this._bind();
  }

  _getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right + pageXOffset
    };
  }

  _startDragIncr(e) {
    let coordParent = e.target.parentNode.getBoundingClientRect();

    e.target.ondragstart = () => {
      return false;
    };

    let activeBar = e.target.previousElementSibling;

    const changePos = (event) => {
      if (coordParent.left - event.clientX < 0 && coordParent.right - event.clientX > 5) {
        e.target.style.left = `${event.clientX - coordParent.left}px`;
        activeBar.style.left = `${this._decreaseButton.getBoundingClientRect().left - coordParent.left}px`;
        activeBar.style.width = `${(event.clientX - coordParent.left) - (this._decreaseButton.getBoundingClientRect().left - coordParent.left)}px`;
      }
    }

    const deleteList = () => {
      document.removeEventListener('mousemove', changePos);
      document.removeEventListener('mouseup', deleteList);
    }

    document.addEventListener('mousemove', changePos);
    document.addEventListener('mouseup', deleteList);
  }

  _startDragDecr(e) {
    let coordParent = e.target.parentNode.getBoundingClientRect();

    let activeBar = e.target.nextElementSibling;

    e.target.ondragstart = () => {
      return false;
    };

    console.log();
    //

    const changePos = (event) => {
      if (coordParent.left - event.clientX < 0 && coordParent.right - event.clientX > 5) {
        console.log(this._increaseButton.getBoundingClientRect().left - coordParent.left - (e.clientX - coordParent.left));
        e.target.style.left = `${event.clientX - coordParent.left}px`;
        activeBar.style.left = `${event.clientX - coordParent.left}px`;
        activeBar.style.width = `${(this._increaseButton.getBoundingClientRect().left - coordParent.left) - (event.clientX - coordParent.left)}px`;

      }
    }

    const deleteList = () => {
      document.removeEventListener('mousemove', changePos);
      document.removeEventListener('mouseup', deleteList);
    }

    document.addEventListener('mousemove', changePos);
    document.addEventListener('mouseup', deleteList);
  }

  _bind() {
    this._decreaseButton.addEventListener('mousedown', this.startDragDecr);
    this._increaseButton.addEventListener('mousedown', this.startDragIncr);
  }
}

const rangeSlider = new RangeSlider(filter.querySelector('.travellers-filter__range-slider'), filter.querySelector('.travellers-filter__input-container'));


