import { validateModel } from 'models/validate'
import identificationContactInfo from 'models/sections/identificationContactInfo'

describe('The identificationContacts model', () => {
  it('requires at least one phone number', () => {
    const testData = {
      PhoneNumbers: { items: [] },
    }

    const expectedErrors = ['PhoneNumbers.accordion']

    expect(validateModel(testData, identificationContactInfo))
      .toEqual(expect.arrayContaining(expectedErrors))
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

    const expectedErrors = ['HomeEmail.required', 'WorkEmail.required']

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

    expect(validateModel(testData, identificationContactInfo)).toEqual(true)
  })

  it('requires phone number type', () => {
    const testData = {
      PhoneNumbers: {
        items: [
          {
            Item: {
              Telephone: {
                noNumber: false,
                number: '7031112222',
                numberType: '',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
            },
          },
          {
            Telephone: {},
          },
        ],
      },
    }

    const expectedErrors = ['PhoneNumbers.accordion']

    expect(validateModel(testData, identificationContactInfo))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('only accepts one of each phone number type', () => {
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

    const expectedErrors = ['PhoneNumbers.accordion']

    expect(validateModel(testData, identificationContactInfo))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid identificationContacts', () => {
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
