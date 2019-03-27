import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ProgressBar from 'components/ProgressBar/ProgressBar'

describe('The progress bar component', () => {
  const mockStore = configureMockStore()

  it('increments counter', () => {
    const application = {
      Completed: {
        citizenship: [
          { section: 'citizenship', subsection: 'status', valid: true },
          { section: 'citizenship', subsection: 'multiple', valid: true },
          { section: 'citizenship', subsection: 'passports', valid: true },
        ],
      },
    }

    const store = mockStore({
      application,
      section: {
        section: 'psychological',
        subsection: 'competence',
      },
      authentication: { formType: 'SF86' },
    })

    const component = mount(
      <Provider store={store}>
        <ProgressBar />
      </Provider>
    )
    expect(component.find('div').length).toEqual(2)
    expect(component.find('#progress-bar').props().style.width).not.toBe('0%')
  })
})
