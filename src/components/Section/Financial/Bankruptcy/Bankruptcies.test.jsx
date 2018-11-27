import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Bankruptcies from './Bankruptcies'

describe('The bankruptcies component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Bankruptcies {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'bankruptcy'
    }
    const component = createComponent(expected)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(0)
  })

  it('Updates with has bankruptcy', () => {
    let updates = 0
    const expected = {
      name: 'bankruptcy',
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with data loaded', () => {
    let bankruptcyData = {
      items: [
        {
          Item: {
            PetitionType: 'Chapter7',
            CourtAddress: {
              country: 'United States',
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            },
            CourtInvolved: {
              value: 'Some Court'
            },
            CourtNumber: {
              value: 'C1234'
            },
            DateFiled: {
              month: '1',
              year: '2010'
            },
            DateDischarged: {
              month: '1',
              year: '2012'
            },
            NameDebt: {
              first: 'Foo',
              firstInitialOnly: false,
              middle: 'J',
              middleInitialOnly: true,
              noMiddleName: false,
              last: 'Bar',
              lastInitialOnly: false,
              suffix: 'Jr'
            },
            TotalAmount: {
              value: 200
            },
            HasDischargeExplanation: 'Yes',
            DischargeExplanation: {
              value: 'Something'
            }
          }
        }
      ]
    }
    let updates = 0
    const expected = {
      name: 'bankrupcty',
      HasBankruptcy: {
        value: 'Yes'
      },
      List: bankruptcyData,
      onUpdate: () => {
        updates++
      }
    }

    const component = createComponent(expected)
    component.find('.courtnumber input[name="CourtNumber"]').simulate('change')
    expect(updates).toBe(2)
  })
})
