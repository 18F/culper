import React from 'react'
import { mount } from 'enzyme'
import Spinner from './Spinner'

describe('The spinner component', () => {
  it('can be hidden', () => {
    const props = {
      show: false
    }
    const component = mount(<Spinner {...props} />)
    expect(component.find('.spinner').length).toBe(0)
  })

  it('can be visible', () => {
    const props = {
      show: true
    }
    const component = mount(<Spinner {...props} />)
    expect(component.find('.spinner').length).toBe(1)
  })

  it('defaults to spinning action', () => {
    const props = {
      show: true
    }
    const component = mount(<Spinner {...props} />)
    expect(component.find('.spinner-icon.spin').length).toBe(1)
    expect(component.find('i.hidden').length).toBe(1)
  })

  it('can experiece shrinkage', () => {
    const props = {
      show: true,
      action: 'shrink'
    }
    const component = mount(<Spinner {...props} />)
    expect(component.find('.spinner-icon.shrink').length).toBe(1)
    expect(component.find('i.hidden').length).toBe(1)
  })

  it('can experiece growth', () => {
    const props = {
      show: true,
      action: 'grow'
    }
    const component = mount(<Spinner {...props} />)
    expect(component.find('.spinner-icon.hidden').length).toBe(1)
    expect(component.find('i.grow').length).toBe(1)
  })
})
