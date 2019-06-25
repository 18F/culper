import { validateModel } from 'models/validate'
import revoked from 'models/revoked'

describe('The revoked model', () => {
  it('the Agency field is required', () => {
    const testData = {}
    const expectedErrors = ['Agency.required']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Agency field must have a value', () => {
    const testData = {
      Agency: 'invalid',
    }
    const expectedErrors = ['Agency.hasValue']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Explanation field is required', () => {
    const testData = {}
    const expectedErrors = ['Explanation.required']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Explanation field must have a value', () => {
    const testData = {
      Explanation: 'invalid',
    }
    const expectedErrors = ['Explanation.hasValue']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Date field is required', () => {
    const testData = {}
    const expectedErrors = ['Date.required']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Date field must be a valid date', () => {
    const testData = {
      Date: { year: 1990, month: 33, day: 12 },
    }

    const expectedErrors = ['Date.date']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Date field must be a valid year', () => {
    const testData = {
      Date: { year: 12, month: 33, day: 12 },
    }

    const expectedErrors = ['Date.date']

    expect(validateModel(testData, revoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid revoked item', () => {
    const testData = {
      Agency: { value: 'Secret Service' },
      Explanation: { value: 'It looked like it should be revoked' },
      Date: { year: 2005, month: 3, day: 12 },
    }

    expect(validateModel(testData, revoked)).toBe(true)
  })
})
