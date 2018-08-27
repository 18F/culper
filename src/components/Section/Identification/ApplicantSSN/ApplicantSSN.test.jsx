import React from 'react'
import { mount } from 'enzyme'
import ApplicantSSN from './ApplicantSSN'

describe('The applicant SSN component', () => {
  it('asks for one SSN initially', () => {
    const props = {}
    const component = mount(<ApplicantSSN {...props} />)
    expect(component.find('.applicant-ssn-initial').length).toBe(1)
    expect(component.find('.applicant-ssn-verification').length).toBe(0)
  })

  it('asks for verification', () => {
    const props = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234'
      },
      verified: false
    }
    const component = mount(<ApplicantSSN {...props} />)
    expect(component.find('.applicant-ssn-initial').length).toBe(1)
    expect(component.find('.applicant-ssn-verification').length).toBe(1)
  })

  it('does not ask to be verified if already verified', () => {
    const props = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234'
      },
      verified: true
    }
    const component = mount(<ApplicantSSN {...props} />)
    expect(component.find('.applicant-ssn-initial').length).toBe(1)
    expect(component.find('.applicant-ssn-verification').length).toBe(0)
  })

  it('modifying initial SSN during verification makes things dirty', () => {
    let dirty = false
    const props = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234'
      },
      verified: true,
      onUpdate: queue => {
        dirty = !queue.verified
      }
    }
    const component = mount(<ApplicantSSN {...props} />)
    expect(component.find('.applicant-ssn-initial').length).toBe(1)
    expect(component.find('.applicant-ssn-verification').length).toBe(0)
    component.find('.applicant-ssn-initial .first input').simulate('change')
    expect(dirty).toBe(true)
  })

  it('handles updates', () => {
    let updated = false
    const props = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234'
      },
      verified: false,
      onUpdate: queue => {
        updated = true
      }
    }
    const component = mount(<ApplicantSSN {...props} />)
    component
      .find('.applicant-ssn-verification .first input')
      .simulate('change')
    component.find('.applicant-ssn-initial .first input').simulate('change')
    expect(updated).toBe(true)
  })
})
