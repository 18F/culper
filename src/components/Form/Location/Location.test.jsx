import React from 'react'
import { mount } from 'enzyme'
import Location, { timeout, countryValueResolver, country } from './Location'

describe('The Address component', () => {
  it('Renders without errors', () => {
    const component = mount(<Location />)
    expect(component.find('.location').length).toBe(1)
  })

  it('Renders US Address', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <Location onUpdate={onUpdate} layout={Location.US_ADDRESS} />
    )
    component.find('.street input').simulate('change')
    component.find('.street2 input').simulate('change')
    component.find('.city input').simulate('change')
    component
      .find('.state input')
      .simulate('change', { target: { value: 'Virginia' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Renders Country Address', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <Location onUpdate={onUpdate} layout={Location.COUNTRY} country="" />
    )
    component
      .find('.country input')
      .simulate('change', { target: { value: 'Germnay' } })
    expect(updates).toBe(1)
  })

  it('Renders modal with just geocode error', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      country: { value: 'United States' },
      suggestions: true,
      layout: Location.ADDRESS,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: []
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
  })

  it('Renders modal with suggestion and selects it', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      country: { value: 'United States' },
      suggestions: true,
      layout: Location.ADDRESS,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: [
          {
            Address: '123 Some Rd',
            City: 'Arlington',
            State: 'VA',
            Zipcode: '22201'
          }
        ]
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
    component
      .find('.suggestion-btn')
      .first()
      .simulate('click')
    expect(component.find('.suggestions.modal-content').length).toBe(0)
  })

  it('Renders modal with suggestion but selects to use current address', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      suggestions: true,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: [
          {
            Address: '123 Some Rd',
            City: 'Arlington',
            State: 'VA',
            Zipcode: '22201'
          }
        ]
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
    component
      .find('.dismiss a')
      .first()
      .simulate('click')
    expect(component.find('.suggestions.modal-content').length).toBe(0)
  })

  it('renders all the things', () => {
    const tests = [
      {
        props: {
          layout: Location.BIRTHPLACE,
          country: { value: 'United States' }
        },
        selectors: ['.state', '.city', '.county']
      },
      {
        props: {
          layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY_COUNTRY,
          country: { value: 'United States' }
        },
        selectors: ['.state', '.city']
      },
      {
        props: {
          layout: Location.BIRTHPLACE_WITHOUT_COUNTY,
          country: { value: 'United States' }
        },
        selectors: ['.state', '.city']
      },
      {
        props: {
          layout: Location.US_CITY_STATE_INTERNATIONAL_CITY_COUNTRY,
          country: { value: 'United States' }
        },
        selectors: ['.state', '.city']
      },
      {
        props: {
          layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY,
          country: { value: 'United States' }
        },
        selectors: ['.city', '.state', '.zipcode']
      },
      {
        props: {
          layout: Location.ADDRESS,
          country: { value: 'United States' }
        },
        selectors: ['.street', '.street2', '.city', '.state', '.zipcode']
      },
      {
        props: { layout: Location.STATE },
        selectors: ['.state']
      },
      {
        props: { layout: Location.CITY_STATE },
        selectors: ['.city', '.state']
      },
      {
        props: { layout: Location.STREET_CITY_COUNTRY },
        selectors: ['.street', '.city', '.country']
      },
      {
        props: { layout: Location.CITY_COUNTRY },
        selectors: ['.city', '.country']
      },
      {
        props: { layout: Location.CITY_STATE_COUNTRY },
        selectors: ['.city', '.state', '.country']
      },
      {
        props: { layout: Location.US_ADDRESS },
        selectors: ['.street', '.city', '.state', '.zipcode']
      },
      {
        props: { layout: Location.STREET_CITY },
        selectors: ['.street', '.city']
      },
      {
        props: { layout: Location.COUNTRY },
        selectors: ['.country']
      },
      {
        props: { layout: 'Something New' },
        selectors: ['.location']
      }
    ]

    tests.forEach(test => {
      const component = mount(<Location {...test.props} />)
      test.selectors.forEach(selector => {
        const found = component.find(selector).length > 0
        if (!found) {
          console.log('props:', test.props)
          console.log('selector:', selector)
        }
        expect(found).toBe(true)
      })
    })
  })

  it('renders fields', () => {
    const tests = [
      {
        fields: ['street']
      },
      {
        fields: ['street2']
      },
      {
        fields: ['city']
      },
      {
        fields: ['state']
      },
      {
        fields: ['stateZipcode']
      }
    ]

    tests.forEach(test => {
      const component = mount(<Location />)
      let resolved = component.instance().renderFields(test.fields)
      expect(resolved).not.toEqual(undefined)
    })
  })

  it('can show spinner', () => {
    const props = {
      spinner: true
    }
    const component = mount(<Location {...props} />)
    expect(component.find('.spinner').length).toBe(1)
  })

  it('can show suggestions', () => {
    const props = {
      suggestions: true,
      geocodeResult: { Error: null, Suggestions: [{}] }
    }
    const component = mount(<Location {...props} />)
    expect(component.find('.suggestions').length).toBe(1)
  })

  it('can set timeout function', () => {
    let called = false
    const w = {
      setTimeout: (fn, ms) => {
        called = true
      }
    }
    timeout(null, 0, w)
    expect(called).toBe(true)
  })

  it('timeout does nothing if window does not exist', () => {
    let called = false
    const w = null
    timeout(null, 0, w)
    expect(called).toBe(false)
  })

  it('can handle various country inputs', () => {
    const tests = [
      {
        props: {
          country: {
            value: ['Germany'],
            comments: 'My comment'
          }
        },
        expect: {
          value: ['Germany'],
          comments: 'My comment'
        }
      },
      {
        props: {
          country: 'Germany',
          countryComments: 'My comment'
        },
        expect: {
          value: ['Germany'],
          comments: 'My comment'
        }
      },
      {
        props: {
          country: ''
        },
        expect: {
          value: [],
          comments: ''
        }
      }
    ]

    tests.forEach(test => {
      expect(countryValueResolver(test.props)).toEqual(test.expect)
    })
  })

  it('can process extracting country', () => {
    const tests = [
      {
        data: {
          value: 'United States'
        },
        expect: 'United States'
      },
      {
        data: null,
        expect: null
      },
      {
        data: 'United States',
        expect: 'United States'
      }
    ]

    tests.forEach(test => {
      expect(country(test.data)).toEqual(test.expect)
    })
  })

  it('can append to address book', () => {
    const tests = [
      {
        data: {
          books: [],
          name: 'default',
          address: {
            street: '123 Some Rd',
            country: {
              value: 'United States'
            },
            layout: Location.US_ADDRESS,
            validated: false
          }
        },
        expect: []
      },
      {
        data: {
          books: [],
          name: 'default',
          address: {
            street: '123 Some Rd',
            country: {
              value: 'United States'
            },
            layout: Location.US_ADDRESS,
            validated: true
          }
        },
        expect: []
      },
      {
        data: {
          books: [],
          name: 'default',
          address: {
            street: '123 Some Rd',
            country: {
              value: 'United States'
            },
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.US_ADDRESS,
            validated: true
          }
        },
        expect: [
          {
            city: 'Arlington',
            country: { value: 'United States' },
            layout: 'US Address',
            state: 'VA',
            street: '123 Some Rd',
            validated: true,
            zipcode: '22202'
          }
        ]
      },
      {
        data: {
          books: [],
          name: 'default',
          address: {
            country: {
              value: 'United States'
            },
            layout: Location.US_ADDRESS,
            validated: true
          }
        },
        expect: []
      },
      {
        data: {
          books: [],
          name: 'default',
          address: {
            street: '123 Some Rd',
            country: {
              value: 'Germany'
            },
            layout: Location.ADDRESS,
            validated: true
          }
        },
        expect: []
      },
      {
        data: {
          books: [],
          name: 'default',
          address: {
            street: '123 Some Rd',
            country: {
              value: 'Germany'
            },
            city: 'Munich',
            layout: Location.ADDRESS,
            validated: true
          }
        },
        expect: [
          {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: 'Address',
            street: '123 Some Rd',
            validated: true
          }
        ]
      },
      {
        data: {
          books: [
            {
              uid: 'abc-123'
            }
          ],
          name: 'default',
          address: {
            uid: 'abc-123',
            street: '123 Some Rd',
            city: 'Munich',
            country: {
              value: 'Germany'
            },
            layout: Location.ADDRESS,
            validated: true
          }
        },
        expect: []
      }
    ]

    tests.forEach(test => {
      const loc = mount(<Location />)
      const book = loc
        .instance()
        .appendToAddressBook(test.data.books, test.data.name, test.data.address)
      expect(book).toEqual(test.expect)
    })
  })
})
