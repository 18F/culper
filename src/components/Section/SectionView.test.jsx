import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { SectionViews, SectionView } from './SectionView'
import { mount } from 'enzyme'

describe('The  SectionView component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('renders contents based on current param', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(
      <Provider store={store}>
        <SectionViews current="foo">
          <SectionView name="foo">
            <div>Foo</div>
          </SectionView>
          <SectionView name="bar">
            <div>Bar</div>
          </SectionView>
        </SectionViews>
      </Provider>
    )
    expect(component.find('.view').text()).toBe('Foo')
  })

  it('handles when current param does not match', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(
      <Provider store={store}>
        <SectionViews current="doesNotExist">
          <SectionView name="foo">
            <div>Foo</div>
          </SectionView>
          <SectionView name="bar">
            <div>Bar</div>
          </SectionView>
        </SectionViews>
      </Provider>
    )
    expect(component.find('.view').length).toBe(0)
  })

  it('handles next button click', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(
      <Provider store={store}>
        <SectionViews current="foo" dispatch={store.dispatch}>
          <SectionView name="foo" next="foo">
            <div>Foo</div>
          </SectionView>
        </SectionViews>
      </Provider>
    )
    component.find('button.next').simulate('click')
    expect(store.getActions()[0].to).toEqual('/form/foo')
  })
})
