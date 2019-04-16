import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AdditionalActivity from './AdditionalActivity'

describe('The employment additional activity component', () => {
  it('renders without errors', () => {
    const component = shallow(<AdditionalActivity />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({
      application: {},
      ...defaultState,
    })

    return mount(
      <Provider store={store}>
        <AdditionalActivity {...props} />
      </Provider>
    )
  }

  it('renders the default state', () => {
    const component = mountComponentWithStore()

    expect(component.find('.branch .yes').length).toBe(1)
    expect(component.find('.branch .no').length).toBe(1)
  })

  it('implements an onUpdate handler', () => {
    const onUpdate = jest.fn()
    const expected = {
      onUpdate,
      items: [
        {
          Item: {
            Has: { value: 'Yes' },
            Position: {
              name: 'Position',
              value: 'Dev',
            },
          },
        },
      ],
    }

    const component = mountComponentWithStore(expected)
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('change')
    component.find({ type: 'text', name: 'Position' }).simulate('change')
    expect(onUpdate.mock.calls.length).toBe(2)
  })
})
