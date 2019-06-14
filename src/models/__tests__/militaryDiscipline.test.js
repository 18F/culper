import { validateModel } from 'models/validate'
import militaryDiscipline from '../militaryDiscipline'

describe('The military diciplinary procedurese model', () => {
  it('requires required fields to be filled', () => {
    const testData = {}
    const expectedErrors = [
      'Date.required',
      'Offenses.required',
      'Name.required',
      'Court.required',
      'Outcome.required',
    ]

    expect(validateModel(testData, militaryDiscipline))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
