import uuid from 'uuid';
import database from '../firebase/firebase';
import * as firebase from 'firebase';

// React + Redux (only)
// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// React + Firebase (+ Redux)
// component calls action generator
// action generator returns fuction
// component dispatches fnction (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)
//    returns an object, which manipulates the Redux store


// ADD_EXPENSE
export const addExpense = (expense) => ({
        type: 'ADD_EXPENSE',
        expense
});

// uses redux thunk
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData;

        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
            });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// startSetExpenses
export const startSetExpenses = () => {
    return (dispatch) => {

        return database.ref('expenses')
            .once('value')
            .then((snapshot) => {
                const expenses = [];
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                });
                dispatch(setExpenses(expenses));
            });
    };    
};