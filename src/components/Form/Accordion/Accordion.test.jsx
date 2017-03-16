import React from 'react'
import { mount } from 'enzyme'
import Accordion from './Accordion'
import Text from '../Text'

describe('The accordion component', () => {
  it('has no items with minimum equal to zero', () => {
    const expected = {
      minimum: 0
    }
    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('div.hello').length).toEqual(0)
  })

  it('meets minimum amount required', () => {
    const expected = {
      minimum: 2
    }
    const component = mount(<Accordion {...expected}><div className="hello">hello</div></Accordion>)
    expect(component.find('.summary').length).toEqual(2)
  })

  it('can append an item', () => {
    let items = []
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
    let items = []
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
      minimum: 2,
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
    let items = []
    const expected = {
      minimum: 1,
      items: items,
      onUpdate: (x) => { items = x }
    }

    const component = mount(<Accordion {...expected}><Text name="mytext" bind={true} /></Accordion>)
    expect(component.find('.summary').length).toEqual(1)
    component.find('input').simulate('change', { target: { value: 'myvalue' } })
    expect(items.length).toEqual(1)
    expect(items[0].mytext.value).toEqual('myvalue')
  })
})
