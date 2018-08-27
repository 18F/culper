import React from 'react'
import { mount } from 'enzyme'
import InvestigatingAgency from './InvestigatingAgency'

describe('The investigating agency component', () => {
  it('renders without errors', () => {
    const component = mount(<InvestigatingAgency />)
    expect(component.find('.investigative-agency').length).toBe(1)
  })

  it('captures agency', () => {
    let agency = { value: '' }
    const onUpdate = values => {
      agency = values.Agency
    }
    const component = mount(
      <InvestigatingAgency Agency={agency} onUpdate={onUpdate} />
    )
    component.find('.investigative-agency-dhs input').simulate('change')
    expect(agency.value).toBe('U.S. Department of Homeland Security')
  })

  it('requires explanation if "other" is selected', () => {
    let agency = { value: 'Other' }
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <InvestigatingAgency Agency={agency} onUpdate={onUpdate} />
    )
    expect(
      component.find('.legal-investigations-history-agency-explanation').length
    ).toBe(1)
    component
      .find('.legal-investigations-history-agency-explanation textarea')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('requires explanation if "foreign" is selected', () => {
    const agency = { value: 'Foreign government' }
    const component = mount(<InvestigatingAgency Agency={agency} />)
    expect(
      component.find('.legal-investigations-history-agency-explanation').length
    ).toBe(1)
  })

  it('requires explanation if "treasury" is selected', () => {
    const agency = { value: 'U.S. Department of Treasury' }
    const component = mount(<InvestigatingAgency Agency={agency} />)
    expect(
      component.find('.legal-investigations-history-agency-explanation').length
    ).toBe(1)
  })
})
