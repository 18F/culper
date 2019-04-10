import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import Review from './index'

describe('Financial Review', () => {
  it('should render without crashing', () => {
    const mockStore = configureMockStore()
    const store = mockStore()

    shallow(
      <Provider store={store}>
        <Review />
      </Provider>
    )
  })
})
