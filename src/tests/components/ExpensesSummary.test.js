import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('render ExpensesSummary (no expenses)', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0} expenseTotal={0} />);
    expect(wrapper).toMatchSnapshot();
});

test('render ExpensesSummary (1 expense)', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={12300} />);
    expect(wrapper).toMatchSnapshot();
});

test('render ExpensesSummary (3 expenses)', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expenseTotal={1234500} />);
    expect(wrapper).toMatchSnapshot();
});