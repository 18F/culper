import React from 'react'
import { mount } from 'enzyme'
import Loading from 'views/Loading/Loading'
import { Spinner, SpinnerAction } from 'components/Form'

describe('The Loading component', () => {
  const component = mount(<Loading />)

  it('renders without errors', () => {
    expect(component.exists()).toEqual(true)
  })

  it('after mounting, sets the spinner state to true', () => {
    expect(component.state('spinner')).toEqual(true)
  })

  it('the spinnerAction starts as Spin', () => {
    expect(component.state('spinnerAction')).toEqual(SpinnerAction.Spin)
  })

  it('renders the Spinner component with the show and action props', () => {
    const spinnerComponent = component.find(Spinner)
    expect(spinnerComponent.length).toEqual(1)
    expect(spinnerComponent.prop('show')).toEqual(component.state('spinner'))
    expect(spinnerComponent.prop('action')).toEqual(component.state('spinnerAction'))
  })
})
