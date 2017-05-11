import React from 'react'
import { mount } from 'enzyme'
import OtherOffenses from './OtherOffenses'

describe('The offense component', () => {
  it('no error on empty', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      onUpdate: () => { updates++ }
    }
    const component = mount(<OtherOffenses {...expected} />)
    component.find('.otherconviction .yes input').simulate('change')
    component.find('.otherfelony .no input').simulate('change')
    component.find('.otherdomestic .no input').simulate('change')
    component.find('.otherfirearms .no input').simulate('change')
    component.find('.otheralcohol .no input').simulate('change')
    expect(updates).toBe(6)
  })

  it('no error on empty', () => {
    const expected = {
      name: 'offense',
      HasOtherConviction: 'Yes'
    }
    const component = mount(<OtherOffenses {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('clears', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      HasOtherConviction: 'Yes',
      HasOtherFelony: 'No',
      HasOtherDomestic: 'No',
      HasOtherFirearms: 'No',
      HasOtherAlcohol: 'No',
      onUpdate: () => { updates++ }
    }
    const component = mount(<OtherOffenses {...expected} />)
    component.find('.otherconviction .no input').simulate('change')
    expect(updates).toBe(3)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('populates all fields', () => {
    const expected = {
      name: 'offense',
      HasOtherConviction: 'Yes',
      HasOtherFelony: 'No',
      HasOtherDomestic: 'No',
      HasOtherFirearms: 'No',
      HasOtherAlcohol: 'No',
      List: [
        {
          Item: {
            Date: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            Description: {
              value: 'Some description'
            },
            InvolvedViolence: 'No',
            InvolvedFirearms: 'Yes',
            InvolvedSubstances: 'No',
            CourtType: 'Felony',
            CourtAddress: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            CourtDate: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            CourtName: {
              value: 'court name'
            },
            CourtCharge: {
              value: 'Some charge'
            },
            CourtOutcome: {
              value: 'Some outcome'
            },
            WasSentenced: 'Yes',
            Sentence: {
              AwaitingTrial: 'Yes',
              AwaitingTrialExplanation: 'Yes',
              ExceedsYear: 'Yes',
              Incarcerated: 'Yes',
              IncarcerationDates: {
                from: {
                  date: new Date('1/1/2000')
                },
                to: {
                  date: new Date('1/1/2004')
                },
                present: false
              },
              ProbationDates: {
                from: {
                  date: new Date('1/1/2000')
                },
                to: {
                  date: new Date('1/1/2004')
                },
                present: false
              },
              Description: {
                value: 'Foo'
              }
            }
          }
        }
      ]
    }
    const component = mount(<OtherOffenses {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })
})
