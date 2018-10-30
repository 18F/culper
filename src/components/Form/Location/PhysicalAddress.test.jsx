import React from 'react'
import { mount } from 'enzyme'
import { PhysicalAddress } from './PhysicalAddress'
import { address } from '../../../config/locales/en/address'

describe('<PhysicalLocation />', () => {
  describe('when a user indicates a foreign address', () => {
    it('renders a Branch component', () => {
      const props = {
        country: '',
        physicalAddress: {
          HasDifferentAddress: '',
          Address: { country: '' }
        }
      }
     
      const component = mount(<PhysicalAddress {...props} />)
      const branch = component.find('Branch')
  
      expect(branch.length).toEqual(1)
      expect(branch.prop('label')).toEqual(address.militaryAddress)
    })

    it('renders an APO/FPO-only component when Branch value is yes', () => {
      const props = {
        country: '',
        physicalAddress: {
          HasDifferentAddress: 'Yes'
        }
      }

      const component = mount(<PhysicalAddress {...props} />)

      expect(component.find('Location').prop('disableToggle')).toEqual(true)
    })

    it('passes the branch value to the branch', () => {
      const props = {
        country: '',
        physicalAddress: {
          HasDifferentAddress: 'No'
        }
      }
      const component = mount(<PhysicalAddress {...props} />)

      expect(component.find('Branch').prop('value')).toEqual(props.physicalAddress.HasDifferentAddress)
    })

    describe('when the user toggles to an APO address', () => {
      it('toggles the secondary APO address form properly', () => {
        const props = {
          country: 'Spain',
          physicalAddress: {
            HasDifferentAddress: ''
          }
        }
        const component = mount(<PhysicalAddress {...props} />)
        component.setProps({ country: 'POSTOFFICE' });

        const location = component.find('Location')

        expect(location.filterWhere(l => l.prop('country').length)).toBe(1)
      })
    })
  })

  it('renders the correct field label', () => {
    const component = mount(<PhysicalAddress physicalAddress={{}} country="POSTOFFICE" />)
    const field = component.find('Field')

    expect(field.length).toEqual(1)
    expect(field.prop('title')).toEqual(address.physicalLocationRequired)
  })

  describe('when the user indicates an APO address', () => {
    it('supplies the correct props to the Location component', () => {
      const props = {
        country: 'POSTOFFICE',
        physicalAddress: {
          Address: {
            country: ''
          }
        }
      }
      const component = mount(<PhysicalAddress {...props} />)
      const location = component.find('Location');

      expect(location.prop('disableToggle')).toEqual(undefined);
      expect(location.prop('geocode')).toEqual(true);
      expect(location.prop('country')).toEqual(props.physicalAddress.Address.country)
    })
  })
})
