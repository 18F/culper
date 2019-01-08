import React from 'react'
import { mount } from 'enzyme'
import { DateControl } from './DateControl'

describe('The date component', () => {
  const children = 4

  it('incomplete dates do not count as touched', () => {
    const tests = [
      {
        name: 'input-error',
        label: 'DateControl input error',
        disabled: false,
        error: true,
        focus: false,
        valid: false,
        month: '1',
        day: '24',
        year: ''
      },
      {
        name: 'input-error',
        label: 'DateControl input error',
        disabled: false,
        error: true,
        focus: false,
        valid: false,
        month: '1',
        day: '',
        year: '2001'
      },
      {
        name: 'input-error',
        label: 'DateControl input error',
        disabled: false,
        error: true,
        focus: false,
        valid: false,
        month: '',
        day: '2',
        year: '2002'
      }
    ]

    tests.forEach(expected => {
      const component = mount(<DateControl {...expected} />)
      component.first('input').simulate('change')
      expect(component.state('touched')).toBe(false)
    })
  })

  it('updates touched when dates are set', () => {
    const expected = {
      name: 'input-error',
      label: 'DateControl input error',
      disabled: false,
      error: true,
      focus: false,
      valid: false,
      month: '1',
      day: '24',
      year: '2000'
    }
    const component = mount(<DateControl {...expected} />)
    component.find('.year input').simulate('change')
    expect(component.state('touched')).toBe(true)
  })

  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'DateControl input error',
      disabled: false,
      error: true,
      focus: false,
      valid: false,
      month: '1',
      day: '42',
      year: '2000'
    }
    const component = mount(<DateControl {...expected} />)
    component.find('.day input').simulate('change')
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.flags .estimated').length).toBe(1)
    expect(component.find('.usa-input-error').length).toBe(1)
  })

  it('can override overall error', () => {
    const expected = {
      name: 'input-error',
      label: 'DateControl input error',
      disabled: false,
      error: true,
      focus: false,
      valid: false,
      overrideError: true
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('.datecontrol.usa-input-error').length).toBe(0)
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
    expect(component.find('.day input').hasClass('usa-input-focus')).toEqual(
      true
    )
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'DateControl input success',
      month: '1',
      day: '28',
      year: '2016'
    }
    const component = mount(<DateControl {...expected} />)

    expect(component.find('label').length).toEqual(children)
    expect(component.find('.day input').length).toEqual(1)
    expect(component.find('.day input').nodes[0].value).toEqual('28')
    expect(component.find('.day input').hasClass('usa-input-success')).toEqual(
      true
    )
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
      month: '1',
      day: '28',
      year: '2016',
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

  it('renders with date exceeding max', () => {
    let errors = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      month: '1',
      day: '1',
      year: '2016',
      maxDate: {
        month: '1',
        day: '1',
        year: '2000'
      },
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
      focus: false,
      onValidate: (event, status, error) => {},
      receiveProps: true,
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<DateControl {...expected} />)
    component
      .find('.month input')
      .simulate('change', { target: { value: '1' } })
    component.find('.day input').simulate('change', { target: { value: '10' } })
    component
      .find('.year input')
      .simulate('change', { target: { value: '1999' } })
    expect(updates).toBe(3)
  })

  it('renders with date exceeding max and then corrects', () => {
    let errors = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      month: '1',
      day: '1',
      year: '2016',
      maxDate: {
        month: '1',
        day: '1',
        year: '2000'
      },
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
    component.setProps({ month: '1', day: '1', year: '2009' })
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

  it('updates with estimated', () => {
    let updates = 0
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      month: '1',
      day: '1',
      year: '2010',
      receiveProps: true,
      error: false,
      focus: false,
      valid: false,
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<DateControl {...expected} />)
    component.find('input[type="checkbox"]').simulate('change')
    expect(updates).toBe(1)
  })

  it('does not loops when invalid date', () => {
    const component = mount(<DateControl />)
    expect(component.find('.datecontrol').length).toBe(1)
    component
      .find('.month input')
      .simulate('change', { target: { name: 'month', value: '13' } })
    component
      .find('.month input')
      .simulate('change', { target: { name: 'month', value: 'g' } })
  })

  it('can hide estimated option', () => {
    const component = mount(<DateControl showEstimated={false} />)
    expect(component.find('.datecontrol').length).toBe(1)
    expect(component.find('.flags .estimated').length).toBe(0)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      tab: () => {
        tabbed = true
      }
    }

    // Month
    let component = mount(<DateControl {...expected} />)
    component
      .find('.month input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component
      .find('.month input')
      .simulate('keydown', { keyCode: 48, target: { value: '12' } })
    expect(tabbed).toBe(true)

    // Day
    tabbed = false
    component = mount(<DateControl {...expected} />)
    component
      .find('.day input')
      .simulate('keydown', { keyCode: 48, target: { value: '12' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      tab: () => {
        tabbed = true
      }
    }

    // Year
    let component = mount(<DateControl {...expected} />)
    component
      .find('.year input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component
      .find('.year input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)

    // Day
    tabbed = false
    component = mount(<DateControl {...expected} />)
    component
      .find('.day input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component
      .find('.day input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
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
    component
      .find('.estimated input')
      .simulate('change', { target: { checked: true } })
    expect(toggled).toBe(true)
  })
})
