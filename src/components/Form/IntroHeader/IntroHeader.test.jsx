import React from 'react'
import { mount } from 'enzyme'
import IntroHeader from './IntroHeader'

describe('The IntroHeader component', () => {
  it('renders text if errors exists', () => {
    const component = mount(<IntroHeader errors={() => { return true }} />)
    expect(component.find('h1').text()).toEqual('Looks like we have a few issues, how would you like to fix them?')
  })
  it('renders text if status is neutral', () => {
    let status = {
      status: 'neutral'
    }
    const component = mount(<IntroHeader />)
    expect(component.find('h1').text()).toEqual('Looks like you still have some items left, how would you like to finish them?')
  })
  it('renders text if status is complete', () => {
    let status = {
      status: 'complete'
    }
    const component = mount(<IntroHeader completed={() => { return true }} />)
    expect(component.find('h1').text()).toEqual('Everything looks good here but you can still review your answers.')
  })
})
