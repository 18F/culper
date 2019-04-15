import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import EducationItem from './EducationItem'

describe('The education component', () => {
  it('renders without errors', () => {
    const component = shallow(
      <EducationItem Dates={{ maxDate: new Date('04/04/2019') }} />
    )

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('renders an education input and school name input', () => {
    const component = shallow(<EducationItem />)

    expect(component.find('.education').length).toEqual(1)
    expect(component.find('.school-name').length).toEqual(1)
  })

  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({
      application: {},
      ...defaultState,
    })

    return mount(
      <Provider store={store}>
        <EducationItem {...props} />
      </Provider>
    )
  }

  it('implements an onUpdate handler', () => {
    const onUpdate = jest.fn()
    const today = new Date()
    const testProps = {
      name: 'education',
      HasAttended: { value: 'Yes' },
      HasDegree: { value: 'Yes' },
      Diplomas: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Diploma: { value: 'Other' },
            },
          },
        ],
      },
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2010',
          present: false,
        },
        to: {
          month: `${today.getMonth() + 1}`,
          day: `${today.getDate()}`,
          year: `${today.getFullYear()}`,
          present: true,
        },
      },
      onUpdate,
    }

    const component = mountComponentWithStore(testProps)

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

    expect(onUpdate.mock.calls.length).toEqual(8)
  })

  describe('default state', () => {
    const component = mountComponentWithStore()

    it('does not ask for a reference', () => {
      expect(component.find('.reference').length).toEqual(0)
    })
  })

  describe('if item is within the last 3 years', () => {
    const testProps = {
      Dates: {
        from: { month: '1', day: '1', year: '2015' },
        to: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`,
        },
      },
    }

    const component = mountComponentWithStore(testProps)

    it('asks for a reference', () => {
      expect(component.find('.reference').length).toEqual(1)
    })
  })

  describe('if answer to diploma is yes', () => {
    const testProps = {
      Diplomas: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Diploma: 'Other',
              DiplomaOther: 'PhD in awesomeness',
              Date: {
                month: `${new Date().getMonth() + 1}`,
                day: `${new Date().getDate()}`,
                year: `${new Date().getFullYear()}`,
              },
            },
          },
          {
            Item: {
              Has: { value: 'Yes' },
              Diploma: 'High School Diploma',
              DiplomaOther: '',
              Date: {},
            },
          },
        ],
      },
    }

    const component = mountComponentWithStore(testProps)

    it('renders a diploma input', () => {
      expect(component.find('.diploma').length).toEqual(2)
    })
  })

  describe('if answer to diploma is no', () => {
    const testProps = {
      HasAttended: { value: 'Yes' },
      HasDegree: { value: 'No' },
    }

    const component = mountComponentWithStore(testProps)

    it('does not render a diploma input', () => {
      expect(component.find('.diploma').length).toEqual(0)
    })
  })
})
