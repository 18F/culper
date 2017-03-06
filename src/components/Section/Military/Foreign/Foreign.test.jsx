import React from 'react'
import { mount } from 'enzyme'
import Foreign from './Foreign'

describe('The military foreign component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'military-foreign'
    }
    const component = mount(<Foreign {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(1)
    expect(component.find('.foreign-service').length).toEqual(0)
  })

  it('selecting no to military foreign does nothing', () => {
    const expected = {
      name: 'military-foreign',
      List: [
        {
          Has: 'No'
        }
      ]
    }
    const component = mount(<Foreign {...expected} />)
    expect(component.find('.foreign-service').length).toEqual(0)
  })

  it('selecting yes to military foreign displays the form', () => {
    const expected = {
      name: 'military-foreign',
      List: [
        {
          Has: 'Yes'
        }
      ]
    }
    const component = mount(<Foreign {...expected} />)
    expect(component.find('.foreign-service').length).toEqual(1)
  })
})
