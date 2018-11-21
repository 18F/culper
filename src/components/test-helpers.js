import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

export const testSnapshot = (jsx, minElements = 3) => {
  // Sanity check to make sure the component is being rendered with the full subtree. Using Enzyme as a workaround for not having the find*() methods available in React 16

  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore()

  const enzymeComponent = mount(<Provider store={store}>{jsx}</Provider>)

  expect(enzymeComponent.find('div').length).toBeGreaterThan(minElements)

  const component = renderer.create(<Provider store={store}>{jsx}</Provider>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}
