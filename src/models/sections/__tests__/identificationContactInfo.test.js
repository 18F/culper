// TODO
import { validateModel } from 'models/validate'
import identificationContactInfo from 'models/sections/identificationContactInfo'

describe('The identificationContactInfo section', () => {
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

    const expectedErrors = [
      'HomeEmail.presence.REQUIRED',
      'WorkEmail.presence.REQUIRED',
    ]

    expect(validateModel(testData, identificationContactInfo))
      .toEqual(expect.arrayContaining(expectedErrors))
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

    const expectedErrors = [
      'WorkEmail.presence.REQUIRED',
    ]

    expect(validateModel(testData, identificationContactInfo))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not allow more than one of the same phone number type', () => {
    const testData = {
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
    }

    const expectedErrors = ['PhoneNumbers.accordion.DUPLICATE_PHONE_NUMBER_TYPES']

    expect(validateModel(testData, identificationContactInfo))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes valid contact info', () => {
    const testData = {
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
    }

    expect(validateModel(testData, identificationContactInfo)).toEqual(true)
  })
})
