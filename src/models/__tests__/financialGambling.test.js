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
