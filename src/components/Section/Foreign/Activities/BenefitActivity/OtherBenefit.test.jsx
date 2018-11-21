import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OtherBenefit from './OtherBenefit'
import ContinuingBenefit from './ContinuingBenefit';
import { Textarea } from '../../../../Form'

describe('The OtherBenefit component', () => {
  const mockStore = configureMockStore()
  const requiredProps = {
    onUpdate: jest.fn(),
    onError: jest.fn(),
    scrollIntoView: jest.fn(),
    otherBenefit: {}
  }
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OtherBenefit {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent(requiredProps)
    expect(component.find(ContinuingBenefit).length).toBe(1)
  })

  it('Performs updates', () => {
    const component = createComponent(requiredProps)
    expect(component.find(ContinuingBenefit).length).toBe(1)
    component
      .find('.began input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('.end input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('.frequency input')
      .first()
      .simulate('change')
    component
      .find('input[name="Country"]')
      .simulate('change', { target: { value: 'Germany' } })
    component.find('input[name="Value"]').simulate('change')
    component.find('input[name="ValueEstimated"]').simulate('change')
    component.find('textarea[name="Reason"]').simulate('change')
    component.find('.obligated .yes input').simulate('change')
    expect(requiredProps.onUpdate).toHaveBeenCalledTimes(8)
  })

  it('updates the OtherFrequencyTypeExplanation field', () => {
    const component = createComponent(requiredProps)
    expect(component.find({ name: 'OtherFrequencyTypeExplanation'}).length).toBe(1)
    component
      .find({ name: 'OtherFrequencyTypeExplanation' })
      .simulate('change')
    expect(requiredProps.onUpdate).toHaveBeenCalled()
  })
})
