import React from 'react'
import { mount } from 'enzyme'
import Reprimand from './Reprimand'

describe('The reprimand component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'bad_dog'
    }
    const component = mount(<Reprimand {...expected} />)
    expect(component.find('.option-list').length).toBe(1)
  })

  it('loads values', () => {
    let updates = 0
    const expected = {
      name: 'bad_dog',
      items: [{ Item: {Has: { value: 'Yes' }}}],
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Reprimand {...expected} />)
    component.find({name: 'Text'}).simulate('change')
    component.find({name: 'month'}).simulate('change', {target: { value: '1' }})
    expect(updates).toBe(2)
  })
})
