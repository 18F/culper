import React from 'react'
import { mount } from 'enzyme'
import Education from './Education'

describe('The Education component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'education'
    }
    const component = mount(<Education {...expected} />)
    expect(component.find('.education').length).toEqual(1)
  })

  it('no error on with items', () => {
    const expected = {
      name: 'education',
      List: {
        items: [
          {
            Item: {
            }
          }
        ]
      }
    }
    const component = mount(<Education {...expected} />)
    expect(component.find('.education').length).toEqual(2)
  })
})
