const countries = ['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир', 'Ангола', 'Андорра', 'Антигуа и Барбуда', 'Аргентина', 'Армения', 'Афганистан','Кабо-Верде',
'Казахстан',
'Камбоджа',
'Камерун',
'Канада',
'Катар',
'Кения',
'Кипр',
'Киргизия',
'Кирибати',
'Китай',
'Колумбия',
'Коморы',
'Конго',
'КНДР',
'Корея',
'Коста-Рика',
'Кот-д’Ивуар',
'Куба',
'Кувейт',
'Маврикий',
'Мавритания',
'Мадагаскар',
'Малави',
'Малайзия',
'Мали',
'Мальдивы',
'Мальта',
'Марокко',
'Маршалловы Острова',
'Мексика',
'Мозамбик',
'Молдавия',
'Монако',
'Монголия',
'Мьянма',
'Багамские Острова',
'Бангладеш',
'Барбадос',
'Бахрейн',
'Белоруссия',
'Белиз',
'Бельгия',
'Бенин',
'Болгария',
'Боливия',
'Босния и Герцеговина',
'Ботсвана',
'Бразилия',
'Бруней',
'Буркина-Фасо',
'Бурунди',
'Бутан',
'Вануату',
'Великобритания',
'Венгрия',
'Венесуэла',
'Восточный Тимор',
'Вьетнам',
'Габон',
'Гаити',
'Гайана',
'Гамбия',
'Гана',
'Гватемала',
'Гвинея',
'Гвинея-Бисау',
'Германия',
'Гондурас',
'Гренада',
'Греция',
'Грузия',
'Дания',
'Джибути',
'Доминика',
'Доминикана',
'Египет',
'Замбия',
'Зимбабве',
'Израиль',
'Индия',
'Индонезия',
'Иордания',
'Ирак',
'Иран',
'Ирландия',
'Исландия',
'Испания',
'Италия',
'Лаос',
'Латвия',
'Лесото',
'Либерия',
'Ливан',
'Ливия',
'Литва',
'Лихтенштейн',
'Люксембург',
'Намибия',
'Науру',
'Непал',
'Нигер',
'Нигерия',
'Нидерланды',
'Никарагуа',
'Новая Зеландия',
'Норвегия',
'Чад',
'Черногория',
'Чехословакия',
'Чили',
];

export const flags = {
  'австралия': 'flag-australia',
  'бельгия': 'flag-belgium',
  'босния и герцеговина': 'flag-bosnia',
  'чехословакия': 'flag-czech',
  'доминикана': 'flag-dominica',
  'франция': 'flag-france',
  'сейшелы': 'flag-seychelles',
  'шри-ланка': 'flag-sri-lanka',
  'тайланд': 'flag-thailand',
  'великобритания': 'flag-united-kingdom',
  'сша': 'flag-usa'
}
class Dropdown {
  constructor(input, field, container) {
    this._input = input;
    this._field = field;
    this._container= container;
    this._table = this._container.querySelector('.country-select__table');
    this._list = this._container.querySelector('.country-select__list');
    this._imgContainer = this._container.querySelector('.country-select__img');

    this.changeActive = this._changeActive.bind(this);
    this.changeInput = this._changeInput.bind(this);

    this._bind();
  }

  _renderList(arr) {
    this._list.innerHTML = '';

    const fragment = document.createDocumentFragment();

    arr.forEach((item) => {
      let li = document.createElement('li');
      li.textContent = item;

      fragment.appendChild(li);
    });

    this._list.appendChild(fragment);
  }

  _changeActive(e) {
    e.stopPropagation();
    let target = e.target;
    if (target.classList.contains('country-select__table')) {
      return;
    };

    let  tds = this._table.querySelectorAll('td');

    tds.forEach((item) => {
      if (item.classList.contains('active-td')) {
        item.classList.remove('active-td');
      }
    });

    target.classList.add('active-td');

    const countryList = countries.filter((item) => {
      if (item.startsWith(target.textContent)) {
        return item;
      }
    });

    this._renderList(countryList);
  }

