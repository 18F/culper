import React from 'react'
import { shallow, mount } from 'enzyme'
import { ContactInformation } from './ContactInformation'

describe('The ContactInformation component', () => {
  it('renders without errors', () => {
    const component = shallow(<ContactInformation />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('displays no error by default', () => {
    const component = mount(<ContactInformation />)
    component.find('.email-home input').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  describe('with phone number data', () => {
    const testProps = {
      PhoneNumbers: {
        items: [
          {
            Item: {
              Telephone: {
                type: 'Domestic',
                number: '2028675309',
                extension: '1234',
              },
            },
          },
          {
            Item: {
              Telephone: {
                type: 'Domestic',
                number: '2028675309',
                extension: '',
              },
            },
          },
          {
            Item: {
              Telephone: {
                type: 'DSN',
                number: '8675309',
              },
            },
          },
          {
            Item: {
              Telephone: {
                type: 'International',
                number: '0011234567890',
                extension: '1234',
              },
            },
          },
          {
            Item: {
              Telephone: {
                type: 'International',
                number: '0011234567890',
                extension: '',
              },
            },
          },
        ],
      },
    }

    const component = mount(<ContactInformation {...testProps} />)

    it('renders each phone number', () => {
      expect(component.find('.index').length).toEqual(5)
    })

    it('formats each phone number appropriately', () => {
      expect(component.find('.summary strong').at(0).text()).toEqual('(202) 867-5309 x1234')
      expect(component.find('.summary strong').at(1).text()).toEqual('(202) 867-5309')
      expect(component.find('.summary strong').at(2).text()).toEqual('867-5309')
      expect(component.find('.summary strong').at(3).text()).toEqual('+001 1234567890 x1234')
      expect(component.find('.summary strong').at(4).text()).toEqual('+001 1234567890')
    })
  })

  describe('with empty items', () => {
    const testProps = {
      shouldFilterEmptyItems: true,
      PhoneNumbers: {
        items: [
          {},
          {
            Item: {
              Telephone: {
                type: 'International',
                number: '0011234567890',
                extension: '',
              },
            },
          },
        ],
      },
    }

    const component = mount(<ContactInformation {...testProps} />)

    it('should filter out empty items', () => {
      expect(component.find('.index').length).toEqual(1)
      expect(component.find('.summary strong').at(0).text()).toEqual('+001 1234567890')
    })
  })
})
