import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from './index'

describe('The error message component', () => {
  const select = id => `[data-testid="${id}"]`
  it('renders without crashing', () => {
    shallow(<ErrorMessage />)
  })

  it('renders a title', () => {
    const fixture = 'Test Title'
    const component = shallow(
      <ErrorMessage title={fixture} />
    )

    expect(component.find(select('title')).text())
      .toEqual(fixture)
  })

  it('renders a message', () => {
    const fixture = 'Test Message'
    const component = shallow(
      <ErrorMessage message={fixture} />
    )

    expect(component.find(select('message')).text())
      .toEqual(fixture)
  })

  it('renders a note', () => {
    const fixture = 'Test Note'
    const component = shallow(
      <ErrorMessage note={fixture} />
    )

    expect(component.find(select('note')).text())
      .toEqual(fixture)
  })
})
