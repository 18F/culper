import React from 'react'
import { mount } from 'enzyme'
import Telephone from './Telephone'

describe('The Telephone component', () => {
  it('renders international fields', () => {
    const component = mount(<Telephone name="phone" type="International" />)
    expect(component.find('.domestic-number').length).toEqual(1)
    expect(component.find('input[name="int_first"]').length).toEqual(1)
  })

  it('populates domestic fields using number', () => {
    const component = mount(
      <Telephone name="phone" type="Domestic" number="7031234567" />
    )
    expect(component.find('input[name="domestic_first"]').length).toEqual(1)
    expect(
      component.find('input[name="domestic_first"]').props().value
    ).toEqual('703')
    expect(
      component.find('input[name="domestic_second"]').props().value
    ).toEqual('123')
    expect(
      component.find('input[name="domestic_third"]').props().value
    ).toEqual('4567')
  })

  it('bubbles up error event', () => {
    let hits = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      number: 'aaa-aaa-aaaaa',
      error: true,
      focus: false,
      valid: false,
      onError: (value, arr) => {
        hits += 1
        return arr
      },
    }
    const component = mount(
      <Telephone
        name={expected.name}
        number={expected.number}
        onError={expected.onError}
      />
    )
    component
      .find('input')
      .first()
      .simulate('blur')
    expect(hits > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleChange: () => {
        changes += 1
      },
    }
    const component = mount(
      <Telephone name={expected.name} onUpdate={expected.handleChange} />
    )
    component
      .find('input')
      .first()
      .simulate('change')
    expect(changes).toEqual(1)
  })

  it('allows deselecting phone number type', () => {
    let numberType = ''
    const expected = {
      name: 'telephone-component',
      numberType: 'Work',
      showNumberType: true,
      onUpdate: (values) => {
        numberType = values.numberType
      },
    }
    const component = mount(<Telephone {...expected} />)
    expect(numberType).toBe('')
    component.find('.phonetype-option.work input').simulate('click')
    expect(numberType).toBe('')
  })

  it('handles updates to domestic field values', () => {
    let updated = 0
    const expected = {
      name: 'telephone-component',
      type: 'Domestic',
      showNumberType: true,
      onUpdate: () => {
        updated += 1
      },
    }
    const component = mount(<Telephone {...expected} />)
    component.find('.international-number').simulate('click')
    component
      .find({ type: 'text', name: 'domestic_first' })
      .simulate('change', { target: { value: '111' } })
    component
      .find({ type: 'text', name: 'domestic_second' })
      .simulate('change', { target: { value: '222' } })
    component
      .find({ type: 'text', name: 'domestic_third' })
      .simulate('change', { target: { value: '3333' } })
    component
      .find({ type: 'text', name: 'domestic_extension' })
      .simulate('change', { target: { value: '4444' } })
    component.find('.nonumber input').simulate('change')
    component.find('.time.day input').simulate('change')
    component.find('.phonetype-option.work input').simulate('change')
    expect(updated).toBe(8)
  })

  it('handles updates to international field values', () => {
    let updated = 0
    const expected = {
      name: 'telephone-component',
      type: 'International',
      showNumberType: true,
      onUpdate: () => {
        updated += 1
      },
    }
    const component = mount(<Telephone {...expected} />)
    component
      .find({ type: 'text', name: 'int_first' })
      .simulate('change', { target: { value: '111' } })
    component
      .find({ type: 'text', name: 'int_extension' })
      .simulate('change', { target: { value: '4444' } })
    component.find('.nonumber input').simulate('change')
    component.find('.time.day input').simulate('change')
    component.find('.phonetype-option.work input').simulate('change')
    expect(updated).toBe(5)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'telephone',
      tab: () => {
        tabbed = true
      },
    }

    // Domestic
    const componentDomestic = mount(<Telephone {...expected} type="Domestic" />)
    tabbed = false
    componentDomestic
      .find({ type: 'text', name: 'domestic_first' })
      .simulate('keydown', { keyCode: 48, target: { value: '123' } })
    expect(tabbed).toBe(true)

    tabbed = false
    componentDomestic
      .find({ type: 'text', name: 'domestic_second' })
      .simulate('keydown', { keyCode: 48, target: { value: '123' } })
    expect(tabbed).toBe(true)

    tabbed = false
    componentDomestic
      .find({ type: 'text', name: 'domestic_third' })
      .simulate('keydown', { keyCode: 48, target: { value: '1234' } })
    expect(tabbed).toBe(true)

    // International
    const componentInternational = mount(
      <Telephone {...expected} type="International" />
    )
    tabbed = false
    componentInternational
      .find({ type: 'text', name: 'int_first' })
      .simulate('keydown', { keyCode: 48, target: { value: '12345678901234567890' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'telephone',
      tab: () => {
        tabbed = true
      },
    }

    // Domestic
    const componentDomestic = mount(<Telephone {...expected} type="Domestic" />)
    tabbed = false
    componentDomestic
      .find({ type: 'text', name: 'domestic_extension' })
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)

    tabbed = false
    componentDomestic
      .find({ type: 'text', name: 'domestic_third' })
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)

    tabbed = false
    componentDomestic
      .find({ type: 'text', name: 'domestic_second' })
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)

    // International
    const componentInternational = mount(
      <Telephone {...expected} type="International" />
    )
    tabbed = false
    componentInternational
      .find({ type: 'text', name: 'int_extension' })
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })

  it('can hide number type', () => {
    const props = {
      showNumberType: false
    }
    const component = mount(<Telephone {...props} />)
    expect(component.find('.phonetype').length).toBe(0)
  })

  it('can hide time of day', () => {
    const props = {
      showTimeOfDay: false,
    }
    const component = mount(<Telephone {...props} />)
    expect(component.find('.time.day input').length).toBe(0)
  })

  it('can disable not applicable on on telephone', () => {
    const props = {
      allowNotApplicable: false,
    }
    const component = mount(<Telephone {...props} />)
    expect(component.find('.nonumber').length).toBe(0)
  })

  it('can validate telephone required fields', () => {
    const tests = [
      {
        telephone: {
          numberType: 'Home',
          type: 'Domestic',
          domestic: {
            first: '111',
            second: '111',
            third: '1111',
          },
          required: true,
        },
        expected: true,
      },
      {
        telephone: {
          numberType: 'Home',
          type: 'International',
          international: {
            first: '111',
            second: '1111',
            third: '1111',
          },
          required: true,
        },
        expected: true,
      },
      {
        telephone: {
          numberType: '',
          domestic: {
            first: '111',
            second: '111',
            third: '1111',
          },
          required: true,
        },
        expected: false,
      },
      {
        telephone: {
          showNumberType: true,
          numberType: '',
          required: true,
        },
        expected: false,
      },
      {
        telephone: {
          numberType: 'Home',
          noNumber: 'NA',
          required: true,
          showNumberType: true,
          allowNotApplicable: true,
        },
        expected: true,
      },
    ]
    const errorHandler = Telephone.errors.find(e => e.code === 'required').func
    tests.forEach((test) => {
      expect(errorHandler(null, test.telephone)).toBe(test.expected)
    })
  })
})
