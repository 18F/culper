import React from 'react';
import { shallow } from 'enzyme'
import alternateAddressProvider from './alternateAddressProvider'

describe('.alternateAddressProvider', () => {
  it('decorates the supplied component with the correct props', () => {
    const Component = alternateAddressProvider(() => <div />)
    Component.prototype.renderAlternateAddress = jest.fn();
    const component = shallow(<Component />)
    const mock = component.instance().renderAlternateAddress;
    const expected = {
      addressBook: 'Residence',
      AlternateAddress: {
        Address: {},
        HasDifferentAddress: { value: '' }
      },
      allowForeignMilitary: true,
      render: mock
    }

    expect(component.props()).toEqual(expected);
  })
})
