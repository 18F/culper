import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { SectionViews, SectionView } from './SectionView'
import { mount } from 'enzyme'

describe('The SectionView component', () => {
  const mockStore = configureMockStore()

  it('renders contents based on current param', () => {
    const store = mockStore({})
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
    const store = mockStore({})
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

  it('handles navigation to section', () => {
    let props = {}
    const update = p => {
      props = p
    }
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <SectionViews current="foo" dispatch={store.dispatch} update={update}>
          <SectionView name="foo" next="foo">
            <div>Foo</div>
          </SectionView>
        </SectionViews>
      </Provider>
    )
    component.find('button.next').simulate('click')
    expect(props.section).toEqual('foo')
    expect(props.subsection).toEqual('intro')
  })

  it('handles navigation to subsection', () => {
    let props = {}
    const update = p => {
      props = p
    }
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <SectionViews current="foo" dispatch={store.dispatch} update={update}>
          <SectionView name="foo" next="foo/bar">
            <div>Foo</div>
          </SectionView>
        </SectionViews>
      </Provider>
    )
    component.find('button.next').simulate('click')
    expect(props.section).toEqual('foo')
    expect(props.subsection).toEqual('bar')
  })

  it('handles navigation to sub-subsection', () => {
    let props = {}
    const update = p => {
      props = p
    }
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <SectionViews current="foo" dispatch={store.dispatch} update={update}>
          <SectionView name="foo" next="foo/bar/meh">
            <div>Foo</div>
          </SectionView>
        </SectionViews>
      </Provider>
    )
    component.find('button.next').simulate('click')
    expect(props.section).toEqual('foo')
    expect(props.subsection).toEqual('bar/meh')
  })
})
