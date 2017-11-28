import React from 'react'
import { mount } from 'enzyme'
import DateControl, { datePart } from './DateControl'

describe('The date component', () => {
  const children = 4

  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'DateControl input error',
      disabled: false,
      error: true,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.flags .estimated').length).toBe(1)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'DateControl input focused',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    component.find('.day input').simulate('focus')
    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.day input').hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'DateControl input success',
      value: '1-28-2016'
    }
    const component = mount(<DateControl {...expected} />)

    // For validation
    component.find('.day input').simulate('focus')
    component.find('.day input').simulate('blur')

    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.day input').nodes[0].value).toEqual('28')
    expect(component.find('.day input').hasClass('usa-input-success')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with valid date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '01-28-2016',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.month input').nodes[0].value).toEqual('1')
    expect(component.find('.day input').nodes[0].value).toEqual('28')
    expect(component.find('.year input').nodes[0].value).toEqual('2016')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with invalid date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '1-42-2016',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.month input').nodes[0].value).toEqual('')
    expect(component.find('.day input').nodes[0].value).toEqual('')
    expect(component.find('.year input').nodes[0].value).toEqual('')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with date exceeding max', () => {
    let errors = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '1-1-2016',
      maxDate: new Date('1/1/2000'),
      error: false,
      focus: false,
      valid: false,
      onError: (value, arr) => {
        errors = (arr || []).filter(err => err !== 'datecontrol.max').length
        return arr
      }
    }
    const component = mount(<DateControl {...expected} />)
    component.find('.year input').simulate('change')
    component.find('.year input').simulate('blur')
    expect(errors).toBeGreaterThan(2)
  })

  it('performs updates to each field', () => {
    let updates = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '',
      focus: false,
      onValidate: (event, status, error) => {},
      receiveProps: true,
      onUpdate: () => { updates++ }
    }
    const component = mount(<DateControl {...expected} />)
    component.find('.month input').simulate('change', { target: { value: '1' } })
    component.find('.day input').simulate('change', { target: { value: '10' } })
    component.find('.year input').simulate('change', { target: { value: '1999' } })
    expect(updates).toBe(3)
  })

  it('renders with date exceeding max and then corrects', () => {
    let errors = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '1-1-2016',
      maxDate: new Date('1/1/2000'),
      error: false,
      focus: false,
      valid: false,
      receiveProps: true,
      onError: (value, arr) => {
        errors = (arr || []).filter(err => err !== 'datecontrol.max').length
        return arr
      }
    }
    const component = mount(<DateControl {...expected} />)
    component.find('.year input').simulate('change')
    component.find('.year input').simulate('blur')
    expect(errors).toBeGreaterThan(2)
    component.setProps({value: '1-1-2009'})
    expect(errors).toBeGreaterThan(2)
  })

  it('renders with undefined date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.month input').nodes[0].value).toEqual('')
    expect(component.find('.day input').nodes[0].value).toEqual('')
    expect(component.find('.year input').nodes[0].value).toEqual('')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with date as random input', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: 'the quick brown fox...',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.month input').nodes[0].value).toEqual('')
    expect(component.find('.day input').nodes[0].value).toEqual('')
    expect(component.find('.year input').nodes[0].value).toEqual('')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('updates with estimated', () => {
    let updates = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '1-1-2010',
      receiveProps: true,
      error: false,
      focus: false,
      valid: false,
      onUpdate: () => { updates++ }
    }
    const component = mount(<DateControl {...expected} />)
    component.find('input[type="checkbox"]').simulate('change')
    expect(updates).toBe(1)
  })

  it('parses date part', () => {
    const tests = [
      {
        part: 'm',
        date: '1/1/2010',
        expected: '1'
      },
      {
        part: 'mm',
        date: '1/1/2010',
        expected: '1'
      },
      {
        part: 'month',
        date: '1/1/2010',
        expected: '1'
      },
      {
        part: 'd',
        date: '1/1/2010',
        expected: 1
      },
      {
        part: 'dd',
        date: '1/1/2010',
        expected: 1
      },
      {
        part: 'day',
        date: '1/1/2010',
        expected: 1
      },
      {
        part: 'y',
        date: '1/1/2010',
        expected: 2010
      },
      {
        part: 'yy',
        date: '1/1/2010',
        expected: 2010
      },
      {
        part: 'year',
        date: '1/1/2010',
        expected: 2010
      },
      {
        part: 'd',
        date: null,
        expected: ''
      },
      {
        part: 'foo',
        date: '1/1/2010',
        expected: ''
      }
    ]

    tests.forEach(test => {
      expect(datePart(test.part, test.date)).toEqual(test.expected)
    })
  })

  it('does not loops when invalid date', () => {
    const component = mount(<DateControl />)
    expect(component.find('.datecontrol').length).toBe(1)
    component.find('.month input').simulate('change', { target: { name: 'month', value: '13' } })
    component.find('.month input').simulate('change', { target: { name: 'month', value: 'g' } })
  })

  it('can hide estimated option', () => {
    const component = mount(<DateControl showEstimated={false} />)
    expect(component.find('.datecontrol').length).toBe(1)
    expect(component.find('.flags .estimated').length).toBe(0)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      tab: () => { tabbed = true }
    }

    // Month
    let component = mount(<DateControl {...expected} />)
    component.find('.month input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component.find('.month input').simulate('keydown', { keyCode: 48, target: { value: '12' } })
    expect(tabbed).toBe(true)

    // Day
    tabbed = false
    component = mount(<DateControl {...expected} />)
    component.find('.day input').simulate('keydown', { keyCode: 48, target: { value: '12' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      tab: () => { tabbed = true }
    }

    // Year
    let component = mount(<DateControl {...expected} />)
    component.find('.year input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component.find('.year input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)

    // Day
    tabbed = false
    component = mount(<DateControl {...expected} />)
    component.find('.day input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component.find('.day input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })

  it('populates empty day on estimate click', () => {
    let toggled = false
    const props = {
      month: '1',
      day: '',
      year: '2000',
      showEstimated: true,
      toggleFocus: (w, changed, el, day, month) => {
        toggled = true
      }
    }

    let component = mount(<DateControl {...props} />)
    component.find('.estimated input').simulate('change', { target: { checked: true } })
    expect(toggled).toBe(true)
  })
})
