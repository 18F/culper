import React from 'react'
import { mount } from 'enzyme'
import Residence from './Residence'

describe('The Residence component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'residence',
      List: []
    }
    const component = mount(<Residence {...expected} />)
    expect(component.find('.residence').length).toEqual(1)
    expect(component.find('.item').length).toEqual(1)
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
    const component = mount(<Residence {...expected} />)
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
    const component = mount(<Residence {...expected} />)
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
    const component = mount(<Residence {...expected} />)
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('loads data', () => {
    let updates = 0
    const expected = {
      name: 'residence',
      onUpdate: () => {
        updates++
      },
      List: [
        {
          open: true,
          Residence: {
            Role: 'Dance',
            Address: {
              address: '1234 Some Rd'
            }
          }
        }
      ]
    }
    const component = mount(<Residence {...expected} />)
    let textarea = component.find('textarea[name="address"]').first()
    textarea.simulate('change')
    expect(updates).toBe(1)
  })

  it('can add another residence to collection', () => {
    let expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Role: 'Dance',
            Address: {
              address: '1234 Some Rd'
            }
          }
        },
        {
          Residence: {
            Address: {
              address: '1234 Some Rd',
              addressType: 'International',
              city: 'Munich',
              country: 'Germany'
            },
            Dates: {
              from: new Date('1/1/2008'),
              to: new Date('1/1/2012'),
              name: 'Dates',
              open: true
            }
          }
        },
        {
          Residence: {
            Address: {
              address: '1234 Some Rd',
              addressType: 'APOFPO',
              zipcode: '12345'
            },
            Dates: {
              from: new Date('1/1/2008'),
              name: 'Dates',
              open: true
            }
          }
        },
        {
          Residence: {
            Dates: {
              to: new Date('1/1/2008'),
              name: 'Dates',
              open: true
            }
          }
        }
      ]
    }
    const component = mount(<Residence name={expected.name} List={expected.List} />)
    component.find('button.add').simulate('click')
    expect(component.find('div.item').length).toBe(5)
  })
})
