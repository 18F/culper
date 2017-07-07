import React from 'react'
import { mount, sinon } from 'enzyme'
import Sticky from './Sticky'

describe('The sticky component', () => {
  const fire = (eventName, payload) => {
    window.dispatchEvent(new window.UIEvent(eventName, payload))
  }

  it('default position is relative', () => {
    const props = {}
    const component = mount(<Sticky {...props} />)
    expect(component.state('position')).toBe('relative')
  })

  it('scroll within breakpoints is relative', () => {
    const props = {
      window: () => {
        return {
          ...window,
          pageYOffset: 9
        }
      }
    }
    const component = mount(<Sticky {...props} />)
    expect(component.state('position')).toBe('relative')
  })

  it('detects scrollbar movement', () => {
    let scrolled = false
    const props = {
      window: () => {
        return {
          ...window,
          pageYOffset: 100
        }
      },
      addEvent: (w, name, fn) => {
        if (name === 'scroll') {
          w.addEventListener(name, (event) => {
            scrolled = true
            fn(event)
          })
        }
      },
      removeEvent: (w, name, fn) => {
        w.removeEventListener(name, fn)
      }
    }
    const component = mount(<Sticky {...props} />)
    fire('scroll', { detail: 0 })
    expect(scrolled).toBe(true)
    expect(component.state('position')).toBe('sticky')
  })

  it('detects wheel movement', () => {
    let scrolled = false
    const props = {
      scrollY: 400,
      window: () => {
        return {
          ...window,
          pageYOffset: 500
        }
      },
      addEvent: (w, name, fn) => {
        if (name === 'mousewheel') {
          w.addEventListener(name, (event) => {
            scrolled = true
            fn(event)
          })
        }
      },
      removeEvent: (w, name, fn) => {
        w.removeEventListener(name, fn)
      }
    }
    const component = mount(<Sticky {...props} />)
    fire('mousewheel', { deltaY: 100 })
    expect(scrolled).toBe(true)
    expect(component.state('position')).toBe('sticky')
    expect(component.state('scrollY')).toBe(500)
  })

  it('can scroll up', () => {
    let scrolled = false
    const props = {
      scrollY: 400,
      window: () => {
        return {
          ...window,
          pageYOffset: 300
        }
      },
      addEvent: (w, name, fn) => {
        if (name === 'mousewheel') {
          w.addEventListener(name, (event) => {
            scrolled = true
            fn(event)
          })
        }
      },
      removeEvent: (w, name, fn) => {
        w.removeEventListener(name, fn)
      }
    }
    const component = mount(<Sticky {...props} />)
    fire('mousewheel', { target: { deltaY: -100 } })
    expect(scrolled).toBe(true)
    expect(component.state('position')).toBe('sticky')
    expect(component.state('scrollY')).toBe(300)
  })

  it('can remove listeners', () => {
    const props = {
      scrollY: 400,
      window: () => {
        return {
          ...window,
          pageYOffset: 300
        }
      }
    }
    const component = mount(<Sticky {...props} />)
    const instance = component.instance()
    const spy = jest.spyOn(instance, 'componentWillUnmount')
    component.unmount()
    expect(spy).toHaveBeenCalled()
  })
})
