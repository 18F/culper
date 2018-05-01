import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import ReleaseOfGeneralAndMedical from './ReleaseOfGeneralAndMedical'

describe('The ReleaseOfGeneralAndMedical Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const props = {
      Application: {
        Psychological: {
          Competence: { IsIncompetent: 'Yes' },
          Consultation: { Consulted: 'Yes' },
          Diagnoses: { Diagnosed: 'Yes' },
          Hospitalization: { Hospitalized: 'Yes' },
          ExistingConditions: { HasCondition: '' }
        }
      },
      onUpdate: () => { updates++ }
    }
    const component = mount(<MemoryRouter><ReleaseOfGeneralAndMedical {...props} /></MemoryRouter>)
    expect(component.find('.general-release').length).toBe(1)
    expect(component.find('.medical-release').length).toBe(1)
    component.find('.general-release .signature button').simulate('click')
    component.find('.medical-release .signature button').simulate('click')
    expect(updates).toBe(2)
  })

  it('does not display HIPPA release if no medical history', () => {
    const props = {
      Application: {
        Psychological: {
          Competence: { IsIncompetent: 'No' },
          Consultation: { Consulted: 'No' },
          Diagnoses: { Diagnosed: 'No' },
          Hospitalization: { Hospitalized: 'No' },
          ExistingConditions: { HasCondition: 'No' }
        }
      }
    }
    const component = mount(<MemoryRouter><ReleaseOfGeneralAndMedical {...props} /></MemoryRouter>)
    expect(component.find('.medical-release').length).toBe(0)
  })

  it('handles defaults', () => {
    expect(ReleaseOfGeneralAndMedical.defaultProps.dispatch()).toEqual(undefined)
    expect(ReleaseOfGeneralAndMedical.defaultProps.onUpdate()).toEqual(undefined)
    expect(ReleaseOfGeneralAndMedical.defaultProps.onError(null, [])).toEqual([])
  })
})
