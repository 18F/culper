import React from 'react'
import { mount } from 'enzyme'
import Accordion from './Accordion'
import Text from '../Text'

describe('The accordion component', () => {
  it('has no items with minimum equal to zero', () => {
    const expected = {
      minimum: 0,
      onUpdate: jest.fn(),
    }
    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(component.find('.accordion').length).toEqual(1)
    expect(expected.onUpdate).toHaveBeenCalledTimes(0)
  })

  it('meets minimum amount required', () => {
    const expected = {
      minimum: 2,
      onUpdate: jest.fn(),
    }
    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(component.find('.accordion').length).toEqual(1)
    expect(expected.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('can append an item', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      timeout: 0,
      onUpdate: jest.fn(),
    }
    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    component.find('button.add').simulate('click')
    expect(expected.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('can apply summary', () => {
    let i = 0
    const expected = {
      minimum: 2,
      items: [{ uuid: '1', open: false }, { uuid: '2', open: false }],
      summary: (item, index) => {
        i += 1
        return <div className="table">{`Item ${index}`}</div>
      },
    }

    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(component.find('div.hello').length).toBeGreaterThan(0)
    expect(component.find('.details').length).toBeGreaterThan(0)
    expect(component.find('.summary').length).toBeGreaterThan(0)
    expect(i).toEqual(2)
  })

  it('can toggle summary item', () => {
    const items = [{ uuid: '1', open: false }, { uuid: '2', open: false }]

    const expected = {
      minimum: 2,
      items,
      summary: (item, index) => (
        <div className="table">{`Item ${index}`}</div>
      ),
      onUpdate: jest.fn(),
    }
    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(items.length).toEqual(2)
    expect(items.every(x => x.open)).toBe(false)

    component
      .find('.toggle')
      .first()
      .simulate('click')
    expect(items.length).toEqual(2)
    expect(items.some(x => !x.open)).toBe(true)
  })

  it('can remove item from collection', () => {
    const expected = {
      skipWarning: true,
      minimum: 2,
      items: [{ uuid: '1', open: false }, { uuid: '2', open: false }],
      summary: (item, index) => (
        <div className="table">{`Item ${index}`}</div>
      ),
      onUpdate: jest.fn(),
    }

    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(component.find('.summary').length).toBeGreaterThan(0)
    component
      .find('a.remove')
      .first()
      .simulate('click')
    expect(expected.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('displays addendum', () => {
    const expected = {
      minimum: 2,
      appendTitle: 'Addendum title',
      appendMessage: 'Addendum message',
    }

    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(component.find('.addendum').length).toEqual(1)
  })

  it('remove when above the minimum', () => {
    const expected = {
      skipWarning: true,
      minimum: 2,
      items: [
        { uuid: '1', open: false },
        { uuid: '2', open: false },
        { uuid: '3', open: false },
        { uuid: '4', open: false },
      ],
      onUpdate: jest.fn(),
    }

    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(component.find('.summary').length).toEqual(4)
    component
      .find('a.remove')
      .first()
      .simulate('click')
    expect(expected.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('can update children', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      onUpdate: jest.fn(),
    }

    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.summary').length).toEqual(1)
    component.find('input').simulate('change', { target: { value: 'myvalue' } })
    component.find('input').simulate('blur')
    expect(expected.onUpdate).toHaveBeenCalledTimes(2)
  })

  it('can support custom summaries', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      onUpdate: jest.fn(),
      customSummary: () => <div className="custom-summary" />,
    }
    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.custom-summary').length).toEqual(1)
  })

  it('can support custom details', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      onUpdate: jest.fn(),
      customDetails: () => <div className="custom-details" />,
    }
    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.custom-details').length).toEqual(1)
  })

  it('no infinite loop on overriding behavior', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      onUpdate: jest.fn(),
      summary: () => <span className="summary-props">Properties</span>,
      customSummary: (item, index, initial, callback) => callback(),
      customDetails: (item, index, initial, callback) => callback(),
    }
    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.summary').length).toEqual(1)
    expect(component.find('.summary-props').length).toEqual(1)
    expect(component.find('.details').length).toEqual(1)
  })

  it('can support custom summary byline', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      defaultState: false,
      initial: false,
      required: true,
      errors: ['1.test_error'],
      summary: () => <span>Summary</span>,
      byline: () => <span className="byline">My custom byline</span>,
    }
    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.byline').length).toEqual(1)
  })

  it('displays if item is incomplete', () => {
    const items = [{ uuid: '1', open: false }]

    const expected = {
      minimum: 1,
      items,
      defaultState: false,
      initial: false,
      required: true,
      errors: ['1.test_error'],
      summary: () => <span>Summary</span>,
    }
    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.svg.incomplete').length).toEqual(1)
    expect(component.find('.byline .usa-alert-error').length).toEqual(1)
  })

  it('can support caption', () => {
    const items = [{ uuid: '1', open: false }]

    const text = 'Test caption'
    const expected = {
      minimum: 1,
      items,
      caption: () => <span>{text}</span>,
    }
    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.caption').length).toEqual(1)
    expect(component.find('.caption').text()).toBe(text)
  })

  it('clicking on addendum "no" does not add a new item', () => {
    const items = [{ uuid: '1', open: false }]
    const expected = {
      minimum: 1,
      items,
      appendTitle: 'Addendum title',
      appendMessage: 'Addendum message',
      onUpdate: jest.fn(),
    }

    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.addendum').length).toEqual(1)
    component.find('.addendum .no input').simulate('change')
    expect(expected.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('clicking on addendum "yes" adds a new item', () => {
    const items = [{ uuid: '1', open: false }]
    const expected = {
      minimum: 1,
      items,
      appendTitle: 'Addendum title',
      appendMessage: 'Addendum message',
      onUpdate: jest.fn(),
    }

    const component = mount(
      <Accordion {...expected}>
        <div>
          <Text name="mytext" bind={true} />
        </div>
      </Accordion>
    )
    expect(component.find('.addendum').length).toEqual(1)
    component.find('.addendum .yes input').simulate('change')
    expect(expected.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('append button is not rendered if it has an addendum', () => {
    const items = [{ uuid: '1', open: false }]
    const expected = {
      minimum: 1,
      items,
      appendTitle: 'Addendum title',
      appendMessage: 'Addendum message',
    }

    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.append-button button').length).toEqual(0)
    expect(component.find('.addendum').length).toEqual(1)
  })

  it('append button is rendered if there is no addendum', () => {
    const items = [{ uuid: '1', open: false }]
    const expected = {
      minimum: 1,
      items,
    }

    const component = mount(
      <Accordion {...expected}>
        <Text name="mytext" bind={true} />
      </Accordion>
    )
    expect(component.find('.append-button button').length).toEqual(1)
    expect(component.find('.addendum').length).toEqual(0)
  })

  it('default state closed if more than one item', () => {
    const items = [{ uuid: '1', open: true }, { uuid: '2', open: true }]

    const expected = {
      items,
      summary: (item, index) => <div className="table">{`Item ${index}`}</div>,
      onUpdate: jest.fn(),
    }
    mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(items.length).toEqual(2)
    expect(items.every(x => x.open)).toBe(false)
  })

  it('default state open if one item', () => {
    const items = [{ uuid: '1' }]

    const expected = {
      items,
      summary: (item, index) => <div className="table">{`Item ${index}`}</div>,
      onUpdate: jest.fn(),
    }

    mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(items.length).toEqual(1)
    expect(items.every(x => x.open)).toBe(true)
  })

  it('aria summary is present when no description is visually rendered', () => {
    const items = [{ uuid: '1' }]

    const expected = {
      items,
      summary: (item, index) => <div className="table">{`Item ${index}`}</div>,
      onUpdate: jest.fn(),
    }
    const component = mount(
      <Accordion {...expected}>
        <div className="hello">hello</div>
      </Accordion>
    )
    expect(items.length).toEqual(1)
    expect(component.find('.aria-description').length).toBe(1)
  })
})
