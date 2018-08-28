import React from 'react'
import { mount } from 'enzyme'
import Hospitalizations from './Hospitalizations'
import Location from '../../../Form/Location'

describe('The Hospitalizations component', () => {
  it('Renders without errors', () => {
    const component = mount(<Hospitalizations />)
    expect(component.find('.hospitalizations').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      Hospitalized: { value: 'Yes' },
      List: {
        items: [
          {
            Admission: 'Voluntary'
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Hospitalizations {...props} />)
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

  it('Loads data', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <Hospitalizations
        onUpdate={onUpdate}
        List={List}
        Hospitalized={{ value: 'Yes' }}
      />
    )
    updates = 0
    component
      .find('.facility input')
      .simulate('change', { target: { value: 'Testing' } })
    expect(updates).toBe(1)
  })
})

const List = {
  items: [
    {
      type: 'Employment',
      Item: {
        EmploymentActivity: {
          value: 'FederalContractor'
        },
        Dates: {
          from: {
            date: new Date('1/1/2010')
          },
          to: {
            date: new Date('1/1/2012')
          },
          present: false
        },
        Employment: {
          value: 'SW'
        },
        Status: {
          value: 'Some status'
        },
        Title: {
          value: 'Dev'
        },
        Address: {
          country: 'United States',
          street: '1234 Some Rd',
          city: 'Arlington',
          state: 'Virginia',
          zipcode: '22202',
          layout: Location.ADDRESS
        },
        Additional: {
          HasAdditionalActivity: 'No',
          List: []
        },
        Telephone: {
          noNumber: '',
          number: '2028675309',
          numberType: 'Cell',
          timeOfDay: 'Day'
        },
        Supervisor: {
          Address: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Email: {
            value: 'foo@local.dev'
          },
          SupervisorName: {
            value: 'John Doe'
          },
          Telephone: {
            noNumber: '',
            number: '2021112222',
            numberType: 'Cell',
            timeOfDay: 'Day'
          },
          Title: {
            value: 'The Foo'
          }
        },
        ReasonLeft: {
          Reasons: [
            {
              Has: 'Yes',
              Reason: 'Fired',
              Date: {
                date: new Date('1/1/2016'),
                day: '1',
                month: '1',
                year: '2016'
              },
              Text: {
                value: 'Some excuse'
              }
            }
          ]
        },
        Reprimand: {
          Reasons: [
            {
              Date: {
                date: new Date('1/1/2015'),
                month: '1',
                year: '2015'
              },
              Has: 'Yes',
              Text: {
                value: 'Foo'
              }
            }
          ]
        }
      }
    }
  ]
}
