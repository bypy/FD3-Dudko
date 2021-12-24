'use strict';

import { subscriberFilterFunc } from '../src/components/utils';

let subscribers = [
  { balance: 200 }, // active
  { balance: 0 }, // active
  { balance: -0 }, // active
  { balance: -999999999999999 }, // blocked
  { balance: +0 }, // active
  { balance: -220 }, // blocked
];

describe('проверка работы фильтрации списка абонентов', () => {

  test('список без фильтров // код фильтра = 0', () => {
    expect(subscribers.filter((s) => subscriberFilterFunc(0, s)).length)
      .toBe(subscribers.length);
  });

  test('список c фильтром только активных абонентов // код фильтра = 1', () => {
    expect(subscribers.filter((s) => subscriberFilterFunc(1, s)).length)
      .toBe(4);
  });

  test('список c фильтром только заблокированных абонентов // код фильтра = 2', () => {
    expect(subscribers.filter((s) => subscriberFilterFunc(2, s)).length)
      .toBe(2);
  });

});
