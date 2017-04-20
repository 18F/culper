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
        from: {
          date: new Date()
        },
        to: {
          date: new Date()
        }
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
          Diploma: {
            Diploma: 'Other',
            DiplomaOther: 'PhD in awesomeness',
            Date: {
              date: new Date()
            }
          }
        },
        {
          Has: 'Yes',
          Diploma: {
            Diploma: 'High School Diploma',
            DiplomaOther: '',
            Date: {}
          }
        }
      ]
    }
    const component = mount(<EducationItem {...expected} />)
    expect(component.find('.diploma').length).toEqual(2)
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

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'education',
      Dates: {
        from: {
          date: new Date('1/1/2010')
        },
        to: {
          date: new Date()
        }
      },
      onUpdate: () => { updates++ }
    }
    const component = mount(<EducationItem {...expected} />)
    component.find('.school-name input').simulate('change', { target: { name: 'Name', value: 'some text' } })
    component.find('.daterange .from .month input#month').simulate('change', { target: { name: 'month', value: '0' } })
    component.find('.mailing input').first().simulate('change', { target: { name: 'address', value: '123 Some Rd' } })
    component.find('.type input').first().simulate('change')
    component.find('.name .first input').first().simulate('change', { target: { name: 'first', value: 'John' } })
    component.find('.branch .yes input').first().simulate('change')
    component.find({ type: 'radio', name: 'diploma-other' }).simulate('change')
    component.find({ type: 'text', name: 'DiplomaOther' }).simulate('change', { target: { name: 'DiplomaOther', value: 'Other' } })
    expect(updates).toEqual(8)
  })
})
