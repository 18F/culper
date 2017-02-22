import React from 'react'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The employment component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'employment'
    }
    const component = mount(<Employment name={expected.name} />)
    expect(component.find('button.add').length).toEqual(1)
  })

  it('can add another employment to collection', () => {
    const expected = {
      name: 'employment'
    }
    const component = mount(<Employment name={expected.name} />)
    component.find('button.add').simulate('click')
    expect(component.find('div.item').length).toBe(2)
  })

  it('can load initial data', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      name: 'employment',
      List: [
        {
          DatesEmployed: {
            from: new Date('1/1/2008'),
            to: new Date('1/1/2012'),
            name: 'DatesEmployed',
            open: true
          }
        },
        {
          DatesEmployed: {
            from: new Date('1/1/2008'),
            name: 'DatesEmployed',
            open: true
          }
        },
        {
          DatesEmployed: {
            to: new Date('1/1/2008'),
            name: 'DatesEmployed',
            open: true
          }
        }
      ]
    }
    const component = mount(<Employment name={expected.name} List={expected.List} onUpdate={expected.onUpdate} />)
    component.find('button.add').simulate('click')
    expect(component.find('div.item').length).toBe(4)
    expect(updates).toBe(1)
  })
})
