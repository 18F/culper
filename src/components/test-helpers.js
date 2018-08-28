import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

export const testSnapshot = (jsx, minElements = 3) => {
  // Sanity check to make sure the component is being rendered with the full subtree. Using Enzyme as a workaround for not having the find*() methods available in React 16
  const enzymeComponent = mount(jsx)
  expect(enzymeComponent.find('div').length).toBeGreaterThan(minElements)

  const component = renderer.create(jsx)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}
