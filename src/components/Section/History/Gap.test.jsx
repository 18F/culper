import React from 'react'
import { mount } from 'enzyme'
import { Gap } from './Gap'

describe('The gap component', () => {
  it('renders without errors', () => {
    const component = mount(<Gap />)
    expect(component.exists()).toBe(true)
  })

  it('displays the dates appropriately', () => {
    const expected = {
      gaps: [{
        from: {
          year: '2014',
          month: '6',
          day: '21',
        },
        to: {
          year: '2015',
          month: '6',
          day: '21',
        },
      }],
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('ul').text()).toContain(
      `${expected.gaps[0].from.month}/${expected.gaps[0].from.year} - ${
        expected.gaps[0].to.month
      }/${expected.gaps[0].to.year}`
    )
  })

  it('displays employment verbiage', () => {
    const expected = {
      title: 'Employment gap',
      para:
        'There is a gap in your employment. The entire 10 year period must be covered with no gaps.',
      gaps: [{
        from: {
          year: '2014',
          month: '6',
          day: '21',
        },
        to: {
          year: '2015',
          month: '6',
          day: '21',
        },
      }],
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('h5').text()).toContain('Employment gap')
    expect(component.find('p').text()).toEqual(
      'There is a gap in your employment. The entire 10 year period must be covered with no gaps.'
    )
  })

  it('displays residence verbiage', () => {
    const expected = {
      title: 'Residence gap',
      para:
        'There is a gap in your residence history. The entire 10 year period must be covered with no gaps',
      gaps: [{
        from: {
          year: '2014',
          month: '6',
          day: '21',
        },
        to: {
          year: '2015',
          month: '6',
          day: '21',
        },
      }],
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('h5').text()).toContain('Residence gap')
    expect(component.find('p').text()).toEqual(
      'There is a gap in your residence history. The entire 10 year period must be covered with no gaps'
    )
  })
})
