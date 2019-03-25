import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import Location from 'components/Form/Location'
import { Hospitalizations } from './Hospitalizations'

const List = {
  items: [
    {
      type: 'Employment',
      Item: {
        EmploymentActivity: {
          value: 'FederalContractor',
        },
        Dates: {
          from: {
            month: '1',
            day: '1',
            year: '2010',
          },
          to: {
            month: '1',
            day: '1',
            year: '2012',
          },
          present: false,
        },
        Employment: {
          value: 'SW',
        },
        Status: {
          value: 'Some status',
        },
        Title: {
          value: 'Dev',
        },
        Address: {
          country: 'United States',
          street: '1234 Some Rd',
          city: 'Arlington',
          state: 'Virginia',
          zipcode: '22202',
          layout: Location.ADDRESS,
        },
        Additional: {
          HasAdditionalActivity: 'No',
          List: [],
        },
        Telephone: {
          noNumber: '',
          number: '2028675309',
          numberType: 'Cell',
          timeOfDay: 'Day',
        },
        Supervisor: {
          Address: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          Email: {
            value: 'foo@local.dev',
          },
          SupervisorName: {
            value: 'John Doe',
          },
          Telephone: {
            noNumber: '',
            number: '2021112222',
            numberType: 'Cell',
            timeOfDay: 'Day',
          },
          Title: {
            value: 'The Foo',
          },
        },
        ReasonLeft: {
          Reasons: [
            {
              Has: 'Yes',
              Reason: 'Fired',
              Date: {
                day: '1',
                month: '1',
                year: '2016',
              },
              Text: {
                value: 'Some excuse',
              },
            },
          ],
        },
        Reprimand: {
          Reasons: [
            {
              Date: {
                month: '1',
                year: '2015',
              },
              Has: 'Yes',
              Text: {
                value: 'Foo',
              },
            },
          ],
        },
      },
    },
  ],
}

describe('The Hospitalizations component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({ application: { Errors: {}, Completed: {} } })
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Hospitalizations {...expected} />
        </Provider>
      )
    )
  })

  it.skip('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.hospitalizations').length).toBe(1)
  })

  it.skip('Performs updates', () => {
    let updates = 0
    const props = {
      Hospitalized: { value: 'Yes' },
      List: {
        items: [
          {
            Admission: 'Voluntary',
          },
        ],
      },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(props)
    expect(component.find('.hospitalization').length).toBe(1)
    updates = 0
    component.find({ type: 'radio', value: 'Voluntary' }).simulate('change')
    component
      .find('.explanation textarea')
      .simulate('change', { target: { value: 'Testing' } })
    component
      .find('.facility input')
      .simulate('change', { target: { value: 'Testing' } })
    expect(updates).toBe(3)
  })

  it.skip('Loads data', () => {
    let updates = 0
    const props = {
      Hospitalized: { value: 'Yes' },
      List,
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(props)
    updates = 0
    component
      .find('.facility input')
      .simulate('change', { target: { value: 'Testing' } })
    expect(updates).toBe(1)
  })
})
