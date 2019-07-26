import { validateModel } from 'models/validate'
import violence from '../violence'

describe('The violence model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Organization.presence.REQUIRED',
      'Address.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'Positions.presence.REQUIRED',
      'Contributions.presence.REQUIRED',
      'Reasons.presence.REQUIRED',
    ]

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Organization must have a value', () => {
    const testData = {
      Organization: 'test organization',
    }
    const expectedErrors = ['Organization.hasValue.MISSING_VALUE']

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid address', () => {
    const testData = {
      Address: '123 Main St',
    }
    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 12345,
    }
    const expectedErrors = [
      'Dates.daterange.from.presence.REQUIRED',
      'Dates.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Positions must have a value', () => {
    const testData = {
      Positions: 'test',
    }
    const expectedErrors = ['Positions.hasValue.MISSING_VALUE']

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Contributions must have a value', () => {
    const testData = {
      Contributions: 'test',
    }
    const expectedErrors = ['Contributions.hasValue.MISSING_VALUE']

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reasons must have a value', () => {
    const testData = {
      Reasons: 'test',
    }
    const expectedErrors = ['Reasons.hasValue.MISSING_VALUE']

    expect(validateModel(testData, violence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Positions is not applicable', () => {
    it('Positions is not required', () => {
      const testData = {
        PositionsNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Positions.presence.REQUIRED']

      expect(validateModel(testData, violence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid violence', () => {
      const testData = {
        Organization: { value: 'Test Organization' },
        Dates: {
          from: { month: 9, day: 10, year: 1990 },
          to: { month: 10, day: 12, year: 1995 },
        },
        PositionsNotApplicable: { applicable: false },
        Address: {
          street: '123 Main St',
          zipcode: '10002',
          city: 'New York',
          state: 'NY',
          country: 'United States',
        },
        Contributions: { value: '100' },
        Reasons: { value: 'Because' },
      }

      expect(validateModel(testData, violence)).toEqual(true)
    })
  })

  describe('if Contributions is not applicable', () => {
    it('Contributions is not required', () => {
      const testData = {
        ContributionsNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Contributions.presence.REQUIRED']

      expect(validateModel(testData, violence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid violence', () => {
      const testData = {
        Organization: { value: 'Test Organization' },
        Dates: {
          from: { month: 9, day: 10, year: 1990 },
          to: { month: 10, day: 12, year: 1995 },
        },
        ContributionsNotApplicable: { applicable: false },
        Address: {
          street: '123 Main St',
          zipcode: '10002',
          city: 'New York',
          state: 'NY',
          country: 'United States',
        },
        Positions: { value: 'Test' },
        Reasons: { value: 'Because' },
      }

      expect(validateModel(testData, violence)).toEqual(true)
    })
  })

  it('passes a valid violence', () => {
    const testData = {
      Organization: { value: 'Test Organization' },
      Dates: {
        from: { month: 9, day: 10, year: 1990 },
        to: { month: 10, day: 12, year: 1995 },
      },
      Positions: { value: 'Test' },
      Address: {
        street: '123 Main St',
        zipcode: '10002',
        city: 'New York',
        state: 'NY',
        country: 'United States',
      },
      Contributions: { value: '100' },
      Reasons: { value: 'Because' },
    }

    expect(validateModel(testData, violence)).toEqual(true)
  })
})
