import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { PackagePrint } from './index'

describe('The PackagePrint component', () => {
  it('renders without errors', () => {
    const component = shallow(<PackagePrint />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  describe('mounted', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      application: {
        Settings: {},
      },
    })

    const testProps = {
      formSections: [
        { key: 'IDENTIFICATION' },
        { key: 'HISTORY' },
        { key: 'RELATIONSHIPS' },
      ],
    }

    const component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <PackagePrint {...testProps} />
        </Provider>
      </MemoryRouter>
    )

    it('renders form sections for print', () => {
      expect(component.find('.section-print-container').length).toBe(3)
    })

    it('launches the print dialog', () => {
      window.print = jest.fn()
      component.find('.print-btn').simulate('click')
      expect(window.print).toHaveBeenCalled()
    })
  })
})
