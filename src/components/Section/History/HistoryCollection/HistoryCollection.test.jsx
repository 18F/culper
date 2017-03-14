import React from 'react'
import { mount } from 'enzyme'
import HistoryCollection from './HistoryCollection'

describe('The history collection component', () => {
  const history = {
    Residence: {
      List: [
        {
          type: 'Residence',
          Item: {
            Address: {
              addressType: 'United States',
              address: '742 Evergreen Terrace',
              city: 'Springfield',
              state: 'Nevada',
              zip: '123456'
            },
            Dates: {
              from: new Date(new Date().getFullYear() - 5, 12, 17),
              to: new Date()
            }
          }
        }
      ]
    },
    Employment: {
      List: [
        {
          type: 'Employment',
          Item: {
            Employment: {
              value: 'Springfield Nuclear Power Plant'
            },
            Dates: {
              from: new Date(new Date().getFullYear() - 5, 12, 17),
              to: new Date()
            }
          }
        }
      ]
    },
    Education: {
      List: [
        {
          type: 'Education',
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
      ]
    }
  }

  it('no error on empty', () => {
    const expected = {
      name: 'history_collection',
      types: ['Residence', 'Employment', 'Education'],
      addOnLoad: 'Residence',
      showGaps: false,
      total: 10,
      history: {}
    }
    const component = mount(<HistoryCollection {...expected} />)
    expect(component.find('.history-collection').length).toEqual(1)
  })

  it('can display a mixed bag of types', () => {
    const expected = {
      name: 'history_collection',
      types: ['Residence', 'Employment', 'Education'],
      addOnLoad: 'Residence',
      showGaps: false,
      total: 10,
      history: history
    }
    const component = mount(<HistoryCollection {...expected} />)
    expect(component.find('.history-collection').length).toEqual(1)
    expect(component.find('.item').length).toEqual(3)
  })

  it('can restrict the types allowed to be displayed', () => {
    const expected = {
      name: 'history_collection',
      types: ['Residence'],
      addOnLoad: 'Residence',
      showGaps: false,
      total: 10,
      history: history
    }
    const component = mount(<HistoryCollection {...expected} />)
    expect(component.find('.history-collection').length).toEqual(1)
    expect(component.find('.item').length).toEqual(1)
  })

  it('can display gaps when allowed', () => {
    const expected = {
      name: 'history_collection',
      types: ['Residence', 'Employment', 'Education'],
      addOnLoad: 'Residence',
      showGaps: true,
      total: 10,
      history: history
    }
    const component = mount(<HistoryCollection {...expected} />)
    expect(component.find('.history-collection').length).toEqual(1)
    expect(component.find('.item').length).toEqual(5)
  })
})
