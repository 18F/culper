import React from 'react'
import { mount } from 'enzyme'
import NonCriminalCourtActions from './NonCriminalCourtActions'
import { Location } from '../../Form'

describe('The NonCriminalCourtActions component', () => {
  it('Renders without errors', () => {
    const component = mount(<NonCriminalCourtActions />)
    expect(component.find('.non-criminal-court-actions').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<NonCriminalCourtActions onUpdate={onUpdate} />)
    expect(component.find('.non-criminal-court-actions').length).toBe(1)
    component.find('.has-court-actions .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      HasCourtActions: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              CivilActionDate: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              CourtName: {
                value: 'The name'
              },
              CourtAddress: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS
              },
              NatureOfAction: {
                value: 'Nature of action'
              },
              ResultsOfAction: {
                value: 'Results of action'
              },
              PrincipalPartyNames: {
                value: 'John Doe'
              }
            }
          }
        ]
      }
    }
    const component = mount(<NonCriminalCourtActions {...expected} />)
    component.find('.court-name input').simulate('change')
    expect(updates).toBe(2)
  })
})
