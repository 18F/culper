import React from 'react'
import { shallow, mount } from 'enzyme'
import { ApplicantSSN } from './ApplicantSSN'

// give a fake GUID so the field IDs don't differ between snapshots
jest.mock('components/Form/ValidationElement/index')

describe('The ApplicantSSN component', () => {
  it('renders without errors', () => {
    const component = shallow(<ApplicantSSN />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('implements an onUpdate handler', () => {
    let updates = 0
    const testProps = {
      onUpdate: () => {
        updates += 1
      },
    }

    const component = mount(<ApplicantSSN {...testProps} />)
    component.find('.applicant-ssn-initial .first input').simulate('change')
    expect(updates).toBe(1)
  })

  describe('initial state', () => {
    it('asks for only one SSN', () => {
      const component = mount(<ApplicantSSN />)
      expect(component.find('.applicant-ssn-initial').length).toBe(1)
      expect(component.find('.applicant-ssn-verification').length).toBe(0)
    })
  })

  describe('with a value, unverified', () => {
    it('asks for verification', () => {
      const props = {
        ssn: {
          first: '123',
          middle: '12',
          last: '1234',
        },
        verified: false,
      }

      const component = mount(<ApplicantSSN {...props} />)
      expect(component.find('.applicant-ssn-initial').length).toBe(1)
      expect(component.find('.applicant-ssn-verification').length).toBe(1)
    })
  })

  describe('with a value, verified', () => {
    it('does not ask to be verified again', () => {
      const props = {
        ssn: {
          first: '123',
          middle: '12',
          last: '1234',
        },
        verified: true,
      }

      const component = mount(<ApplicantSSN {...props} />)
      expect(component.find('.applicant-ssn-initial').length).toBe(1)
      expect(component.find('.applicant-ssn-verification').length).toBe(0)
    })

    it('sets verified to false if the initial SSN is edited', () => {
      let dirty = false
      const props = {
        ssn: {
          first: '123',
          middle: '12',
          last: '1234',
        },
        verified: true,
        onUpdate: (queue) => {
          dirty = !queue.verified
        },
      }

      const component = mount(<ApplicantSSN {...props} />)
      expect(component.find('.applicant-ssn-initial').length).toBe(1)
      expect(component.find('.applicant-ssn-verification').length).toBe(0)
      component.find('.applicant-ssn-initial .first input').simulate('change')
      expect(dirty).toBe(true)
    })
  })
})
