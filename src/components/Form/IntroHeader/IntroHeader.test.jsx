import React from 'react'
import { mount } from 'enzyme'
import IntroHeader from './IntroHeader'

describe('The IntroHeader component', () => {
  it('renders text if errors exists', () => {
    let errors = ['error']
    const component = mount(<IntroHeader Errors={errors}/>)
    expect(component.find('h1').text()).toEqual('Looks like we have a few issues, here is how to fix them.')
  })
  it('renders text if status is neutral', () => {
    let status = {
      status: 'neutral'
    }
    const component = mount(<IntroHeader Completed={status}/>)
    expect(component.find('h1').text()).toEqual('Looks like you still have some items left, here is how to finish them.')
  })
  it('renders text if status is complete', () => {
    let status = {
      status: 'complete'
    }
    const component = mount(<IntroHeader Completed={status}/>)
    expect(component.find('h1').text()).toEqual('Everything looks good here but you can still review your answers.')
  })
})
