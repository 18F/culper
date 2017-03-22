import React from 'react'
import { mount } from 'enzyme'
import { EducationItem } from './Education'

describe('The education component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'education'
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.education').length).toEqual(1)
    expect(component.find('.school-name').length).toEqual(1)
  })

  it('should ask if they attended school in last 10 years', () => {
    const expected = {
      name: 'education'
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.education').length).toEqual(1)
    expect(component.find('.school-name').length).toEqual(1)
  })

  it('should ask for a reference if within the last 3 years', () => {
    const expected = {
      name: 'education',
      Dates: {
        from: new Date(),
        to: new Date()
      }
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.reference').length).toEqual(1)
  })

  it('should ask for diplomas/degrees if we say "yes"', () => {
    const expected = {
      name: 'education',
      Diplomas: [
        {
          Has: 'Yes',
          Diploma: { }
        }
      ]
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.diploma').length).toEqual(1)
  })

  it('should not ask for diplomas/degrees if we say "no"', () => {
    const expected = {
      name: 'education',
      HasAttended: 'Yes',
      HasDegree: 'No'
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.diploma').length).toEqual(0)
  })
})
