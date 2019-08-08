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
})
