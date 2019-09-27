import React from 'react'
import { shallow } from 'enzyme'

import { Form } from './Form'

describe('The Form view component', () => {
  const mockHistory = { push: () => {} }

  it('renders without errors', () => {
    const component = shallow(<Form params={{}} history={mockHistory} />)

    expect(component.exists()).toBe(true)
  })

  describe('if there is no section param', () => {
    it('renders nothing', () => {
      const component = shallow(<Form params={{}} history={mockHistory} />)
      expect(component.children().length).toBe(0)
    })
  })

  describe('if there is a section param', () => {
    const testParams = { section: 'testsection', subsection: 'testsubsection' }
    const component = shallow(<Form params={testParams} history={mockHistory} />)
    const section = component.find('Section')

    it('renders the form container', () => {
      expect(component.find('#eapp-form').length).toBe(1)
    })

    it('renders the Section component', () => {
      expect(section.exists()).toBe(true)
    })

    it('passes the section and subsection params into the Section component', () => {
      expect(section.prop('section')).toEqual('testsection')
      expect(section.prop('subsection')).toEqual('testsubsection')
    })

    it('renders the connected SavedIndicator component', () => {
      expect(component.find('Connect(SavedIndicator)').exists()).toBe(true)
    })

    it('does not render the timeout warning', () => {
      expect(component.find('TimoutWarning').exists()).toBe(false)
    })

    describe('with the showSessionWarning prop', () => {
      const sessionWarningComponent = shallow(
        <Form params={testParams} history={mockHistory} showSessionWarning={true} />
      )

      it('renders the connected timeout warning', () => {
        expect(sessionWarningComponent.find('Connect(TimeoutWarning)').exists()).toBe(true)
      })
    })
  })
})