  _changeInput(e) {
    e.stopPropagation();
    if (e.target.classList.contains('country-select__list')) {
      return;
    };
    this._input.value = e.target.textContent.toLowerCase();
    this._field.textContent = e.target.textContent;
    this._container.classList.add('country-select--checked');

    this._imgContainer.innerHTML = this._createTemplateImg({title: e.target.textContent, flag: flags[e.target.textContent.toLowerCase()]});
  }

  _createTemplateImg(option) {
    return `<svg viewBox="0 0 70 47" role="img">
      <title>Изображение флага ${option.title}</title>
      <use xlink:href="#${option.flag}"></use>
    </svg>`
  }

  _bind() {
    this._table.addEventListener('click', this.changeActive);
    this._list.addEventListener('click', this.changeInput);
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
    this._handlers = [];
    this._open = false;

    this.curry = this._curry.bind(this);
    this.addNewCountry = this._addNewCountry.bind(this);

    this._createELement(this._buttons.add);
  }

  _curry(i, fn) {
    return (e) => {
      fn.apply(this, [e, i]);
    };
  }

  _changeCountry(e, i) {
    e.stopPropagation();
    let dropdown = null;
    let open = !this._open;
    this._open = open;
    const target = e.target.offsetParent.offsetParent; // pull info about parent eventTarget because we need add class him
    if (!this._dropdowns[i]) {
      dropdown = new Dropdown(target.querySelector('input'), target.querySelector('.country-select__value'), target);
      this._dropdowns[i] = dropdown;
    } else {
      dropdown = this._dropdowns[i];
    }

    if (open) {
      e.target.innerHTML = '<span class="visually-hidden">Закрыть список стран</span>';
    } else {
      e.target.innerHTML = '<span class="visually-hidden">Открыть список стран</span>';
    }

    target.classList.toggle('country-select--opened');
  }

  _addNewCountry(e) {
    e.stopPropagation();
    this._createELement(this._buttons.change);
  }

  _deleteCountry(e, i) {
    e.stopPropagation();
    this._container.removeChild(this._elements[i]);
    this._elements[i] = null;
    console.log(this._elements);
  }

  _bind(el, i) {
    const country = el.querySelector('.country-select');
    const button = el.querySelector('.country-select__change-button');
    const deleteButton = el.querySelector('.country-select__delete-country');

    if (country.classList.contains('country-select--add')) {
      button.addEventListener('click', this.addNewCountry);
    } else {
      button.addEventListener('click', this.curry(i, this._changeCountry));
    }

    deleteButton.addEventListener('click', this.curry(i, this._deleteCountry));

    country.addEventListener('click', (e) => {
      if (e.target.classList.contains('country-select__change-country')) {
        return;
      } else {
        button.click();
      }
    });
  }

  _render() {
    const fragment = document.createDocumentFragment();
    const reverseElem = this._elements.slice().reverse();

    reverseElem.forEach((item) => {
      if (item) {
        fragment.appendChild(item);
      }
    });

    this._container.appendChild(fragment);
  }

  _createELement(options) {
    const li = document.createElement('li');
    li.innerHTML = this._createTemplate(options);

    this._bind(li, this._elements.length);

    this._elements.push(li);

    this._render();
  }

  _createTemplate(options) {

    return `<div class="country-select ${options.className}">
      <svg class="country-select__arrow" width="5" height="10" aria-hidden="true">
        <use xlink:href="#small-arrow"></use>
      </svg>
      <input class="visually-hidden" type="text" name="country" value="">
      <p class="country-select__selected"><span class="country-select__value">${options.textVal}</span>
        <button class="country-select__change-button" type="button"><span class="visually-hidden">${options.textBtn}</span></button>
      </p>
      <div class="country-select__img"></div>
      <button class="country-select__delete-country" type="button"><span class="visually-hidden">Удалить страну из списка</span></button>
      <div class="country-select__dropdown">
      <div>
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
      </div>

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

const select = new CountrySelect(document.querySelector('.route__country-list'));
