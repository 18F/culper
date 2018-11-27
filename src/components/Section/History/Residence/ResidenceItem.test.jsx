import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ResidenceItem from './ResidenceItem'

const mountComponent = store => (Component, props) => {
  const finalProps = {
    ...props
  }

  return mount(
    <Provider store={store}>
      <Component {...finalProps} />
    </Provider>
  )
}

describe('The residence component', () => {
  const defaultAppState = {
    application: {
      AddressBooks: {}
    }
  }

  let createComponent

  beforeEach(() => {
    const store = configureMockStore()(defaultAppState)
    createComponent = mountComponent(store)
  })

  it('renders properly', () => {
    const component = createComponent(ResidenceItem)
    expect(component).toBeDefined()
  })

  it('no error on empty', () => {
    const expected = {
      name: 'residence'
    }
    const component = createComponent(ResidenceItem, expected);

    expect(component.find('.residence').length).toEqual(1)
    expect(component.find('.reference').length).toEqual(0)
  })

  it('displays character reference within 3 years', () => {
    const expected = {
      name: 'residence',
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2000'
        },
        to: {
          month: `${new Date().getMonth()}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        }
      },
      ReferenceEmail: {
        value: 'test@abc.com'
      }
    }
    const component = createComponent(ResidenceItem, expected);
    expect(component.find('.reference').length).toEqual(1)
  })

  it('displays text box when other is selected', () => {
    const expected = {
      name: 'residence',
      Role: {
        value: 'Other'
      },
      OtherRole: {}
    }
    const component = createComponent(ResidenceItem, expected);
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const expected = {
      name: 'residence',
      Role: {
        value: 'Dance'
      }
    }
    const component = createComponent(ResidenceItem, expected);
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('performs updates for components', () => {
    const onUpdate = jest.fn()
    const expected = {
      name: 'residence',
      Dates: {
        from: {
          day: '1',
          month: '1',
          year: '2014',
          date: new Date('1/1/2014')
        },
        to: {
          day: '1',
          month: '1',
          year: '2018',
          date: new Date('1/1/2018')
        }
      },
      onUpdate
    }

    const component = createComponent(ResidenceItem, expected);
    component
      .find('.address .street input')
      .first()
      .simulate('change')
    component
      .find('.datecontrol .month input')
      .first()
      .simulate('change')
    component
      .find('.role input')
      .first()
      .simulate('change')
    component.find('.reference-name .first input').simulate('change')
    component.find('.reference-last-contact .month input').simulate('change')
    component.find('.reference-relationship-neighbor input').simulate('change')
    component.find('.reference-email input').simulate('change')
    component
      .find('.reference-address .street input')
      .first()
      .simulate('change')

    expect(onUpdate.mock.calls.length).toBe(8)
  })
})
