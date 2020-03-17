// const buttons = document.querySelectorAll('.country-select__change-button');
// const selects = document.querySelectorAll('.country-select');

// selects.forEach((item, i) => {
//   buttons[i].addEventListener('click', () => {
//     item.classList.toggle('country-select--opened');
//   });
// });

class Dropdown {
  constructor(input, field, container) {
    this._input = input;
    this._field = field;
    this._container= container;
  }
}

class CountrySelect {
  constructor(container) {
    this._container = container;

    this._container.innerHTML = '';

    this._buttons = {
      add: {
        className: 'country-select--add',
        textVal: 'Добавить страну',
        textBtn: 'Добавить элемент в список'
      },
      change: {
        className: '',
        textVal: 'Выберите страну',
        textBtn: 'Открыть список стран'
      }
    }

    this._elements = [];
    this._dropdowns = [];
    this._open = false;

    this.changeCountry = this._changeCountry.bind(this);
    this.addNewCountry = this._addNewCountry.bind(this);

    this._createELement(this._buttons.add);
  }

  _changeCountry(e) {
    let open = !this._open;
    this._open = open;
    const target = e.target.offsetParent.offsetParent; // pull info about parent eventTarget because we need add class him
    let dropdown = new Dropdown(target.querySelector('input'), target.querySelector('.country-select__value'), target);
    console.log(dropdown);

    if (open) {
      e.target.innerHTML = '<span class="visually-hidden">Закрыть список стран</span>';
    } else {
      e.target.innerHTML = '<span class="visually-hidden">Открыть список стран</span>';
    }
    console.log(e, open);
    target.classList.toggle('country-select--opened');
  }

  _addNewCountry() {
    this._createELement(this._buttons.change);
  }

  _bind(el) {
    const country = el.querySelector('.country-select');
    const button = el.querySelector('.country-select__change-button');

    if (country.classList.contains('country-select--add')) {
      button.addEventListener('click', this.addNewCountry);
    } else {
      button.addEventListener('click', this.changeCountry);
    }

  }

  _render() {
    const fragment = document.createDocumentFragment();
    const reverseElem = this._elements.slice().reverse();

    reverseElem.forEach((item) => {
      fragment.appendChild(item);
    });

    this._container.appendChild(fragment);
  }

  _createELement(options) {
    const li = document.createElement('li');
    li.innerHTML = this._createTemplate(options);

    this._bind(li, this._elements.length - 1);

    this._elements.push(li);
    console.log(this._elements);

    this._render();
  }

  _createTemplate(options) {

    return `<div class="country-select ${options.className}">
      <svg class="country-select__arrow" width="5" height="10" aria-hidden="true">
        <use xlink:href="#small-arrow"></use>
      </svg>
      <input class="visually-hidden" type="text" name="country">
      <p class="country-select__selected"><span class="country-select__value">${options.textVal}</span>
        <button class="country-select__change-button" type="button"><span class="visually-hidden">${options.textBtn}</span></button>
      </p>
      <div class="country-select__img"></div>
      <button class="country-select__delete-country" type="button"><span class="visually-hidden">Удалить страну из списка</span></button>
      <div class="country-select__dropdown">
      <table class="country-select__table">
        <tbody>
          <tr>
            <td class="active-td">А</td>
            <td>Б</td>
            <td>В</td>
            <td>Г</td>
            <td>Д</td>
          </tr>
          <tr>
            <td>Е</td>
            <td>Ё</td>
            <td>Ж</td>
            <td>З</td>
            <td>И</td>
          </tr>
          <tr>
            <td>Й</td>
            <td>К</td>
            <td>Л</td>
            <td>М</td>
            <td>Н</td>
          </tr>
          <tr>
            <td>О</td>
            <td>П</td>
            <td>Р</td>
            <td>С</td>
            <td>Т</td>
          </tr>
          <tr>
            <td>У</td>
            <td>Ф</td>
            <td>Х</td>
            <td>Ц</td>
            <td>Ч</td>
          </tr>
          <tr>
            <td>Ш</td>
            <td>Щ</td>
            <td>Э</td>
            <td>Ю</td>
            <td>Я</td>
          </tr>
        </tbody>
      </table>
      <ul class="country-select__list">
        <li>Афганистан</li>
        <li>Албания</li>
        <li>Алгерия</li>
        <li>Андорра</li>
        <li>Аргентина</li>
        <li>Армения</li>
        <li>Австралия</li>
        <li>Австрия</li>
        <li>Азербайджанм</li>
      </ul>
    </div>
    </div>`;
  }
}

const a = new CountrySelect(document.querySelector('.route__country-list'));
