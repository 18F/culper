import React from 'react'
import { mount } from 'enzyme'
import { DiplomaItem } from './Diploma'

describe('The diploma component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'diploma'
    }
    const component = mount(<DiplomaItem {...expected} />)
    expect(component.find('.diploma').length).toEqual(1)
  })

  it('display textbox if "Other" is selected', () => {
    const expected = {
      name: 'diploma',
      Diploma: 'Other'
    }
    const component = mount(<DiplomaItem {...expected} />)
    expect(component.find('.other').length).toEqual(1)
  })

  it('not display textbox if "Other" is not selected', () => {
    const expected = {
      name: 'diploma',
      Diploma: 'Doctorate'
    }
    const component = mount(<DiplomaItem {...expected} />)
    expect(component.find('.other').length).toEqual(0)
  })
})
