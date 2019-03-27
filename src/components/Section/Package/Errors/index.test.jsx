import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import { PackageErrors } from './index'

import FormStatus from '../FormStatus'
import InvalidSection from '../InvalidSection'

describe('The PackageErrors component', () => {
  describe('with default props', () => {
    const component = mount(<PackageErrors />)

    it('renders without errors', () => {
      expect(component.exists()).toBe(true)
    })

    it('renders the FormStatus component', () => {
      const formStatus = component.find(FormStatus)
      expect(formStatus.length).toBe(1)
      expect(formStatus.prop('isValid')).toBe(false)
      expect(formStatus.prop('isTransitioning')).toBe(false)
    })
  })

  describe('with invalid sections', () => {
    const testProps = {
      formSections: [
        { key: '0', subsections: [{ key: '0.0', isValid: true }] },
        { key: '1', subsections: [{ key: '1.0', isValid: true }, { key: '1.1', isValid: false }] },
        { key: '2', subsections: [{ key: '2.0', isValid: false }] },
        { key: '3', subsections: [{ key: '3.0', subsections: [{ key: '3.0.0', isValid: true }] }] },
        { key: '4', subsections: [{ key: '4.0', subsections: [{ key: '4.0.0', isValid: false }] }] },
      ],
    }

    const component = mount(
      <MemoryRouter>
        <PackageErrors {...testProps} />
      </MemoryRouter>
    )

    it('renders the InvalidSection component for each invalid section', () => {
      expect(component.find(InvalidSection).length).toBe(3)
    })
  })
})
