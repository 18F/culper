import { validateModel } from 'models/validate'
import financialGambling from '../financialGambling'

describe('The financial gambling model', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Dates.presence.REQUIRED',
      'Losses.presence.REQUIRED',
      'Description.presence.REQUIRED',
      'Actions.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialGambling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('From date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Dates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, financialGambling, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('To date cannot be in the future', () => {
    const testData = {
      Dates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, financialGambling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('losses only accepts numbers', () => {
    const testData = {
      Losses: {
        value: 'Invalid',
      },
    }

    const expectedErrors = [
      'Losses.hasValue.value.numericality.INVALID_NUMBER',
    ]

    expect(validateModel(testData, financialGambling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
