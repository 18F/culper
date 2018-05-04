import React from 'react'
import { mount } from 'enzyme'
import Disciplinary from './Disciplinary'

describe('The military disciplinary component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'military-disciplinary'
    }
    const component = mount(<Disciplinary {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting no to military disciplinary does nothing', () => {
    const expected = {
      name: 'military-disciplinary',
      HasDisciplinary: { value: 'No' }
    }
    const component = mount(<Disciplinary {...expected} />)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting yes to military disciplinary displays the form', () => {
    const expected = {
      name: 'military-disciplinary',
      HasDisciplinary: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Date: {} } }] }
    }
    const component = mount(<Disciplinary {...expected} />)
    expect(component.find('.accordion').length).toEqual(1)
  })
})
