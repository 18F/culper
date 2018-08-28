import React from 'react'
import { mount } from 'enzyme'
import Modal from './Modal'

describe('The modal component', () => {
  it('can be hidden', () => {
    const props = {
      show: false
    }
    const component = mount(<Modal {...props} />)
    expect(component.find('.modal').length).toBe(0)
  })

  it('can be visible', () => {
    const props = {
      show: true
    }
    const component = mount(<Modal {...props} />)
    expect(component.find('.modal').length).toBe(1)
  })

  it('can show close icon', () => {
    const props = {
      show: true,
      closeable: true
    }
    const component = mount(<Modal {...props} />)
    expect(component.find('.modal-close').length).toBe(1)
  })

  it('can dismiss on background', () => {
    let dismissed = false
    const props = {
      show: true,
      closeable: true,
      onDismiss: () => {
        dismissed = true
      }
    }
    const component = mount(<Modal {...props} />)
    component.find('.modal').simulate('click')
    expect(dismissed).toBe(true)
  })

  it('can dismiss on close icon', () => {
    let dismissed = false
    const props = {
      show: true,
      closeable: true,
      onDismiss: () => {
        dismissed = true
      }
    }
    const component = mount(<Modal {...props} />)
    component.find('.modal-close').simulate('click')
    expect(dismissed).toBe(true)
  })

  it('does not dismiss clicking on modal content', () => {
    let dismissed = false
    const props = {
      show: true,
      closeable: true,
      onDismiss: () => {
        dismissed = true
      }
    }
    const component = mount(<Modal {...props} />)
    component.find('.modal-content').simulate('click')
    expect(dismissed).toBe(false)
  })

  it('does not dismiss clicking on background when not closeable', () => {
    let dismissed = false
    const props = {
      show: true,
      onDismiss: () => {
        dismissed = true
      }
    }
    const component = mount(<Modal {...props} />)
    component.find('.modal').simulate('click')
    expect(dismissed).toBe(false)
  })
})
