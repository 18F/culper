import renderer from 'react-test-renderer'

export const testSnapshot = jsx => {
  const component = renderer.create(jsx)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}
