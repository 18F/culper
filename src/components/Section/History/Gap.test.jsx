import React from 'react'
import { mount } from 'enzyme'
import { Gap } from './Gap'

describe('The gap component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'gap'
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('button').length).toEqual(0)
  })

  it('display table caption/title if first row', () => {
    const expected = {
      name: 'gap',
      first: true,
      dates: {
        from: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        },
        to: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        }
      }
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('button').length).toEqual(1)
  })

  it('do not display table caption/title if not the first row', () => {
    const expected = {
      name: 'gap',
      first: false,
      dates: {
        from: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        },
        to: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        }
      }
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('button').length).toEqual(1)
  })

  it('display the dates appropriately', () => {
    const expected = {
      name: 'gap',
      first: false,
      dates: {
        from: {
          year: '2014',
          month: '6',
          day: '21'
        },
        to: {
          year: '2015',
          month: '6',
          day: '21'
        }
      }
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('button').length).toEqual(1)
    expect(component.find('.dates').text()).toEqual(
      `${expected.dates.from.month}/${expected.dates.from.year} - ${
        expected.dates.to.month
      }/${expected.dates.to.year}`
    )
  })

  it('displays employment verbiage', () => {
    const expected = {
      name: 'gap',
      title: 'Employment gap',
      btnText: 'Add an employer',
      para:
        'There is a gap in your employment. The entire 10 year period must be covered with no gaps.',
      first: false,
      dates: {
        from: {
          year: '2014',
          month: '6',
          day: '21'
        },
        to: {
          year: '2015',
          month: '6',
          day: '21'
        }
      }
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('h5').text()).toContain('Employment gap - ')
    expect(component.find('button').text()).toEqual('Add an employer')
    expect(component.find('p').text()).toEqual(
      'There is a gap in your employment. The entire 10 year period must be covered with no gaps.'
    )
  })

  it('displays residence verbiage', () => {
    const expected = {
      name: 'gap',
      title: 'Residence gap',
      btnText: 'Add an address',
      para:
        'There is a gap in your residence history. The entire 10 year period must be covered with no gaps',
      first: false,
      dates: {
        from: {
          year: '2014',
          month: '6',
          day: '21'
        },
        to: {
          year: '2015',
          month: '6',
          day: '21'
        }
      }
    }
    const component = mount(<Gap {...expected} />)
    expect(component.find('h5').text()).toContain('Residence gap - ')
    expect(component.find('button').text()).toEqual('Add an address')
    expect(component.find('p').text()).toEqual(
      'There is a gap in your residence history. The entire 10 year period must be covered with no gaps'
    )
  })
})
