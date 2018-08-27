import React from 'react'
import { mount } from 'enzyme'
import HairColor from './HairColor'

describe('The HairColor component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<HairColor {...expected} />)
    component.find('.bald input').simulate('change')
    expect(component.find('input').length).toEqual(14)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('sets a value', () => {
    let updates = 0
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<HairColor {...expected} />)
    component.find('.bald input').simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
