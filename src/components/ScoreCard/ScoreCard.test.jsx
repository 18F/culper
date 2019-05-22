import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ConnectedScoreCard from 'components/ScoreCard/ScoreCard'

describe('The score card component', () => {
  it('shows', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({
      authentication: { authenticated: true },
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = mount(
      <Provider store={store}>
        <ConnectedScoreCard />
      </Provider>
    )
    expect(component.find('div.score-card').length).toEqual(1)
  })
})
