import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import CivilUnion from './CivilUnion'

const mountComponent = (mockStore, Component, props) => {
  const store = mockStore({ application: { AddressBooks: {} }})

  return mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
}


describe('<CivilUnion />', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = shallow(<CivilUnion {...expected} />)
    expect(component.find('.civil-union').length).toEqual(1)
  })

  xit('updates values', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      Separated: { value: 'Yes' },
      Divorced: { value: 'Yes' },
      BirthPlace: { country: { value: 'Germany' } },
      AddressSeparated: { country: { value: 'United States' } },
      ForeignBornDocument: { DocumentType: { value: 'Other' } },
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.civil-union').length).toEqual(1)
    updates = 0
    component.find('.civil .name .first input').simulate('change')
    component
      .find('.birthdate .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.birthplace .city input').simulate('change')
    component
      .find('.foreign-born-documents input')
      .first()
      .simulate('change')
    component.find('.foreign-born-documents .other input').simulate('change')
    component.find('.foreign-born-documents textarea').simulate('change')
    component.find('.foreign-born-document-number input').simulate('change')
    component
      .find('.foreign-born-documents .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.ssn .first input').simulate('change')
    component.find('.othername .no input').simulate('change')
    component
      .find('.entered .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.civilunion-location .yes input').simulate('change')
    component.find('.address .mailing input').simulate('change')
    component.find('.email input').simulate('change')
    component.find('.separated .yes input').simulate('change')
    component.find('.divorced .yes input').simulate('change')
    component
      .find('.dateseparated .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.address-separated .city input').simulate('change')
    component
      .find('.address-separated input[name="AddressSeparatedNotApplicable"]')
      .simulate('change')
    expect(updates).toBe(19)
  })

  it('renders current address', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      currentAddress: {
        address: '123 Some Rd',
        city: 'Arlington',
        state: 'VA',
        country: 'United States'
      }
    }

    const component = mountComponent(configureMockStore(), CivilUnion, expected)
    expect(component.find('.current-address.button').length).toEqual(1)
    component.find('.current-address.button input').simulate('change')
    component.find('.current-address.button input').simulate('change')
    expect(
      component.find('.current-address.button label.checked').length
    ).toEqual(0)
  })

  describe('with foreign-born spouse', () => {
    const foreignBornDocumentEl = '.foreign-born-documents'
    const component = mountComponent(configureMockStore(), CivilUnion, {})

    it('does not ask for foreign-born documentation in default state', () => {
      const emptyExpected = {
        BirthPlace: {}
      }
      
      component.setProps(emptyExpected)
      expect(component.find(foreignBornDocumentEl).length).toEqual(0)

      component.setProps({ BirthPlace: undefined })
      expect(component.find(foreignBornDocumentEl).length).toEqual(0)
    })

    it('does not ask for foreign born documentation if from the United States', () => {
      const usExpected = {
        BirthPlace: { country: 'United States' }
      }
      const altUSExpected = {
        BirthPlace: { country: { value: 'United States' } }
      }

      component.setProps(usExpected)
      expect(component.find(foreignBornDocumentEl).length).toEqual(0)

      component.setProps(altUSExpected)
      expect(component.find(foreignBornDocumentEl).length).toEqual(0)
    })
  
    it('asks for foreign born documentation if not from the United States', () => {
      const objectExpected = {
        BirthPlace: { country: { value: ['Canada'] } }
      }
      const civilUnion = mountComponent(configureMockStore(), CivilUnion, objectExpected)

      civilUnion.setProps(objectExpected)
      expect(civilUnion.find(foreignBornDocumentEl).length).toEqual(1)
    })
  })

  describe('when `Use Current Address` is selected', () => {
    it('does not show the location form', () => {
      const mockStore = configureMockStore()
      const props = {
        name: 'civilUnion',
        UseCurrentAddress: { applicable: false },
      }
      let component = mountComponent(mockStore, CivilUnion, props)
      let locations = component.find('NotApplicable')
        .find('Location')

      expect(locations.find({name: 'Address'}).length).toBe(0)

      component = mountComponent(mockStore, CivilUnion, {
        name: 'civilUnion', UseCurrentAddress: { applicable: true}
      })

      locations = component.find('NotApplicable').find('Location')
      expect(locations.length).toBe(1)
    })

    it('does not show the alternate address form', () => {
      const mockStore = configureMockStore()
      const props = {
        name: 'civilUnion',
        UseCurrentAddress: { applicable: true },
      }
      const component = mountComponent(mockStore, CivilUnion, props)

      expect(component.find('AlternateAddress').length).toBe(0)
    })
  })
})
