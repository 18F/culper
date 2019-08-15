import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ConnectedProgressBar from 'components/ProgressBar/ProgressBar'

describe('The progress bar component', () => {
  const mockStore = configureMockStore()

  it('increments counter', () => {
    const application = {
      Settings: {
        formType: 'SF86',
      },
      Completed: {
        citizenship: [
          { section: 'citizenship', subsection: 'passport', valid: true },
          { section: 'citizenship', subsection: 'status', valid: true },
          { section: 'citizenship', subsection: 'multiple', valid: true },
          { section: 'citizenship', subsection: 'passports', valid: true },
        ],
      },
    }

    const store = mockStore({
      application,
      form: {
        IDENTIFICATION_NAME: { complete: true },
        CITIZENSHIP_US_PASSPORT: { complete: true },
        CITIZENSHIP_STATUS: { complete: true },
        CITIZENSHIP_MULTIPLE: { complete: true },
        CITIZENSHIP_PASSPORTS: { complete: true },
        HISTORY_RESIDENCE: { complete: false },
        HISTORY_EMPLOYMENT: { complete: false },
        HISTORY_EDUCATION: { complete: true },
        RELATIONSHIPS_STATUS_MARITAL: { complete: true },
        RELATIONSHIPS_STATUS_COHABITANTS: { complete: true },
        RELATIONSHIPS_PEOPLE: { complete: true },
        RELATIONSHIPS_RELATIVES: { complete: true },
      },
      section: {
        section: 'psychological',
        subsection: 'competence',
      },
    })

    const component = mount(
      <Provider store={store}>
        <ConnectedProgressBar />
      </Provider>
    )
    expect(component.find('div').length).toEqual(2)
    expect(component.find('#progress-bar').props().style.width).not.toBe('0%')
  })
})
