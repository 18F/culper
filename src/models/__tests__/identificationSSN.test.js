import { validateModel } from 'models/validate'
import identificationSSN from 'models/sections/identificationSSN'

describe('The identificationSSN section', () => {
  it('requires a social security number', () => {
    const testData = {}
    const expectedErrors = ['ssn.required']

    expect(validateModel(testData, identificationSSN))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a valid social security number', () => {
    const testData = {
      ssn: {
        first: '1111',
        middle: '1',
        last: '1111',
      },
    }
    const expectedErrors = ['ssn.ssn']

    expect(validateModel(testData, identificationSSN))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('fails if ssn is not verified', () => {
    const testData = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234',
        notApplicable: false,
      },
      verified: false,
    }

    const expectedErrors = ['verified.requireTrue']

    expect(validateModel(testData, identificationSSN))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('validates a valid social security number', () => {
    const testData = {
      ssn: {
        first: '555',
        middle: '55',
        last: '5555',
      },
      verified: true,
    }

    expect(validateModel(testData, identificationSSN)).toEqual(true)
  })

  describe('if not applicable', () => {
    it('passes a valid IdentificationSSN', () => {
      const testData = {
        ssn: {
          first: '',
          middle: '',
          last: '',
          notApplicable: true,
        },
        verified: false,
      }

      expect(validateModel(testData, identificationSSN)).toEqual(true)
    })
  })
})
