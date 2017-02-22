import React from 'react'
import { mount } from 'enzyme'
import { ResidenceSummary, EmploymentSummary, EducationSummary, InjectGaps } from './summaries'

describe('The summary components', () => {
  it('can display residence summary', () => {
    const expected = {
      residence: {
        Item: {
          Address: {
            addressType: 'United States',
            address: '742 Evergreen Terrace',
            city: 'Springfield',
            state: 'Nevada',
            zip: '123456'
          },
          Dates: {
            from: new Date(1989, 12, 17),
            to: new Date()
          }
        }
      }
    }
    const component = mount(<ResidenceSummary {...expected} />)
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.table-cell').length).toEqual(3)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display employment summary', () => {
    const expected = {
      employment: {
        Item: {
          Employment: {
            value: 'Springfield Nuclear Power Plant'
          },
          Dates: {
            from: new Date(1989, 12, 17),
            to: new Date()
          }
        }
      }
    }
    const component = mount(<EmploymentSummary {...expected} />)
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.table-cell').length).toEqual(3)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display education summary', () => {
    const expected = {
      education: {
        Item: {
          Name: {
            value: 'Springfield Elementary School'
          },
          Dates: {
            from: new Date(1989, 12, 17),
            to: new Date()
          }
        }
      }
    }
    const component = mount(<EducationSummary {...expected} />)
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.table-cell').length).toEqual(3)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can inject gaps', () => {
    const start = new Date(1989, 12, 17)
    const types = ['Residence', 'Employment']
    const list = [
      {
        type: 'Residence',
        Item: {
          Dates: {
            from: new Date(new Date().getFullYear() - 5, 12, 17),
            to: new Date()
          }
        }
      },
      {
        type: 'Employment',
        Item: {
          Dates: {
            from: new Date(new Date().getFullYear() - 5, 12, 17),
            to: new Date()
          }
        }
      },
      {
        type: 'Education',
        Item: {
          Dates: {
            from: new Date(new Date().getFullYear() - 5, 12, 17),
            to: new Date()
          }
        }
      },
      {
        type: 'Gap',
        Item: {
          Dates: {
            from: new Date(new Date().getFullYear() - 10, 12, 17),
            to: new Date(new Date().getFullYear() - 5, 12, 17)
          }
        }
      }
    ]
    const assigned = InjectGaps(list, types, start)
    expect(assigned.filter(item => item.type === 'Residence').length).toEqual(1)
    expect(assigned.filter(item => item.type === 'Employment').length).toEqual(1)
    expect(assigned.filter(item => item.type === 'Education').length).toEqual(1)
    expect(assigned.filter(item => item.type === 'Gap').length).toEqual(2)
  })
})
