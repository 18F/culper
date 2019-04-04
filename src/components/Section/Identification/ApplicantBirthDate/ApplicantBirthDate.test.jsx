import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ApplicantBirthDate } from './ApplicantBirthDate'

// give a fake GUID so the field IDs don't differ between snapshots
jest.mock('components/Form/ValidationElement/index')

describe('The ApplicantBirthDate component', () => {
  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({ ...defaultState })
    return mount(
      <Provider store={store}>
        <ApplicantBirthDate {...props} />
      </Provider>
    )
  }

  it('renders without errors', () => {
    const component = shallow(<ApplicantBirthDate />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('displays no error by default', () => {
    const component = mountComponentWithStore()

    component.find('.month input').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('implements an onUpdate handler', () => {
    let updates = 0
    const testProps = {
      onUpdate: () => {
        updates += 1
      },
    }

    const component = mountComponentWithStore(testProps)
    component.find('.month input').simulate('change')
    component.find('.day input').simulate('change')
    component.find('.year input').simulate('change')
    expect(updates).toBe(3)
  })

  it('displays age confirmation', () => {
    const testProps = {
      Date: {
        month: '01',
        day: '01',
        year: '1700',
      },
    }

    const component = mountComponentWithStore(testProps)
    expect(component.find('.age-warning').length).toBe(1)
  })
})
