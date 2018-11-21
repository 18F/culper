import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import EducationItem from './EducationItem'

describe('The education component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <EducationItem {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'education'
    }
    const component = createComponent(expected)
    expect(component.find('.education').length).toEqual(1)
    expect(component.find('.school-name').length).toEqual(1)
  })

  it('should ask if they attended school in last 10 years', () => {
    const expected = {
      name: 'education'
    }
    const component = createComponent(expected)
    expect(component.find('.education').length).toEqual(1)
    expect(component.find('.school-name').length).toEqual(1)
  })

  it('should ask for a reference if within the last 3 years', () => {
    const expected = {
      name: 'education',
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2015'
        },
        to: {
          month: `${new Date().getMonth()}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        }
      }
    }
    const component = createComponent(expected)
    expect(component.find('.reference').length).toEqual(1)
  })

  it('should ask for diplomas/degrees if we say "yes"', () => {
    const expected = {
      name: 'education',
      Diplomas: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Diploma: 'Other',
              DiplomaOther: 'PhD in awesomeness',
              Date: {
                date: new Date()
              }
            }
          },
          {
            Item: {
              Has: { value: 'Yes' },
              Diploma: 'High School Diploma',
              DiplomaOther: '',
              Date: {}
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    expect(component.find('.diploma').length).toEqual(2)
  })

  it('should not ask for diplomas/degrees if we say "no"', () => {
    const expected = {
      name: 'education',
      HasAttended: { value: 'Yes' },
      HasDegree: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.diploma').length).toEqual(0)
  })

  it('can trigger updates', () => {
    let updates = 0
    const today = new Date()
    const expected = {
      name: 'education',
      HasAttended: { value: 'Yes' },
      HasDegree: { value: 'Yes' },
      Diplomas: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Diploma: { value: 'Other' }
            }
          }
        ]
      },
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2010',
          present: false,
          date: new Date('1/1/2010')
        },
        to: {
          month: `${today.getMonth() + 1}`,
          day: `${today.getDate()}`,
          year: `${today.getFullYear()}`,
          present: true,
          date: today
        }
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.school-name input')
      .simulate('change', { target: { name: 'Name', value: 'some text' } })
    component
      .find('.daterange .from .month input')
      .simulate('change', { target: { name: 'month', value: '0' } })
    component
      .find('.mailing input')
      .first()
      .simulate('change', { target: { name: 'address', value: '123 Some Rd' } })
    component
      .find('.type input')
      .first()
      .simulate('change')
    component
      .find('.name .first input')
      .first()
      .simulate('change', { target: { name: 'first', value: 'John' } })
    component
      .find('.branch .yes input')
      .first()
      .simulate('change')
    component.find('.diploma-other input').simulate('change')
    component
      .find('.other input')
      .at(0)
      .simulate('change', { target: { name: 'DiplomaOther', value: 'Other' } })
    expect(updates).toEqual(8)
  })
})
