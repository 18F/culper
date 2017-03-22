import React from 'react'
import { mount } from 'enzyme'
import { ResidenceItem } from './Residence'

describe('The residence component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'residence'
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.residence').length).toEqual(1)
    expect(component.find('.reference').length).toEqual(0)
  })

  it('displays character reference within 3 years', () => {
    const expected = {
      name: 'residence',
      Dates: {
        to: {
          date: new Date()
        }
      },
      Reference: {
        Email: 'test@abc.com'
      }
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.reference').length).toEqual(1)
  })

  it('displays text box when other is selected', () => {
    const expected = {
      name: 'residence',
      Role: 'Other',
      OtherRole: {}
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const expected = {
      name: 'residence',
      Role: 'Dance'
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })
})
