import React from 'react'
import { mount } from 'enzyme'
import { ResidenceSummary, EmploymentSummary, EducationSummary, InjectGaps } from './summaries'

describe('The summary components', () => {
  it('can display residence summary', () => {
    const expected = {
      Item: {
        Address: {
          addressType: 'United States',
          address: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'Nevada',
          zip: '123456'
        },
        Dates: {
          from: {
            date: new Date(1989, 12, 17)
          },
          to: {
            date: new Date()
          }
        }
      }
    }
    const component = mount(<ResidenceSummary {...expected} />)
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.employer').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display employment summary', () => {
    const expected = {
      Item: {
        Employment: {
          value: 'Springfield Nuclear Power Plant'
        },
        Dates: {
          from: {
            date: new Date(1989, 12, 17)
          },
          to: {
            date: new Date()
          }
        }
      }
    }
    const component = mount(<EmploymentSummary {...expected} />)
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.employer').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display education summary', () => {
    const expected = {
      Item: {
        Name: {
          value: 'Springfield Elementary School'
        },
        Dates: {
          from: {
            date: new Date(1989, 12, 17)
          },
          to: {
            date: new Date()
          }
        }
      }
    }
    const component = mount(<EducationSummary {...expected} />)
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.employer').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can inject gaps', () => {
    const start = new Date(1989, 12, 17)
    const list = [
      {
        type: 'Residence',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 5, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      {
        type: 'Employment',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 5, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      {
        type: 'Gap',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 10, 12, 17)
            },
            to: {
              date: new Date(new Date().getFullYear() - 5, 12, 17)
            }
          }
        }
      }
    ]
    const residence = InjectGaps(list.filter(x => x.type === 'Residence' || x.type === 'Gap'))
    const employment = InjectGaps(list.filter(x => x.type === 'Employment' || x.type === 'Gap'))
    expect(residence.filter(item => item.type === 'Residence').length).toEqual(1)
    expect(residence.filter(item => item.type === 'Gap').length).toEqual(1)
    expect(employment.filter(item => item.type === 'Employment').length).toEqual(1)
    expect(employment.filter(item => item.type === 'Gap').length).toEqual(1)
  })
})
