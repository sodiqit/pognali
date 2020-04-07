export default class Slider {
  constructor(slides, activeButtons) {
    this._slides = [...slides];
    this._activeButtons = [...activeButtons];

    this._buttons = [];

    this._getButtons();

    this.curry = this._curry.bind(this);
    this._bind();
  }

  _getButtons() {
    this._slides.forEach((el, i) => {
      let slide = {
        next: null,
        prev: null
      };

      if (i !== 0) {
        el.style.display = "none";
      }

      let nextButton = el.querySelector(".next-step");
      let prevButton = el.querySelector(".prev-step");
      if (nextButton) {
        slide.next = nextButton
      }

      if (prevButton) {
        slide.prev = prevButton
      }

      this._buttons[i] = slide;
    });
  }

  _nextSlide(e, i) {
    e.preventDefault();

    this._slides[i].style.display = "none";
    this._slides[i + 1].style.display = "block";
    this._activeButtons[i].classList.remove('slider-btn--active');
    this._activeButtons[i + 1].classList.add('slider-btn--active');
  }

  _prevSlide(e, i) {
    this._slides[i].style.display = "none";
    this._slides[i - 1].style.display = "block";
    this._activeButtons[i].classList.remove('slider-btn--active');
    this._activeButtons[i - 1].classList.add('slider-btn--active');
  }

  _curry(i, fn) {
    return (e) => {
      fn.apply(this, [e,i]);
    }
  }

  _bind() {
    this._buttons.forEach((el, i) => {
      if (el.next) {
        el.next.addEventListener('click', this.curry(i, this._nextSlide));
      }

      if (el.prev) {
        el.prev.addEventListener('click', this.curry(i, this._prevSlide));
      }
    })
  }
}
