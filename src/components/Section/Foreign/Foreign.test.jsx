import React from 'react'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Foreign from './Foreign'
import Passport from './Passport'
import { mount } from 'enzyme'

const applicationState = {
  Foreign: {}
}

describe('The foreign section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({
      authentication: [],
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Foreign />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({
      authentication: { authenticated: true, application: applicationState }
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Foreign />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Foreign subsection="review" />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })

    const tests = [
      {
        section: 'passport',
        action: component => {
          component.find('.passport .branch .yes input').simulate('change')
        }
      },
      {
        section: 'contacts',
        action: component => {
          component
            .find('.foreign-contacts .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business',
        action: component => {
          component
            .find('.foreign-business-advice .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'activities/direct',
        action: component => {
          component.find('.direct .branch .yes input').simulate('change')
        }
      },
      {
        section: 'activities/indirect',
        action: component => {
          component.find('.indirect .branch .yes input').simulate('change')
        }
      },
      {
        section: 'activities/realestate',
        action: component => {
          component.find('.realestate .branch .yes input').simulate('change')
        }
      },
      {
        section: 'activities/benefits',
        action: component => {
          component
            .find('.benefit-activity .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'activities/support',
        action: component => {
          component
            .find('.foreign-activities-support .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/advice',
        action: component => {
          component
            .find('.foreign-business-advice .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/family',
        action: component => {
          component
            .find('.foreign-business-family .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/employment',
        action: component => {
          component
            .find('.foreign-business-employment .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/ventures',
        action: component => {
          component
            .find('.foreign-business-ventures .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/conferences',
        action: component => {
          component
            .find('.foreign-business-conferences .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/contact',
        action: component => {
          component
            .find('.foreign-business-contact .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/sponsorship',
        action: component => {
          component
            .find('.foreign-business-sponsorship .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/political',
        action: component => {
          component
            .find('.foreign-business-political .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'business/voting',
        action: component => {
          component
            .find('.foreign-business-voting .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'travel',
        action: component => {
          component
            .find('.foreign-travel .branch .yes input')
            .at(0)
            .simulate('change')
        }
      }
    ]

    tests.forEach(test => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Foreign section="foreign" subsection={test.section} />
          </MemoryRouter>
        </Provider>
      )
      test.action(component)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('can parse previous names', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: {
        Identification: {
          ApplicantName: {
            first: 'john',
            last: 'smith'
          },
          OtherNames: {
            HasOtherNames: {
              value: 'Yes'
            },
            List: {
              items: [
                {
                  Item: {
                    first: 'johnathan',
                    last: 'smith'
                  }
                }
              ]
            }
          }
        }
      }
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Foreign subsection="passport" />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find(Passport).props().suggestedNames.length).toBe(1)
  })
})
