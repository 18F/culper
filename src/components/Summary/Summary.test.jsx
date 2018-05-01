import React from 'react' // eslint-disable-line no-unused-vars
import { mount } from 'enzyme' // eslint-disable-line no-unused-vars
import { Summary } from './Summary'

describe('The summary helper', () => {
  it('renders default summary structure', () => {
    const summary = mount(Summary())
    expect(summary.find('.index').text()).toEqual('Item:')
    expect(summary.find('.context').text()).toBe('')
    expect(summary.find('.dates').length).toBe(0)
  })

  it('render different item type', () => {
    const summary = mount(Summary({type: 'Milk'}))
    expect(summary.find('.index').text()).toEqual('Milk:')
  })

  it('render index number', () => {
    const summary = mount(Summary({index: 0}))
    expect(summary.find('.index').text()).toEqual('Item 1:')
  })

  it('render left side', () => {
    const summary = mount(Summary({left: 'left shoe'}))
    expect(summary.find('.context').text()).toEqual('left shoe')
  })

  it('render right side', () => {
    const summary = mount(Summary({right: 'right shoe'}))
    expect(summary.find('.dates').text()).toEqual('right shoe')
  })

  it('render placeholder if left and right are empty', () => {
    const summary = mount(Summary({placeholder: 'saving a spot in line'}))
    expect(summary.find('.context').text()).toEqual('saving a spot in line')
  })

  it('does not render placeholder if left is empty but right is not', () => {
    const summary = mount(Summary({right: 'right shoe', placeholder: 'saving a spot in line'}))
    expect(summary.find('.context').text()).toEqual('')
  })

  it('does not render placeholder if right is empty but left is not', () => {
    const summary = mount(Summary({left: 'left shoe', placeholder: 'saving a spot in line'}))
    expect(summary.find('.context').text()).toEqual('left shoe')
  })

  it('does not render placeholder if right and left are not empty', () => {
    const summary = mount(Summary({left: 'left shoe', right: 'right shoe', placeholder: 'saving a spot in line'}))
    expect(summary.find('.context').text()).toEqual('left shoe')
    expect(summary.find('.dates').text()).toEqual('right shoe')
  })

  it('calculates characters', () => {
    const summary = mount(Summary({title: 'Shoe', left: 'left shoe', right: 'right shoe', placeholder: 'saving a spot in line'}))
    expect(summary.find('.context .at-9').length).toBe(1)
    expect(summary.find('.dates .at-10').length).toBe(1)
  })
})
