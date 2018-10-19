import authReducer from '../../reducers/auth';

test('test login - set uid', () => {
    const action = {
        type: 'LOGIN',
        uid: 'xxx123'
    };
    const state = authReducer({}, action);
    expect(state.uid).toEqual(action.uid);
});

test('test logout - clear uid', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'anything'}, action);
    expect(state).toEqual({});

});