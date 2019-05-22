import {
  isActive,
  findPosition,
  didRouteChange,
} from './navigation-helpers'

describe('Navigation component validation', () => {
  it('can determine if a path is active', () => {
    expect(
      isActive('/form/identification', '/form/foreign/activities/direct')
    ).toBe(false)
    expect(
      isActive('/form/foreign', '/form/foreign/activities/direct')
    ).toBe(true)
    expect(
      isActive('/form/foreign/activities', '/form/foreign/activities/direct')
    ).toBe(true)
    expect(
      isActive('/form/foreign/activities', '/my/form/foreign/activities/direct')
    ).toBe(false)
    expect(
      isActive('/form/foreign/activities/direct', '/form/foreign/activities/direct')
    ).toBe(true)
  })
})

describe('UI helpers', () => {
  it('should find the position', () => {
    const el = {
      offsetTop: 10,
      offsetParent: {
        offsetTop: 2,
      },
    }
    const top = findPosition(el)
    expect(top).toEqual([12])
  })
})

describe('didRouteChange()', () => {
  it('considers locations with the same pathname the same', () => {
    const loc = {
      pathname: '/foo',
      otherprop: 'bar',
    }
    const prevLoc = {
      pathname: '/foo',
      otherprop: 'baz',
    }
    expect(didRouteChange(loc, prevLoc)).toEqual(false)
  })

  it('considers locations with different pathnames to be different', () => {
    const loc = {
      pathname: '/foo',
      otherprop: 'bar',
    }
    const prevLoc = {
      pathname: '/baz',
      otherprop: 'bar',
    }
    expect(didRouteChange(loc, prevLoc)).toEqual(true)
  })
})
