import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, addExpense, 
    editExpense, startEditExpense,
    startRemoveExpense, removeExpense, 
    setExpenses, startSetExpenses 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuser123';
const defaultAuthState = {
    auth: {
        uid
    }
};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('action removeExpense', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('startRemoveExpenses (from firebase)', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({ id }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            });
            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
});

test('action editExpense', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { note: 'New note value' }
    });
});

test('startEditExpense (from firebase)', (done) => {
    const store = createMockStore(defaultAuthState);

    const id = expenses[0].id;
    const updates = {
        description: 'Test Description',
        amount: 111555
    };

    store.dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            });

            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            const updatedExpense = snapshot.val();
            expect(updatedExpense.description).toEqual(updates.description);
            expect(updatedExpense.amount).toEqual(updates.amount);
            done();
        });
});

test('action addExpense', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('action addExpense (to db & store)', (done) => {
    const store = createMockStore(defaultAuthState);

    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('action addExpense (with defaults to db & store)', (done) => {
    const store = createMockStore(defaultAuthState);

    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});

test('setExpense action object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('startSetExpenses (from firebase)', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            });
            done();
        });
});