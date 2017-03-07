import React from 'react'
import { mount } from 'enzyme'
import { Row } from './Row'

describe('The row component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'row'
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.item').length).toEqual(1)
    expect(component.find('button').length).toEqual(0)
  })

  it('display table caption/title if first row', () => {
    const expected = {
      name: 'row',
      first: true
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.item').length).toEqual(1)
    expect(component.find('.title').length).toEqual(1)
  })

  it('do not display table caption/title if not the first row', () => {
    const expected = {
      name: 'row',
      first: false
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.item').length).toEqual(1)
    expect(component.find('.title').length).toEqual(0)
  })

  it('display the dates appropriately', () => {
    const expected = {
      name: 'row',
      first: false
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.item').length).toEqual(1)
    expect(component.find('.title').length).toEqual(0)
  })

  it('can remove item when shown', () => {
    let remove = 0
    const expected = {
      name: 'row',
      first: false,
      show: true,
      onRemove: () => { remove++ }
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.item').length).toEqual(1)
    expect(component.find('.title').length).toEqual(0)
    expect(component.find('.details').length).toEqual(1)

    component.find('.remove').simulate('click')
    expect(remove).toEqual(1)
  })

  it('can toggle', () => {
    const expected = {
      name: 'row',
      first: false,
      show: false
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.details.hidden').length).toEqual(1)
    component.find('.toggle').simulate('click')
    expect(component.find('.details').length).toEqual(1)
  })

  it('can show errors', () => {
    const expected = {
      name: 'row',
      first: false,
      show: false,
      hasErrors: true,
      errorMessage: 'Ruh-row'
    }
    const component = mount(<Row {...expected} />)
    expect(component.find('.incomplete').text()).toEqual(expected.errorMessage)
  })
})
