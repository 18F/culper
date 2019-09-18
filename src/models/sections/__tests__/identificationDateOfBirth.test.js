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

  it('requires a birthdate less than 100 years and 1 day', () => {
    const currentYear = new Date().getFullYear()

    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: currentYear - 100,
        estimated: false,
      },
    }
    const expectedErrors = ['Date.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a confirmation if birthdate less than 16 years', () => {
    const currentYear = new Date().getFullYear()
    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: currentYear - 15,
        estimated: false,
      },
    }
    const expectedErrors = ["Confirmed.presence.REQUIRED"]

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

  it('allows an age less than 16 birthdate if confirmed', () => {
    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: '2018',
        estimated: false,
      },
      Confirmed: {
        checked: true,
      }
    }

    expect(validateModel(testData, identifcationDateOfBirth)).toBe(true)
  })

  it('does not allow an age less than 16 birthdate if confirmed not checked', () => {
    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: '2018',
        estimated: false,
      },
      Confirmed: {
        checked: false,
      }
    }

    const expectedErrors = ["Confirmed.model.checked.requireTrue.VALUE_NOT_TRUE"]

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a birthdate less than 100 years and 1 day even if confirmed', () => {
    const testData = {
      Date: {
        month: '1',
        day: '1',
        year: '1905',
        estimated: false,
      },
      Confirmed: {
        checked: true,
      }
    }
    const expectedErrors = ['Date.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, identifcationDateOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

})
