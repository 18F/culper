import { validateModel } from 'models/validate'
import militaryDiscipline from '../militaryDiscipline'

describe('The military diciplinary procedurese model', () => {
  it('requires required fields to be filled', () => {
    const testData = {}
    const expectedErrors = [
      'Date.presence.REQUIRED',
      'Offenses.presence.REQUIRED',
      'Name.presence.REQUIRED',
      'Court.presence.REQUIRED',
      'Outcome.presence.REQUIRED',
    ]

    expect(validateModel(testData, militaryDiscipline))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Date: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, militaryDiscipline, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be in the future', () => {
    const testData = {
      Date: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, militaryDiscipline))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
