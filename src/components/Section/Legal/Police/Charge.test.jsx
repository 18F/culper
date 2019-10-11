import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Charge from './Charge'

describe('Charge', () => {
  it('renders without crashing', () => {
    const component = shallow(<Charge />)
    expect(component.exists()).toBe(true)
  })

  it('renders each charge input', () => {
    const component = shallow(<Charge />)
    expect(component.find('.offense-chargetype').length).toEqual(1)
    expect(component.find('.offense-courtcharge').length).toEqual(1)
    expect(component.find('.offense-courtoutcome').length).toEqual(1)
    expect(component.find('.offense-courtdate').length).toEqual(1)
  })

  it('handles updates', () => {
    const mockStore = configureMockStore()
    const store = mockStore()
    const mockOnUpdate = jest.fn()
    const component = mount(
      <Provider store={store}>
        <Charge onUpdate={mockOnUpdate} />
      </Provider>
    )

    component.find('.offense-chargetype .charge-felony input').simulate('change')
    component.find('.offense-courtcharge input').simulate('change', { target: { value: 'charge' } })
    component.find('.offense-courtoutcome input').simulate('change', { target: { value: 'outcome' } })
    component.find('.offense-courtdate .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.offense-courtdate .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    expect(mockOnUpdate).toHaveBeenCalledTimes(5)
  })
})
