import { validateModel } from 'models/validate'
import financialGambling from '../financialGambling'

describe('The financial gambling model', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Dates.required',
      'Losses.required',
      'Description.required',
      'Actions.required',
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

    const expectedErrors = ['Losses.hasValue']

    expect(validateModel(testData, financialGambling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
