import React from 'react'
import { mount } from 'enzyme'
import Accordion from './Accordion'
import Text from '../Text'

describe('The accordion component', () => {
  it('has no items with minimum equal to zero', () => {
    let items = []
    const expected = {
      minimum: 0,
      onUpdate: (x) => { items = x }
    }
    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('.accordion').length).toEqual(1)
    expect(items.length).toEqual(0)
  })

  it('meets minimum amount required', () => {
    let items = []
    const expected = {
      minimum: 2,
      onUpdate: (x) => { items = x }
    }
    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('.accordion').length).toEqual(1)
    expect(items.length).toEqual(2)
  })

  it('can append an item', () => {
    let items = [
      { uuid: '1', open: false }
    ]

    const expected = {
      minimum: 1,
      items: items,
      onUpdate: (x) => { items = x }
    }
    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    component.find('button.add').simulate('click')
    expect(items.length).toEqual(2)
  })

  it('can apply summary', () => {
    let i = 0
    const expected = {
      minimum: 2,
      items: [
        { uuid: '1', open: false },
        { uuid: '2', open: false }
      ],
      summary: (item, index) => {
        i++
        return (<div className="table">Item {index}</div>)
      }
    }

    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('div.hello').length).toBeGreaterThan(0)
    expect(component.find('.details').length).toBeGreaterThan(0)
    expect(component.find('.summary').length).toBeGreaterThan(0)
    expect(i).toEqual(2)
  })

  it('can toggle summary item', () => {
    let items = [
      { uuid: '1', open: true },
      { uuid: '2', open: true }
    ]

    const expected = {
      minimum: 2,
      items: items,
      summary: (item, index) => {
        return (<div className="table">Item {index}</div>)
      },
      onUpdate: (x) => { items = x }
    }
    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(items.length).toEqual(2)
    expect(items.every(x => { return x.open })).toBe(true)

    component.find('.toggle').first().simulate('click')
    expect(items.length).toEqual(2)
    expect(items.some(x => { return !x.open })).toBe(true)
  })

  it('can remove item from collection', () => {
    let i = 0
    const expected = {
      skipWarning: true,
      minimum: 2,
      items: [
        { uuid: '1', open: false },
        { uuid: '2', open: false }
      ],
      summary: (item, index) => {
        return (<div className="table">Item {index}</div>)
      },
      onUpdate: () => { i++ }
    }

    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('.summary').length).toBeGreaterThan(0)
    component.find('a.remove').first().simulate('click')
    expect(i).toEqual(1)
  })

  it('displays addendum', () => {
    const expected = {
      minimum: 2,
      appendTitle: 'Addendum title',
      appendMessage: 'Addendum message'
    }

    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('.addendum').length).toEqual(1)
  })

  it('remove when above the minimum', () => {
    let items = []
    const expected = {
      skipWarning: true,
      minimum: 2,
      items: [
        { uuid: '1', open: false },
        { uuid: '2', open: false },
        { uuid: '3', open: false },
        { uuid: '4', open: false }
      ],
      onUpdate: (x) => { items = x }
    }

    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('.summary').length).toEqual(4)
    component.find('a.remove').first().simulate('click')
    expect(items.length).toEqual(3)
  })

  it('can update children', () => {
    let items = [
      { uuid: '1', open: false }
    ]

    const expected = {
      minimum: 1,
      items: items,
      onUpdate: (x) => { items = x }
    }

    const component = mount(<Accordion {...expected}><Text name="mytext" bind={true} /></Accordion>)
    expect(component.find('.summary').length).toEqual(1)
    component.find('input').simulate('change', { target: { value: 'myvalue' } })
    component.find('input').simulate('blur')
    expect(items.length).toEqual(1)
    expect(items[0].mytext.value).toEqual('myvalue')
  })

  it('can support custom summaries', () => {
    let items = [
      { uuid: '1', open: false }
    ]

    const expected = {
      minimum: 1,
      items: items,
      onUpdate: (x) => { items = x },
      customSummary: (item, index) => { return <div className="custom-summary"></div> }
    }
    const component = mount(<Accordion {...expected}><Text name="mytext" bind={true} /></Accordion>)
    expect(component.find('.custom-summary').length).toEqual(1)
  })

  it('can support custom details', () => {
    let items = [
      { uuid: '1', open: false }
    ]

    const expected = {
      minimum: 1,
      items: items,
      onUpdate: (x) => { items = x },
      customDetails: (item, index) => { return <div className="custom-details"></div> }
    }
    const component = mount(<Accordion {...expected}><Text name="mytext" bind={true} /></Accordion>)
    expect(component.find('.custom-details').length).toEqual(1)
  })

  it('no infinite loop on overriding behavior', () => {
    let items = [
      { uuid: '1', open: false }
    ]

    const expected = {
      minimum: 1,
      items: items,
      onUpdate: (x) => { items = x },
      summary: (item, index, initial) => { return <span className="summary-props">Properties</span> },
      customSummary: (item, index, initial, callback) => { return callback() },
      customDetails: (item, index, initial, callback) => { return callback() }
    }
    const component = mount(<Accordion {...expected}><Text name="mytext" bind={true} /></Accordion>)
    expect(component.find('.summary').length).toEqual(1)
    expect(component.find('.summary-props').length).toEqual(1)
    expect(component.find('.details').length).toEqual(1)
  })

  it('can support custom summary byline', () => {
    let items = [
      { uuid: '1', open: false }
    ]

    const expected = {
      minimum: 1,
      items: items,
      byline: (item, index, initial) => { return <span className="byline">My custom byline</span> }
    }
    const component = mount(<Accordion {...expected}><Text name="mytext" bind={true} /></Accordion>)
    expect(component.find('.byline').length).toEqual(1)
  })
})
