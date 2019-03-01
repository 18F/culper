import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import History, { totalYears } from 'components/Section/History/History'
import Employment from 'components/Section/History/Employment'
import { mount } from 'enzyme'

const applicationState = {
  History: {}
}

describe('The History section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <History subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = [
      '',
      'review',
      'residence',
      'employment',
      'education',
      'federal'
    ]
    const store = mockStore({})

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <History subsection={section} />
        </Provider>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('sets totalYears to proper value if applicant has less than 10 years of history', () => {
    const store = mockStore({
      application: {
        Identification: {
          ApplicantBirthDate: {
            Date: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear() - 18}`,
              estimated: false
            }
          }
        }
      }
    })

    const component = mount(
      <Provider store={store}>
        <History subsection="employment" />
      </Provider>
    )

    expect(component.find(Employment).props().totalYears).toEqual(2)
  })

  it('sets totalYears to proper value if applicant has more than 10 years of history', () => {
    const store = mockStore({
      application: {
        Identification: {
          ApplicantBirthDate: {
            Date: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear() - 30}`,
              estimated: false
            }
          }
        }
      }
    })

    const component = mount(
      <Provider store={store}>
        <History subsection="employment" />
      </Provider>
    )

    expect(component.find(Employment).props().totalYears).toEqual(10)
  })
})
