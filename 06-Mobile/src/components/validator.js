let amountToken = null;

const getCheckMethod = (rule) => {
  let tokens = rule.split('-');
  if (tokens.length > 1 && isNaturalNumberChecker(tokens[tokens.length - 1])) {
    amountToken = Number(tokens.pop());
    rule = tokens.join('-');
  }

  switch (rule) {
    case 'NOT-EMPTY':
      return notEmptyChecker;
    case 'IS-STRING':
      return isStringChecker;
    case 'IS-WORD':
      return isWord;
    case 'IS-NUMBER':
      return isNumberChecker;
    case 'IS-ENUM-OF-CURRENCIES':
      return isCurrencyChecker;
    case 'IS-URL':
      return isUrlChecker;
    case 'IS-NATURAL-NUMBER':
      return isNaturalNumberChecker;
    case 'MIN-LENGTH':
      return minLengthChecker;
  }
};

const CURRENCIES = ['BYN', 'RUR', 'USD', 'EUR'];

const trim = (value) => {
  return value ? value.trim() : '';
};

// All the methods called with NULL parameter will be returning error message
// This behavior allows to reuse one checking methods by other checking methods

// NOT-EMPTY checker
const notEmptyChecker = (value) => {
  if (value === null) return 'Пустое значение не допустимо';
  return trim(value).length > 0;
};

// IS-STRING checker
const isStringChecker = (value) => {
  if (value === null) return 'Требуется ввести строковое значение';
  return typeof value === 'string' && !isNumberChecker(value);
};

// IS-WORD checker
const isWord = (value) => {
  if (value === null) return 'Может содержать только буквы';
  return value === '' || /^[a-zа-яы]+$/i.test(value);
};

// IS-NUMBER checker
const isNumberChecker = (value) => {
  if (value === null) return 'Требуется ввести числовое значение';
  return notEmptyChecker(value) && !isNaN(Number(value));
};

// ENUM-OF-CURRENCIES checker
const isCurrencyChecker = (value) => {
  if (value === null) return 'Недопустимая валюта';
  return CURRENCIES.indexOf(value) !== -1;
};

// IS-URL checker
const isUrlChecker = (value) => {
  if (value === null) return 'невалидный URL';
  return urlTest ? urlTest.test(value) : true;
};

// NATURAL-NUMBER checker
const isNaturalNumberChecker = (value) => {
  if (value === null) return 'Число не может быть дробным или отрицательным';
  return isNumberChecker(value) && -1 < value && parseInt(value) - parseFloat(value) === 0;
};

// MIN-LENGTH-N checker
const minLengthChecker = (value) => {
  if (value === null) return `Минимальная длина поля ${amountToken} символов (без пробелов)`;
  if (!amountToken) return notEmptyChecker(value);
  return -1 < value.replace(/\s{2,}/, '').length - amountToken;
};

export const VALIDATION_TYPES = {
  notEmpty: 'NOT-EMPTY',
  isString: 'IS-STRING',
  isWord: 'IS-WORD',
  isNumber: 'IS-NUMBER',
  isCurrency: 'IS-ENUM-OF-CURRENCIES',
  isURL: 'IS-URL',
  isNaturalNumber: 'IS-NATURAL-NUMBER',
  minLength: (len) => `MIN-LENGTH-${len}`,
};

export default function (value, rules) {
  for (let i = 0; i < rules.length; i++) {
    let checkMethod = getCheckMethod(rules[i]);
    if (!checkMethod) continue;
    let isValid = checkMethod(value);
    if (!isValid) {
      return checkMethod(null);
    } // fail fast with an error message
  }
}
