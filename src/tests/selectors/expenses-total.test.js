import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('return 0 if no expenses', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test('total of single expense', () => {
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toBe(expenses[0].amount)
});

test('total of multiple expenses', () => {
    const sum = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    const total = getExpensesTotal([expenses[0], expenses[1], expenses[2]]);
    expect(total).toBe(sum);
});