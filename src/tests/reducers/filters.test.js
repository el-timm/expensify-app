import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('test default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('test sortBy=amount filter', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('test sortBy=date filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('test text filter', () => {
    const text = 'This is my filter';
    const state = filtersReducer(undefined, { text, type: 'SET_TEXT_FILTER'});
    expect(state.text).toBe(text);
});

test('test startDate filter', () => {
    const startDate = moment();
    const state = filtersReducer(undefined, { startDate, type: 'SET_START_DATE'});
    expect(state.startDate).toEqual(startDate);
});

test('test endDate filter', () => {
    const endDate = moment();
    const state = filtersReducer(undefined, { endDate, type: 'SET_END_DATE'});
    expect(state.endDate).toEqual(endDate);
});

