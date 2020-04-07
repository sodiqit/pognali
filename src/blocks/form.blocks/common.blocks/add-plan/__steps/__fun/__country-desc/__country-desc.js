import {flags} from "./../../__route/__country-select/__country-select";

class CountryDescription {
  constructor(container) {
    this._container = container;

    this._inputsData = [];
    this._button = document.querySelector('.route__next-step');
    this._buttonPrev = document.querySelector('.fun__prev-step');

    this._unsubscribes = [];

    this.pullData = this._pullData.bind(this);
    this.resetData = this._resetData.bind(this);

    this.bind();
  }

  _pullData() {
    const inputs = [...document.querySelectorAll('input[name="country"]')];

    inputs.forEach((item) => {
      if (item.value) {
        this._inputsData.push(item.value);
      }
    });

    this._render();
  }

  _resetData() {
    this._inputsData = [];
  }

  _render() {
    this._container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this._inputsData.forEach((item, i) => {
      console.log(item);
      let countryName = item[0].toUpperCase() + item.slice(1);

      let li = document.createElement('li');

      if (this._inputsData.length < 2) {
        li.classList.add('one-element');
      }

      li.classList.add('fun__country-list__item');
      li.innerHTML = this._createTemplate(i, {title: countryName, flag: flags[item]});

      fragment.appendChild(li);
    });

    this._container.appendChild(fragment);
  }

  static subscribe(target, eventName, handler) {
    target.addEventListener(eventName, handler);
    return () => target.removeEventListener(eventName, handler);
  }

  bind() {
    this._unsubscribes.push(CountryDescription.subscribe(this._button, 'click', this.pullData));
    this._unsubscribes.push(CountryDescription.subscribe(this._buttonPrev, 'click', this.resetData));
  }

  _unBind() {
    this._unsubscribes.forEach((item) => {
      item();
    });

    this._unsubscribes = null;
  }

  _createTemplate(i, options) {
    return `<div class="country-desc">
      <div class="country-desc__container">
        <label class="country-desc__title" for="country-desc${i}">${options.title}</label>
        <div class="country-desc__img">
          <svg viewBox="0 0 70 47" role="img" width="35" height="24">
            <title>Изображение флага ${options.title}</title>
            <use xlink:href="#${options.flag}"></use>
          </svg>
        </div>
      </div>
      <textarea name="countryDesc" class="country-desc__text" id="country-desc${i}" placeholder="План действий"></textarea>
    </div>`;
  }

}

const desc = new CountryDescription(document.querySelector('.fun__country-list'));
// const submitButton = document.querySelector('');
