import React from 'react'
import { mount } from 'enzyme'
import Cohabitants from './Cohabitants'

describe('The cohabitants component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
  })

  it('performs updates ', () => {
    let updates = 0
    const expected = {
      name: 'cohabitants',
      HasCohabitant: { value: 'Yes' },
      CohabitantList: [
        {
          Cohabitant: {
            SameSpouse: true,
            spouse: {
              first: 'Foo',
              middle: 'FB',
              last: 'Far'
            },
            Name: {
              first: 'Foo',
              firstInitialOnly: false,
              middle: 'FB',
              middleInitialOnly: false,
              noMiddleName: false,
              last: 'Bar',
              suffix: ''
            },
            SSN: {}
          }
        }
      ],
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
    updates = 0
    component.find('.has-cohabitant .yes input').simulate('change')
    expect(updates).toBe(1)
  })
})
