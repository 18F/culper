import React from 'react'
import { mount } from 'enzyme'
import Residence from './Residence'

describe('The Residence component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'residence'
    }
    const component = mount(<Residence name={expected.name} />)
    expect(component.find('.reference').length).toEqual(0)
  })

  it('displays character reference within 3 years', () => {
    const expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Dates: {
              to: new Date()
            },
            Reference: {
              Email: 'test@abc.com'
            }
          }
        }
      ]
    }
    const component = mount(<Residence name={expected.name} List={expected.List} />)
    expect(component.find('.reference').length).toEqual(1)
  })

  it('displays text box when other is selected', () => {
    const expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Role: 'Other'
          }
        }
      ]
    }
    const component = mount(<Residence name={expected.name} List={expected.List} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Role: 'Dance'
          }
        }
      ]
    }
    const component = mount(<Residence name={expected.name} List={expected.List} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })
})
