import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import SectionTitle from './SectionTitle'
import { mount } from 'enzyme'

describe('The title section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('can handle no title', () => {
    const store = mockStore({ section: { title: '' } })
    const component = mount(<Provider store={store}><SectionTitle /></Provider>)
    expect(component.find('div').length).toEqual(1)
    expect(component.find('div').text()).toEqual('')
  })

  it('can handle title', () => {
    const store = mockStore({ section: { title: 'This is a test' } })
    const component = mount(<Provider store={store}><SectionTitle /></Provider>)
    expect(component.find('div').length).toEqual(1)
    expect(component.find('div').text()).toEqual('This is a test')
  })
})
