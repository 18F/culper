import React from 'react'
import { mount } from 'enzyme'
import Person from './Person'

describe('The relative alias component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'person'
    }

    const component = mount(<Person {...expected} />)
    expect(component.find('.alias-name').length).toEqual(1)
  })
})
