import IdentificationContactInformationValidator from './identificationcontacts'

describe('Contact Information validation', function () {
  it('should validate emails', function () {
    const tests = [
      {
        state: {
          Emails: {
            items: [
              {
                Item: {
                  value: 'foobar@local.dev'
                }
              },
              {
                Item: {
                  value: 'foobar@local.dev'
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Emails: []
        },
        expected: false
      },
      {
        state: {
          Emails: {
            items: [
              {
                Item: {
                  value: 'foobar@local.dev'
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Emails: {
            items: [
              {
                Item: null
              },
              {
                Item: {
                  value: 'foobar@local.dev'
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationContactInformationValidator(test.state, null).validEmails()).toBe(test.expected)
    })
  })

  it('should validate phone numbers', function () {
    const tests = [
      {
        state: {
          PhoneNumbers: {
            items: [
              {
                Item: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                }
              },
              {
                Item: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          PhoneNumbers: {
            items: [
              {
                Item: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          PhoneNumbers: {
            items: [
              {
                Item: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                }
              },
              {
                Telephone: null
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          PhoneNumbers: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationContactInformationValidator(test.state, null).validPhoneNumbers()).toBe(test.expected)
    })
  })

  it('should validate contact information', function () {
    const tests = [
      {
        state: {
          Emails: {
            items: [
              {
                Item: {
                  value: 'foobar2@local.dev'
                }
              },
              {
                Item: {
                  value: 'foobar2@local.dev'
                }
              }
            ]
          },
          PhoneNumbers: {
            items: [
              {
                Item: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                }
              },
              {
                Item: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationContactInformationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
