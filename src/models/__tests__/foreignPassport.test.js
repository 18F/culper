import { validateModel } from 'models/validate'
import foreignPassport from '../foreignPassport'

describe('The foreignPassport model', () => {
  it('Country is required', () => {
    const testData = {}
    const expectedErrors = ['Country.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = { Country: 'invalid' }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Issued is required', () => {
    const testData = {}
    const expectedErrors = ['Issued.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Issued must be a valid date', () => {
    const testData = { Issued: 'May 2 1990' }
    const expectedErrors = [
      'Issued.date.day.presence.REQUIRED',
      'Issued.date.month.presence.REQUIRED',
      'Issued.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Location is required', () => {
    const testData = {}
    const expectedErrors = ['Location.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Location must be a valid location', () => {
    const testData = {
      Location: {
        city: 'Test city',
      },
    }
    const expectedErrors = [
      'Location.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: {
        first: 'Tester',
        last: 'Person',
      },
    }
    const expectedErrors = [
      'Name.model.middle.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Number is required', () => {
    const testData = {}
    const expectedErrors = ['Number.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Number must have a value', () => {
    const testData = { Number: '123' }
    const expectedErrors = ['Number.hasValue.MISSING_VALUE']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Expiration is required', () => {
    const testData = {}
    const expectedErrors = ['Expiration.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Expiration must be a valid date', () => {
    const testData = { Expiration: 'May 2 1990' }
    const expectedErrors = [
      'Expiration.date.day.presence.REQUIRED',
      'Expiration.date.month.presence.REQUIRED',
      'Expiration.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Expiration must be after Issued', () => {
    const testData = {
      Issued: { day: 5, month: 10, year: 2018 },
      Expiration: { day: 5, month: 10, year: 2015 },
    }
    const expectedErrors = ['Expiration.date']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Used is required', () => {
    const testData = {}
    const expectedErrors = ['Used.presence.REQUIRED']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Used must have a valid value', () => {
    const testData = { Used: 'true' }
    const expectedErrors = ['Used.hasValue.MISSING_VALUE']

    expect(validateModel(testData, foreignPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Used is "No"', () => {
    it('Countries are not required', () => {
      const testData = { Used: { value: 'No' } }
      const expectedErrors = ['Countries.presence.REQUIRED']

      expect(validateModel(testData, foreignPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign passport', () => {
      const testData = {
        Country: { value: 'Canada' },
        Issued: { year: 2015, month: 5, day: 2 },
        Location: { city: 'Toronto', country: 'Canada' },
        Name: {
          first: 'Tester',
          noMiddleName: true,
          last: 'Person',
        },
        Number: { value: '123abc345' },
        Expiration: { year: 2025, month: 5, day: 2 },
        Used: { value: 'No' },
      }

      expect(validateModel(testData, foreignPassport)).toEqual(true)
    })
  })

  describe('if Used is "Yes"', () => {
    it('Countries are required', () => {
      const testData = { Used: { value: 'Yes' } }
      const expectedErrors = ['Countries.presence.REQUIRED']

      expect(validateModel(testData, foreignPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Countries must be valid foreign passport travel items', () => {
      const testData = {
        Used: { value: 'Yes' },
        Countries: {
          items: [
            {
              Item: {
                Country: 'invalid',
              },
            },
          ],
        },
      }
      const expectedErrors = [
        'Countries.accordion.0.Country.country.INVALID_COUNTRY',
        'Countries.accordion.0.Dates.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign passport', () => {
      const testData = {
        Country: { value: 'Canada' },
        Issued: { year: 2015, month: 5, day: 2 },
        Location: { city: 'Toronto', country: 'Canada' },
        Name: {
          first: 'Tester',
          noMiddleName: true,
          last: 'Person',
        },
        Number: { value: '123abc345' },
        Expiration: { year: 2025, month: 5, day: 2 },
        Used: { value: 'Yes' },
        Countries: {
          items: [
            {
              Item: {
                Country: { value: 'Germany' },
                Dates: {
                  from: { year: 2017, month: 1, day: 2 },
                  to: { year: 2017, month: 1, day: 20 },
                },
              },
            },
            {
              Item: {
                Country: { value: 'United Kingdom' },
                Dates: {
                  from: { year: 2018, month: 12, day: 2 },
                  to: { year: 2019, month: 1, day: 3 },
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, foreignPassport)).toEqual(true)
    })
  })
})
