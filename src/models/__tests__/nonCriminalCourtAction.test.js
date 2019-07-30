import { validateModel } from 'models/validate'
import nonCriminalCourtAction from '../nonCriminalCourtAction'

describe('The nonCriminalCourtAction model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'CivilActionDate.presence.REQUIRED',
      'CourtName.presence.REQUIRED',
      'CourtAddress.presence.REQUIRED',
      'NatureOfAction.presence.REQUIRED',
      'ResultsOfAction.presence.REQUIRED',
      'PrincipalPartyNames.presence.REQUIRED',
    ]

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CivilActionDate must be a valid date', () => {
    const testData = {
      CivilActionDate: 12345,
    }
    const expectedErrors = [
      'CivilActionDate.date.day.presence.REQUIRED',
      'CivilActionDate.date.month.presence.REQUIRED',
      'CivilActionDate.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtName must have a value', () => {
    const testData = {
      CourtName: 'test court',
    }
    const expectedErrors = ['CourtName.hasValue.MISSING_VALUE']

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtAddress must be a valid address', () => {
    const testData = {
      CourtAddress: '123 Main St',
    }
    const expectedErrors = [
      'CourtAddress.location.street.presence.REQUIRED',
      'CourtAddress.location.city.presence.REQUIRED',
      'CourtAddress.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NatureOfAction must have a value', () => {
    const testData = {
      NatureOfAction: 'test',
    }
    const expectedErrors = ['NatureOfAction.hasValue.MISSING_VALUE']

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ResultsOfAction must have a value', () => {
    const testData = {
      ResultsOfAction: 'test',
    }
    const expectedErrors = ['ResultsOfAction.hasValue.MISSING_VALUE']

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('PrincipalPartyNames must have a value', () => {
    const testData = {
      PrincipalPartyNames: 'test',
    }
    const expectedErrors = ['PrincipalPartyNames.hasValue.MISSING_VALUE']

    expect(validateModel(testData, nonCriminalCourtAction))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid nonCriminalCourtAction', () => {
    const testData = {
      CivilActionDate: { month: 9, day: 10, year: 1990 },
      CourtName: { value: 'Test Court' },
      CourtAddress: {
        street: '123 Main St',
        zipcode: '10002',
        city: 'New York',
        state: 'NY',
        country: 'United States',
      },
      NatureOfAction: { value: 'Something I did' },
      ResultsOfAction: { value: 'This happened' },
      PrincipalPartyNames: { value: 'Person 1 and Person 2' },
    }

    expect(validateModel(testData, nonCriminalCourtAction)).toEqual(true)
  })
})
