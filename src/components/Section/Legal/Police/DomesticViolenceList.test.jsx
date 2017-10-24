import React from 'react'
import { mount } from 'enzyme'
import DomesticViolenceList from './DomesticViolenceList'
import Location from '../../../Form/Location'

describe('The DomesticViolenceList  component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'sentence'
    }
    const component = mount(<DomesticViolenceList {...expected} />)
    expect(component.find('.domestic-violence-list').length).toBe(1)
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
      List: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              domestic: {
                CourtName: {
                  value: '4th Circuit Court'
                },
                CourtAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
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
          }
        ]
      }
    }
    const component = mount(<DomesticViolenceList {...expected} />)
    expect(component.find('.domestic-violence').length).toBe(1)
  })
})
