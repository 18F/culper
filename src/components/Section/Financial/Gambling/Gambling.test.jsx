import React from 'react'
import { mount } from 'enzyme'
import Gambling from './Gambling'

describe('The gambling component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Gambling name={expected.name} />)
    expect(component.find('button.add').length).toEqual(1)
  })
})
