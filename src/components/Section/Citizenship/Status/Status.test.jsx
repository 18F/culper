import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { Status } from './Status'

describe('The status component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <Status {...expected} />
      </Provider>
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'status',
    }
    const component = createComponent(expected)
    expect(component.find('.citizenship-status').length).toBe(1)
    expect(component.find('.block').length).toBeGreaterThan(0)
  })

  it('triggers updates for citizen when changing values', () => {
    let updates = 0
    const expected = {
      name: 'status',
      CitizenshipStatus: { value: 'Citizen' },
      AbroadDocumentation: { value: 'Other' },
      BornOnMilitaryInstallation: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component.find('.citizenship-status-citizen input').simulate('change')
    expect(updates).toBe(1)
  })

  it('triggers updates for foreign born when changing values', () => {
    let updates = 0
    const expected = {
      name: 'status',
      CitizenshipStatus: { value: 'ForeignBorn' },
      AbroadDocumentation: { value: 'Other' },
      BornOnMilitaryInstallation: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
    }
    let component = createComponent(expected)
    component.find('.citizenship-abroad-other input').simulate('change')
    component
      .find({ name: 'Explanation' })
      .simulate('change', { target: { value: 'explanation' } })
    expected.AbroadDocumentation.value = 'FS-545'
    component = createComponent(expected)
    component
      .find({ name: 'DocumentNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find('.document-issued .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.place-issued .no input')
      .simulate('change')
    component
      .find('.document-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find({ name: 'CertificateNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find('.certificate-issued .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.certificate-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.born-on-military-installation .yes input')
      .simulate('change')
    component
      .find({ name: 'MilitaryBase' })
      .simulate('change', { target: { value: 'base' } })
    expect(updates).toBe(11)
  })

  it('triggers updates for naturalized when changing values', () => {
    let updates = 0
    const expected = {
      name: 'status',
      CitizenshipStatus: { value: 'Naturalized' },
      HasAlienRegistration: { value: 'Yes' },
      Basis: { value: 'Other' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    updates = 0
    component
      .find('.entry-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.entry-location .city input')
      .simulate('change', { target: { name: 'city', value: 'City name' } })
    component
      .find('.prior-citizenship input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.prior-citizenship input')
      .simulate('keydown', { keyCode: 13, target: { value: 'United States' } })
    component.find('.has-alien-registration .yes input').simulate('change')
    component
      .find({ name: 'AlienRegistrationNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find({ name: 'CertificateNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find({ name: 'CertificateCourtName' })
      .simulate('change', { target: { value: 'court name' } })
    component
      .find('.certificate-court-address .city input')
      .simulate('change', { target: { name: 'city', value: 'City name' } })
    component
      .find('.certificate-issued .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.certificate-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component.find('.citizenship-basis-individual input').simulate('change')
    component
      .find({ name: 'Explanation' })
      .simulate('change', { target: { value: 'explanation' } })
    expect(updates).toBe(12)
  })

  it('triggers updates for derived when changing values', () => {
    let updates = 0
    const expected = {
      name: 'status',
      CitizenshipStatus: { value: 'Derived' },
      Basis: { value: 'Other' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component
      .find({ name: 'AlienRegistrationNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find({ name: 'PermanentResidentCardNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find({ name: 'CertificateNumber' })
      .simulate('change', { target: { value: 'number' } })
    component
      .find('.certificate-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.certificate-issued .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.citizenship-basis-individual input').simulate('change')
    component
      .find({ name: 'Explanation' })
      .simulate('change', { target: { value: 'explanation' } })
    expect(updates).toBe(7)
  })

  it('triggers updates for non-citizen when changing values', () => {
    let updates = 0
    const expected = {
      name: 'status',
      CitizenshipStatus: { value: 'NotCitizen' },
      DocumentType: { value: 'Other' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component
      .find('.residence-status input')
      .simulate('change', { target: { value: 'status' } })
    component
      .find('.entry-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.entry-location .city input')
      .simulate('change', { target: { name: 'city', value: 'City name' } })
    component
      .find('.prior-citizenship input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.prior-citizenship input')
      .simulate('keydown', { keyCode: 13, target: { value: 'United States' } })
    component
      .find('.alien-registration-expiration .day input')
      .simulate('change')
    component
      .find('.alien-registration-number input')
      .simulate('change', { target: { value: 'number' } })
    component
      .find('.document-expiration .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.document-type-other input').simulate('change')
    component
      .find('.citizenship-document-type-explanation textarea')
      .simulate('change', { target: { value: 'explanation' } })
    component
      .find('.document-number input')
      .simulate('change', { target: { value: 'number' } })
    component
      .find('.document-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.document-issued .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    expect(updates).toBe(12)
  })

  describe('derivedAlienRegistrationNumberRequired', () => {
    it('returns false when not required', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        required: false,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedAlienRegistrationNumberRequired()).toBe(false)
    })
    it('returns true when required and other fields not filled', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedAlienRegistrationNumberRequired()).toBe(true)
    })
    it('returns false when required and PermanentResidentCardNumber filled in', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        PermanentResidentCardNumber: { value: '1234' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedAlienRegistrationNumberRequired()).toBe(false)
    })
    it('returns false when required and CertificateNumber filled in', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        CertificateNumber: { value: '1234' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedAlienRegistrationNumberRequired()).toBe(false)
    })
  })

  describe('derivedPermanentResidentCardNumberRequired', () => {
    it('returns false when not required', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        required: false,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedPermanentResidentCardNumberRequired()).toBe(false)
    })
    it('returns true when required and other fields not filled', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedPermanentResidentCardNumberRequired()).toBe(true)
    })
    it('returns false when required and PermanentResidentCardNumber filled in', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        AlienRegistrationNumber: { value: '1234' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedPermanentResidentCardNumberRequired()).toBe(false)
    })
    it('returns false when required and CertificateNumber filled in', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        CertificateNumber: { value: '1234' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedPermanentResidentCardNumberRequired()).toBe(false)
    })
  })

  describe('derivedCertificateNumberRequired', () => {
    it('returns false when not required', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        required: false,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedCertificateNumberRequired()).toBe(false)
    })
    it('returns true when required and other fields not filled', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedCertificateNumberRequired()).toBe(true)
    })
    it('returns false when required and PermanentResidentCardNumber filled in', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        AlienRegistrationNumber: { value: '1234' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedCertificateNumberRequired()).toBe(false)
    })
    it('returns false when required and CertificateNumber filled in', () => {
      const expected = {
        name: 'status',
        CitizenshipStatus: { value: 'Derived' },
        PermanentResidentCardNumber: { value: '1234' },
        required: true,
      }
      const component = shallow(<Status {...expected} />)
      const instance = component.instance()
      expect(instance.derivedCertificateNumberRequired()).toBe(false)
    })
  })
})
