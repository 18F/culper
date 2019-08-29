import IdentificationContactInformationValidator, {
  ContactPhoneNumberValidator,
} from './identificationcontacts'

describe('Contact Phone Number Validator', () => {
  it('should validate a single phone number', () => {
    const testData = {
      Telephone: {
        noNumber: false,
        number: '7031112222',
        numberType: 'Home',
        type: 'Domestic',
        timeOfDay: 'Both',
        extension: '',
      },
    }

    expect(new ContactPhoneNumberValidator(testData).isValid()).toBe(true)
  })

  it('should fail an invalid phone number', () => {
    const testData = {
      Telephone: {
        noNumber: false,
        number: '7031112222',
        numberType: '',
        type: 'Domestic',
        timeOfDay: 'Both',
        extension: '',
      },
    }

    expect(new ContactPhoneNumberValidator(testData).isValid()).toBe(false)
  })
})

describe('Contact Information validation', () => {
  it('should validate contact information', () => {
    const tests = [
      {
        state: {
          HomeEmail: {
            value: 'foobar2@local.dev',
          },
          WorkEmail: {
            value: 'foobar2@local.dev',
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
                    extension: '',
                  },
                },
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Work',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: '',
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(
        new IdentificationContactInformationValidator(
          test.state,
          null
        ).isValid()
      ).toBe(test.expected)
    })
  })

  it('requires at least one email address', () => {
    const testData = {
      HomeEmail: {},
      WorkEmail: {},
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
                extension: '',
              },
            },
          },
        ],
      },
    }

    expect(new IdentificationContactInformationValidator(testData).isValid()).toBe(false)
  })

  it('does not require both email addresses', () => {
    const testData = {
      HomeEmail: { value: 'foobar2@local.dev' },
      WorkEmail: {},
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
                extension: '',
              },
            },
          },
        ],
      },
    }

    expect(new IdentificationContactInformationValidator(testData).isValid()).toBe(true)
  })

  it('should validate unique phone types', () => {
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
                    extension: '',
                  },
                },
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: '',
                  },
                },
              },
            ],
          },
        },
        expected: false,
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
                    extension: '',
                  },
                },
              },
              {
                Item: {
                  Telephone: {
                    noNumber: false,
                    number: '7031112222',
                    numberType: 'Work',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: '',
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(
        new IdentificationContactInformationValidator(
          test.state,
          null
        ).validPhoneTypes()
      ).toBe(test.expected)
    })
  })
})
