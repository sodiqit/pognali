class Input {
  constructor(elements, cnt) {
    this._input = elements.input;
    this._decrButton = elements.decrButton;
    this._incrButton = elements.incrButton;
    this._cnt = +cnt;
    this._min = +this._input.dataset.min;

    this.increase = this._increase.bind(this);
    this.decrease = this._decrease.bind(this);
    this.change = this._change.bind(this);

    this._bind();

    console.log(elements);
  }

  _bind() {
    this._decrButton.addEventListener('click', this.decrease);
    this._incrButton.addEventListener('click', this.increase);
    this._input.addEventListener('change', this.change);
  }

  _increase() {
    this._checkInput(this._cnt += 1);
  }

  _decrease() {
    this._checkInput(this._cnt -= 1);
  }

  _checkInput(cnt) {
    let num = parseFloat(cnt);
    console.log(cnt);
    if (num <= this._min) {
      this._input.value = this._min;
      this._cnt = this._min;
    } else {
      this._input.value = num;
      this._cnt = num;
    }
  }

  _change(evt) {
    this._checkInput(evt.target.value);
  }

}

const elements = document.querySelectorAll('.input-range');

elements.forEach((item) => {
  let input = item.querySelector('input');
  let decrButton = item.querySelector('.input-range__decrease');
  let incrButton = item.querySelector('.input-range__increase');

  new Input({input, decrButton, incrButton}, input.value);
});

