import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('render ExpenseForm (no data)', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('render ExpenseForm (with data)', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0] } />);
    expect(wrapper).toMatchSnapshot();
});

test('render ExpenseForm (invalid)', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('render ExpenseForm (set description)', () => {
    const value = 'new description';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(0).simulate('change', {
        preventDefault: () => {},
        target: {
            value: value
        }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('render ExpenseForm (set note)', () => {
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('textarea').simulate('change', {
        target: {
            value: value
        }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('render ExpenseForm (set amount [valid])', () => {
    const amount = '23.50';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: amount
        }
    });
    expect(wrapper.state('amount')).toBe(amount);
});

test('render ExpenseForm (!set amount [invalid])', () => {
    const amount = '12.122';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: amount
        }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('render ExpenseForm (onSubmit)', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('render ExpenseForm (set date onDateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('render ExpenseForm (set calendarFocused onFocusChange', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual(focused);
});