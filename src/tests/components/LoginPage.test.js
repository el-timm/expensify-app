import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('render LoginPage', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test('startLogin on button click', () => {
    const startLogin = jest.fn(); // spy
    const wrapper = shallow(<LoginPage startLogin={startLogin} />);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});