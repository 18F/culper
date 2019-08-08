import { validateModel } from 'models/validate'
import identifcationDateOfBirth from 'models/sections/identificationDateOfBirth'

describe('The identification date of birth section', () => {
  it('requires a date of birth', () => {
    const testData = {}
    const expectedErrors = ['Date.presence.REQUIRED']

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a valid date', () => {
    const testData = {
      Date: {
        month: '15',
        day: '57',
        year: '5555',
        estimated: false,
      },
    }
    const expectedErrors = ['Date.date.date.datetime.INVALID_DATE']

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a birthdate less than 130 years and 1 day', () => {
    const currentYear = new Date().getFullYear()

    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: currentYear - 130,
        estimated: false,
      },
    }
    const expectedErrors = ['Date.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a birthdate greater than 16 years', () => {
    const currentYear = new Date().getFullYear()
    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: currentYear - 15,
        estimated: false,
      },
    }
    const expectedErrors = ['Date.date.date.datetime.DATE_TOO_LATE']

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('validates a validate birthdate', () => {
    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: 2000,
        estimated: false,
      },
    }

    expect(validateModel(testData, identifcationDateOfBirth)).toBe(true)
  })
})
