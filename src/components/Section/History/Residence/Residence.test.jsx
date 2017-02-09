import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Residence from './Residence'

describe('The Residence component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('no error on empty', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'residence',
      List: []
    }
    const component = mount(<Provider store={store}><Residence {...expected} /></Provider>)
    expect(component.find('.residence').length).toEqual(1)
    expect(component.find('.item').length).toEqual(1)
    expect(component.find('.reference').length).toEqual(0)
  })

  it('displays character reference within 3 years', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Dates: {
              to: new Date()
            },
            Reference: {
              Email: 'test@abc.com'
            }
          }
        }
      ]
    }
    const component = mount(<Provider store={store}><Residence {...expected} /></Provider>)
    expect(component.find('.reference').length).toEqual(1)
  })

  it('displays text box when other is selected', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Role: 'Other'
          }
        }
      ]
    }
    const component = mount(<Provider store={store}><Residence {...expected} /></Provider>)
    expect(component.find('.role.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'residence',
      List: [
        {
          open: true,
          Residence: {
            Role: 'Dance'
          }
        }
      ]
    }
    const component = mount(<Provider store={store}><Residence {...expected} /></Provider>)
    expect(component.find('.role.hidden').length).toEqual(0)
  })
})
