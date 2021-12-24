import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import MobileCompany from '../src/components/MobileCompany';
import Subscriber from '../src/components/Subscriber';
import StatusFilter from '../src/components/StatusFilter';
import { concatAndHash, subscriberFilterFunc } from '../src/components/utils';

const subscribers = require('../src/data/subscribers.json').map((subscriber) => {
  subscriber.id = concatAndHash(subscriber.lastName, subscriber.firstName, subscriber.surName);
  return subscriber;
});

// mock confirm action
global.confirm = jest.fn(() => true);

describe('удаление абонента из MobileCompany', () => {
  let component = renderer.create(<MobileCompany company={'A1'} subscribers={subscribers} />);
  let componentInstance = component.root;

  test('рендеринг перед удалением абонента', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  let deleteButtons = componentInstance.findAll((el) => el.type === 'button' && el.props.name === 'delete');
  let subscriberIndexToDelete = 2; // remove third subscriber from list
  let deleteButtonElem = deleteButtons[subscriberIndexToDelete];
  deleteButtonElem.props.onClick(undefined);

  test('рендеринг после удаления абонента', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  let subscribersList = componentInstance.findAllByType(Subscriber);
  test('длина списка абонентов уменьшилась на один', () => {
    expect(subscribersList.length).toEqual(componentInstance.props.subscribers.length - 1);
  });

  test('выбранный для удаления id абонента отсутствует среди отображаемых абонентов', () => {
    let deletedId = null;
    componentInstance.props.subscribers.forEach((subscriber, index) => {
      if (index === subscriberIndexToDelete) deletedId = subscriber.id;
    });
    expect(subscribersList.filter((el) => el.props.data.id === deletedId)).toEqual([]);
  });

  component.unmount();
});


describe('фильтрация абонентов MobileCompany', () => {
  let component = renderer.create(<MobileCompany company={'A1'} subscribers={subscribers} />);
  let componentInstance = component.root;
  let subscribersList,
    filteredList;

  test('рендеринг без фильтра', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  let wrapper = mount(<MobileCompany company={'A1'} subscribers={subscribers} />);
  let activeFilterCode = 1;
  wrapper.find(StatusFilter).find('.buttons-tab').simulate('click', {
    target: {
      name: activeFilterCode
    }
  });
  subscribersList = componentInstance.findAllByType(Subscriber);
  filteredList = componentInstance.props.subscribers.filter(s => subscriberFilterFunc(activeFilterCode, s));
  test('длина списка активных абонентов', () => {
    expect(subscribersList.length).toEqual(filteredList.length);
  });
  test('рендеринг списка активных абонентов', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
