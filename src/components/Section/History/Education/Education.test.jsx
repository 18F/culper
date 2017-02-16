import React from 'react'
import { mount } from 'enzyme'
import { EducationItem } from './Education'

describe('The education component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'education'
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.education').length).toEqual(1)
  })
})
