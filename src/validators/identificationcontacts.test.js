import IdentificationContactInformationValidator from './identificationcontacts'

describe('Contact Information validation', function() {
  it('should validate phone numbers', function() {
    const tests = [
      {
        state: {
          PhoneNumbers: {
            items: [
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
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
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
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
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              },
              {
                Telephone: {}
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          PhoneNumbers: { items: [] }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new IdentificationContactInformationValidator(
          test.state,
          null
        ).validPhoneNumbers()
      ).toBe(test.expected)
    })
  })

  it('should validate contact information', function() {
    const tests = [
      {
        state: {
          HomeEmail: {
            value: 'foobar2@local.dev'
          },
          WorkEmail: {
            value: 'foobar2@local.dev'
          },
          PhoneNumbers: {
            items: [
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Work',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new IdentificationContactInformationValidator(
          test.state,
          null
        ).isValid()
      ).toBe(test.expected)
    })
  })

  it('should validate unique phone types', function() {
    const tests = [
      {
        state: {
          PhoneNumbers: {
            items: [
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          PhoneNumbers: {
            items: [
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Work',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new IdentificationContactInformationValidator(
          test.state,
          null
        ).validPhoneTypes()
      ).toBe(test.expected)
    })
  })
})
