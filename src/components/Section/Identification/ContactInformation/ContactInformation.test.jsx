import React from 'react'
import { mount } from 'enzyme'
import ContactInformation from './ContactInformation'

describe('The ContactInformation component', () => {
  it('no error on empty', () => {
    let blurs = 0
    const expected = {
      name: 'input-focus',
      Emails: { items: [{}] },
      PhoneNumbers: { items: [{}] },
      onBlur: function(event) {
        blurs++
      }
    }
    const component = mount(<ContactInformation {...expected} />)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    expect(blurs).toEqual(0)
  })

  it('formats phone numbers appropriately', () => {
    const expected = {
      PhoneNumbers: {
        items: [
          {
            Item: {
              Telephone: {
                type: 'Domestic',
                number: '2028675309',
                extension: '1234'
              }
            }
          },
          {
            Item: {
              Telephone: {
                type: 'Domestic',
                number: '2028675309',
                extension: ''
              }
            }
          },
          {
            Item: {
              Telephone: {
                type: 'DSN',
                number: '8675309'
              }
            }
          },
          {
            Item: {
              Telephone: {
                type: 'International',
                number: '0011234567890',
                extension: '1234'
              }
            }
          },
          {
            Item: {
              Telephone: {
                type: 'International',
                number: '0011234567890',
                extension: ''
              }
            }
          }
        ]
      }
    }
    const component = mount(<ContactInformation {...expected} />)
    expect(component.find('.index').length).toEqual(5)
    expect(
      component
        .find('.summary strong')
        .at(0)
        .text()
    ).toEqual('(202) 867-5309 x1234')
    expect(
      component
        .find('.summary strong')
        .at(1)
        .text()
    ).toEqual('(202) 867-5309')
    expect(
      component
        .find('.summary strong')
        .at(2)
        .text()
    ).toEqual('867-5309')
    expect(
      component
        .find('.summary strong')
        .at(3)
        .text()
    ).toEqual('+001 1234567890 x1234')
    expect(
      component
        .find('.summary strong')
        .at(4)
        .text()
    ).toEqual('+001 1234567890')
  })

  it('formats emails appropriately', () => {
    const expected = {
      Emails: {
        items: [
          {
            Item: {
              Email: {
                value: 'test@abc.com'
              }
            }
          },
          {
            Item: {}
          }
        ]
      }
    }
    const component = mount(<ContactInformation {...expected} />)
    expect(component.find('.index').length).toEqual(2)
    expect(
      component
        .find('.summary strong')
        .at(0)
        .text()
    ).toEqual('test@abc.com')
    expect(
      component
        .find('.summary strong')
        .at(1)
        .text()
    ).toEqual('Provide your email address below')
  })

  it('should filter empty items out leaving only the minimum visible', () => {
    let emails = {}
    let phoneNumbers = {}
    const expected = {
      shouldFilterEmptyItems: true,
      Emails: {
        items: [
          {},
          {
            Item: {
              Email: { value: 'test@abc.com' }
            }
          }
        ]
      },
      PhoneNumbers: {
        items: [
          {},
          {
            Item: {
              Telephone: {
                type: 'International',
                number: '0011234567890',
                extension: ''
              }
            }
          }
        ]
      }
    }
    const component = mount(<ContactInformation {...expected} />)
    expect(component.find('.index').length).toEqual(1 + 1)
    expect(
      component
        .find('.summary strong')
        .at(0)
        .text()
    ).toEqual('test@abc.com')
    expect(
      component
        .find('.summary strong')
        .at(1)
        .text()
    ).toEqual('+001 1234567890')
  })
})
