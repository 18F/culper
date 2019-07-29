import { validateModel } from 'models/validate'
import militaryForeign, { foreignMilitaryContact } from '../militaryForeign'

describe('The foreign military model', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Organization.presence.REQUIRED',
      'Name.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'Country.presence.REQUIRED',
      'Rank.presence.REQUIRED',
      'Division.presence.REQUIRED',
      'Circumstances.presence.REQUIRED',
      'ReasonLeft.presence.REQUIRED',
    ]

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Organization requires a valid value', () => {
    const testData = {
      Organization: { value: 'TestInvalidValue' },
    }

    const expectedErrors = ['Organization.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country requires a valid value', () => {
    const testData = {
      Country: { value: 'TestInvalidValue' },
    }

    const expectedErrors = ['Country.country.INVALID_COUNTRY']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires MaintainsContact branch filled if SF86', () => {
    const testData = {}
    const options = { requireForeignMilitaryMaintainsContact: true }
    const expectedErrors = ['MaintainsContact.presence.REQUIRED']

    expect(validateModel(testData, militaryForeign, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not require MaintainsContact branch filled if SF85', () => {
    const testData = {}
    const options = { requireForeignMilitaryMaintainsContact: false }
    const expectedErrors = ['MaintainsContact.presence.REQUIRED']

    expect(validateModel(testData, militaryForeign, options))
      .toEqual(expect.not.arrayContaining(expectedErrors))
  })

  it('requires a valid list of contacts if MaintainsContact', () => {
    const testData = { MaintainsContact: { value: 'Yes' } }
    const expectedErrors = ['List.presence.REQUIRED']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Dates includes present', () => {
    it('ReasonLeft is not required', () => {
      const testData = {
        Dates: { present: true },
      }
      const expectedErrors = [
        'ReasonLeft.presence.REQUIRED',
      ]

      expect(validateModel(testData, militaryForeign))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Dates does not include present', () => {
    it('ReasonLeft is required', () => {
      const testData = {
        Dates: {
          from: { day: 3, month: 5, year: 2000 },
          to: { day: 5, month: 10, year: 2005 },
        },
      }
      const expectedErrors = [
        'ReasonLeft.presence.REQUIRED',
      ]

      expect(validateModel(testData, militaryForeign))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('passes a valid foreignMilitary', () => {
    const testData = {
      Organization: { value: 'Diplomatic' },
      Name: { value: 'test name' },
      Dates: {
        from: { month: 10, day: 9, year: 2000 },
        to: { month: 11, day: 10, year: 2005 },
      },
      Country: { value: 'United States' },
      Rank: { value: 'test rank' },
      Division: { value: 'test division' },
      Circumstances: { value: 'testing' },
      ReasonLeft: { value: 'because I was done' },
    }

    expect(validateModel(testData, militaryForeign)).toEqual(true)
  })
})

describe('The foreign military contact model', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'Address.presence.REQUIRED',
      'Title.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'Frequency.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignMilitaryContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
