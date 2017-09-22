import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Location from '../../../components/Form/Location'
import Verify from './Verify'

describe('The verify component', () => {
  it('displays name', () => {
    const props = {
      identification: {
        ApplicantName: {
          first: 'Bob',
          middle: 'Joe',
          last: 'Smith'
        }
      },
      history: {}
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-name .component span.title-case').text()).toBe('Bob Joe Smith')
  })

  it('displays other names used', () => {
    const props = {
      identification: {
        OtherNames: {
          List: [
            {
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                lastInitialOnly: false,
                suffix: 'Jr'
              },
              MaidenName: {
                value: 'Foo'
              },
              DatesUsed: {
                from: new Date('1/1/2015'),
                to: new Date('1/1/2016'),
                present: false
              }
            }
          ]
        }
      },
      history: {}
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-aliases .component span.title-case').text()).toBe('Foo J Bar Jr')
  })

  it('displays date of birth with day', () => {
    const props = {
      identification: {
        ApplicantBirthDate: {
          date: new Date('1/1/1982')
        }
      },
      history: {}
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-dob .component > span').text()).toBe('1/1/1982')
  })

  it('displays social security number', () => {
    const props = {
      identification: {
        ApplicantSSN: {
          first: '123',
          middle: '45',
          last: '6789'
        }
      },
      history: {}
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-ssn .component > span').text()).toBe('123-45-6789')
  })

  it('displays phone number(s)', () => {
    const props = {
      identification: {
        Contacts: {
          PhoneNumbers: [
            {
              Item: {
                type: 'Domestic',
                number: '2028675309',
                extension: '1234'
              }
            },
            {
              Item: {
                type: 'Domestic',
                number: '1231231234',
                extension: ''
              }
            }
          ]
        }
      },
      history: {}
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-telephone .component span.title-case').at(0).text()).toBe('(202) 867-5309 x1234')
    expect(component.find('.release-telephone .component span.title-case').at(1).text()).toBe('(123) 123-1234')
  })

  it('displays current address', () => {
    const props = {
      identification: {},
      history: {
        Residence: [
          {
            Item: {
              Dates: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              },
              Address: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
                zipcode: '22202',
                layout: Location.ADDRESS
              }
            }
          },
          {
            Item: {
              type: 'Gap',
              Dates: {
                from: {
                  date: new Date('1/1/2012')
                },
                to: {
                  date: new Date('1/1/2015')
                },
                present: false
              }
            }
          },
          {
            Item: {
              Dates: {
                from: {
                  date: new Date('1/1/2015')
                },
                to: {
                  date: new Date()
                },
                present: false
              },
              Address: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'New Orleans',
                state: 'LA',
                zipcode: '22202',
                layout: Location.ADDRESS
              }
            }
          }
        ]
      }
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-current-address .component span.title-case').text()).toBe('1234 some rd, new orleans, LA 22202')
  })

  it('displays text when nothing is found', () => {
    const props = {
      identification: {},
      history: {}
    }
    const component = mount(<MemoryRouter><Verify {...props} /></MemoryRouter>)
    expect(component.find('.release-name .component > span').text()).toBe('Not entered')
    expect(component.find('.release-aliases .component > span').text()).toBe('Not entered')
    expect(component.find('.release-dob .component > span').text()).toBe('Not entered')
    expect(component.find('.release-ssn .component > span').text()).toBe('Not entered')
    expect(component.find('.release-telephone .component > span').text()).toBe('Not entered')
    expect(component.find('.release-current-address .component > span').text()).toBe('Not entered')
  })
})
