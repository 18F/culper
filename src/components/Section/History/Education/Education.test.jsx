import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Education } from './Education'

describe('The Education component', () => {
  it('renders without errors', () => {
    const component = shallow(<Education />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('renders an education item', () => {
    const component = shallow(<Education />)

    expect(component.find('.education').length).toEqual(1)
  })

  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({ ...defaultState })

    return mount(
      <Provider store={store}>
        <Education {...props} />
      </Provider>
    )
  }

  describe('with one item', () => {
    const testProps = {
      List: {
        items: [{ Item: {} }],
      },
    }

    const component = mountComponentWithStore(testProps)

    it('renders two education items', () => {
      expect(component.find('.education').length).toEqual(2)
    })
  })
})
