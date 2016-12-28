import React from 'react'
import { mount } from 'enzyme'
import DateRange from './DateRange'

describe('The date range component', () => {
  it('renders appropriately without an error', () => {
    const component = mount(<DateRange />)
    expect(component.find('select#fromMonth').length).toEqual(1)

    expect(component.find('input#fromYear').length).toEqual(1)
    expect(component.find('select#fromMonth').length).toEqual(1)
    expect(component.find('input#fromEstimated').length).toEqual(1)

    expect(component.find('input#toYear').length).toEqual(1)
    expect(component.find('select#toMonth').length).toEqual(1)
    expect(component.find('input#toEstimated').length).toEqual(1)
  })
})
