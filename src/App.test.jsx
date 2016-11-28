import renderer from 'react-test-renderer'

test('Renders homepage', () => {
  const component = renderer.create(
    <App/>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
