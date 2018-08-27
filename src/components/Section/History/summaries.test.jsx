import React from 'react'
import { mount } from 'enzyme'
import {
  ResidenceCustomSummary,
  EmploymentCustomSummary,
  EducationCustomSummary,
  InjectGaps
} from './summaries'
import Location from '../../Form/Location'
import { today } from './dateranges'

describe('The summary components', () => {
  it('can display residence summary', () => {
    const expected = {
      item: {
        Item: {
          Address: {
            country: 'United States',
            street: '742 Evergreen Terrace',
            city: 'Springfield',
            state: 'Nevada',
            zip: '123456',
            layout: Location.ADDRESS
          },
          Dates: {
            from: {
              date: new Date(1989, 12, 17),
              month: '12',
              day: '17',
              year: '1989'
            },
            to: {
              date: new Date(2000, 1, 1),
              month: '1',
              day: '1',
              year: '2000',
              present: false
            }
          }
        }
      },
      index: 0,
      initial: false,
      callback: () => {},
      toggle: () => {},
      openText: () => {},
      remove: () => {},
      byline: () => {}
    }

    const component = mount(
      ResidenceCustomSummary(
        expected.item,
        expected.index,
        expected.initial,
        expected.callback,
        expected.toggle,
        expected.openText,
        expected.remove,
        expected.byline
      )
    )
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.context').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display employment summary', () => {
    const expected = {
      item: {
        Item: {
          Employment: {
            value: 'Springfield Nuclear Power Plant'
          },
          Dates: {
            from: {
              date: new Date(1989, 12, 17),
              month: '12',
              day: '17',
              year: '1989'
            },
            to: {
              date: new Date(2000, 1, 1),
              month: '1',
              day: '1',
              year: '2000',
              present: false
            }
          }
        }
      },
      index: 0,
      initial: false,
      callback: () => {},
      toggle: () => {},
      openText: () => {},
      remove: () => {},
      byline: () => {}
    }

    const component = mount(
      EmploymentCustomSummary(
        expected.item,
        expected.index,
        expected.initial,
        expected.callback,
        expected.toggle,
        expected.openText,
        expected.remove,
        expected.byline
      )
    )
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.context').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display education summary', () => {
    const expected = {
      item: {
        Item: {
          Name: {
            value: 'Springfield Elementary School'
          },
          Dates: {
            from: {
              date: new Date(1989, 12, 17),
              month: '12',
              day: '17',
              year: '1989'
            },
            to: {
              date: new Date(2000, 1, 1),
              month: '1',
              day: '1',
              year: '2000',
              present: false
            }
          }
        }
      },
      index: 0,
      initial: false,
      callback: () => {},
      toggle: () => {},
      openText: () => {},
      remove: () => {},
      byline: () => {}
    }

    const component = mount(
      EducationCustomSummary(
        expected.item,
        expected.index,
        expected.initial,
        expected.callback,
        expected.toggle,
        expected.openText,
        expected.remove,
        expected.byline
      )
    )
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.context').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can inject gaps', () => {
    const expand = date => {
      return {
        day: `${date.getDate()}`,
        month: `${date.getMonth() + 1}`,
        year: `${date.getFullYear()}`,
        date: date
      }
    }

    const item = (type, from, to) => {
      return {
        type: type,
        Item: {
          Dates: {
            from: expand(from),
            to: expand(to)
          }
        }
      }
    }

    const list = [
      item('Residence', new Date(today.getFullYear() - 5, 12, 17), today),
      item(
        'Residence',
        new Date(today.getFullYear() - 11, 12, 17),
        new Date(today.getFullYear() - 9, 12, 17)
      ),
      item('Employment', new Date(today.getFullYear() - 5, 12, 17), today),
      item(
        'Gap',
        new Date(today.getFullYear() - 10, 12, 17),
        new Date(today.getFullYear() - 5, 12, 17)
      )
    ]

    const residence = InjectGaps(
      list.filter(x => x.type === 'Residence' || x.type === 'Gap')
    )
    const employment = InjectGaps(
      list.filter(x => x.type === 'Employment' || x.type === 'Gap')
    )

    expect(residence.filter(item => item.type === 'Residence').length).toEqual(
      2
    )
<<<<<<< HEAD
    expect(residence.filter(item => item.type === 'Gap').length).toEqual(1)
=======
    expect(residence.filter(item => item.type === 'Gap').length).toEqual(0)
>>>>>>> Run prettier on src
    expect(
      employment.filter(item => item.type === 'Employment').length
    ).toEqual(1)
    expect(employment.filter(item => item.type === 'Gap').length).toEqual(1)
  })
})
