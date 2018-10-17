export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0);

    // const sum = (items, prop) => {
    //     return items.reduce( (a, b) => {
    //         return a + b[prop];
    //     }, 0);
    // };
    //
    // return sum(expenses, 'amount');
};