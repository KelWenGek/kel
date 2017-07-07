import React, { Component } from 'react';
import Link from '../Link';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
test('jsx element render', () => {
    const checkbox = shallow(
        <Link labelOn="On" labelOff="Off" />
    );
    expect(checkbox.text()).toEqual('Off');
    checkbox.find('input').simulate('change');
    // expect(checkbox.text()).toEqual('On');
});