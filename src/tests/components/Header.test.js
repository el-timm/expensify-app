import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('render Header', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />);
    expect(wrapper).toMatchSnapshot();

    // expect(wrapper.find('h1').text()).toBe('Expensify');

    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    //console.log(renderer.getRenderOutput());
});

test('startLogout on button click', () => {
    const startLogout = jest.fn(); // spy
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});