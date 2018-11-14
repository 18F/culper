import React from 'react'
import { mount } from 'enzyme'
import { today, daysAgo } from '../dateranges'
import EmploymentItem from './EmploymentItem'
import ReasonLeft from './ReasonLeft'
import Reprimand from './Reprimand'

const alternateAddressRenderMock = jest.fn();
const buildProps = other => ({ render: alternateAddressRenderMock, ...other})

describe('The employment component', () => {
  it('no error on empty', () => {
    const expected = buildProps({
      name: 'employment'
    })
    const component = mount(<EmploymentItem {...expected} />)
    expect(component.find('.h3').length).toBeGreaterThan(0)
  })

  it('can populate values for Military, NationalGuard and USPHS', () => {
    let updates = 0
    const expected = buildProps({
      name: 'employment',
      EmploymentActivity: { value: 'ActiveMilitary' },
      onUpdate: () => {
        updates++
      }
    })
    const selectors = [
      '.employment-title',
      '.employment-duty-station',
      '.employment-status',
      '.daterange',
      '.address',
      '.telephone',
      '.supervisor'
    ]

    const component = mount(<EmploymentItem {...expected} />)
    selectors.forEach(selector => {
      var len = component.find(selector).length
      expect(len).toBeGreaterThan(0)
    })

    component
      .find({ type: 'radio', value: 'ActiveMilitary' })
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('display displinary when within 7 years', () => {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: true,
        from: {
          month: `${sevenYearsAgo.getMonth() + 1}`,
          day: `${sevenYearsAgo.getDate()}`,
          year: `${sevenYearsAgo.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reprimand-branch').length).toBe(1)
  })

  it('does not display disciplinary if not within 7 years', () => {
    const past = daysAgo(today, 365 * 8)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reprimand-branch').length).toBe(0)
  })

  it('display reason left options when within 7 years', () => {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${sevenYearsAgo.getMonth() + 1}`,
          day: `${sevenYearsAgo.getDate()}`,
          year: `${sevenYearsAgo.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reason-options').length).toBe(1)
  })

  it('does not display reason left options if not within 7 years', () => {
    const past = daysAgo(today, 365 * 8)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reason-options').length).toBe(0)
  })

  it('does not display reason left options if currently employed', () => {
    const past = daysAgo(today, 365 * 10)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: true,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reason-options').length).toBe(0)
  })

  it('does not display reason for leaving if currently employed', () => {
    const past = daysAgo(today, 365 * 3)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: true,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reason-description').length).toBe(0)
  })

  describe('when unemployment is selected', () => {
    let component

    beforeEach(() => {
      const past = daysAgo(today, 365 * 3)
      const props = buildProps({
        EmploymentActivity: { value: 'Unemployment' },
        Dates: {
          present: true,
          from: {
            month: `${past.getMonth() + 1}`,
            day: `${past.getDate()}`,
            year: `${past.getFullYear()}`
          },
          to: {}
        }
      })
      component = mount(<EmploymentItem {...props} />)
    })

    it('it does not display reason for leaving', () => {
      expect(component.contains(<ReasonLeft />)).toBe(false)
    })

    it('it does not display reprimand', () => {
      expect(component.contains(<Reprimand />)).toBe(false)
    })
  })

  it('it does display reason for leaving', () => {
    const past = daysAgo(today, 365 * 3)
    const props = buildProps({
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    })
    const component = mount(<EmploymentItem {...props} />)
    expect(component.find('.reason-description').length).toBe(1)
  })

  it('handles defaults', () => {
    expect(EmploymentItem.defaultProps.dispatch()).toEqual(undefined)
    expect(EmploymentItem.defaultProps.onUpdate()).toEqual(undefined)
    expect(EmploymentItem.defaultProps.onError(null, [])).toEqual([])
  })
})
