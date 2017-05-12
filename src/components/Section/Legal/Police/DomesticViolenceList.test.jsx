import React from 'react'
import { mount } from 'enzyme'
import DomesticViolenceList from './DomesticViolenceList'

describe('The DomesticViolenceList  component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'sentence'
    }
    const component = mount(<DomesticViolenceList {...expected} />)
    expect(component.find('.police').length).toBe(1)
  })

  it('updates value', () => {
    let updates = 0
    const expected = {
      name: 'sentence',
      onUpdate: () => { updates++ }
    }
    const component = mount(<DomesticViolenceList {...expected} />)
    component.find('.has-order .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('loads valid domestic violence order', () => {
    const expected = {
      name: 'sentence',
      onUpdate: () => {},
      List: [
        {
          Has: 'Yes',
          domestic: {
            CourtName: {
              value: '4th Circuit Court'
            },
            CourtAddress: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            Explanation: {
              value: 'Some content'
            },
            Issued: {
              month: '1',
              year: '2009'
            }
          }
        }
      ]
    }
    const component = mount(<DomesticViolenceList {...expected} />)
    expect(component.find('.domestic-violence').length).toBe(1)
  })
})

