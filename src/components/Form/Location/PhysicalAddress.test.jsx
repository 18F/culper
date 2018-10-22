import React from 'react'
import { mount } from 'enzyme'
import PhysicalAddress from './PhysicalAddress'
import { address } from '../../../config/locales/en/address'

describe('<PhysicalLocation />', () => {
  it('renders a location component', () => {
    const component = mount(<PhysicalAddress />)

    expect(component.find('Location').length).toEqual(1)
  })

  it.only('renders the correct field label', () => {
    const component = mount(<PhysicalAddress />)
    const field = component.find('Field')

    expect(field.length).toEqual(1)
    expect(field.prop('title')).toEqual(address.physicalLocationRequired)
  })
})