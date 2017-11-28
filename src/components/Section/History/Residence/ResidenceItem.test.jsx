import React from 'react'
import { mount } from 'enzyme'
import ResidenceItem from './ResidenceItem'

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
        from: {
          month: '1',
          day: '1',
          year: '2000',
          date: new Date('1/1/2000')
        },
        to: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date()}.getFullYear()}`,
          date: new Date()
        }
      },
      Reference: {
        Email: {
          value: 'test@abc.com'
        }
      }
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.reference').length).toEqual(1)
  })

  it('displays text box when other is selected', () => {
    const expected = {
      name: 'residence',
      Role: {
        value: 'Other'
      },
      OtherRole: {}
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const expected = {
      name: 'residence',
      Role: {
        value: 'Dance'
      }
    }
    const component = mount(<ResidenceItem {...expected} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })
})
