import { validateModel } from '../validate'

import ssn from '../shared/ssn'

describe('The ssn model', () => {
  describe('when notApplicable is false', () => {
    it('verified is required', () => {
      const testData = {
        ssn: {
          first: '123', middle: '12', last: '1234', notApplicable: false,
        },
        verified: false,
      }

      const expectedErrors = ['verified.requireTrue']

      expect(validateModel(testData, ssn))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ssn is required', () => {
      const testData = {
        verified: true,
      }

      const expectedErrors = ['ssn.required']

      expect(validateModel(testData, ssn))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ssn first, middle, and last are required', () => {
      const testData = {
        ssn: {},
        verified: true,
      }

      const expectedErrors = ['ssn.first.required', 'ssn.middle.required', 'ssn.last.required']

      expect(validateModel(testData, ssn))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ssn first must be 3 digits', () => {
      const testData = {
        ssn: { first: '1234' },
        verified: true,
      }

      const expectedErrors = ['ssn.first.format']

      expect(validateModel(testData, ssn))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ssn middle must be 2 digits', () => {
      const testData = {
        ssn: { middle: 'ab' },
        verified: true,
      }

      const expectedErrors = ['ssn.middle.format']

      expect(validateModel(testData, ssn))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ssn last must be 4 digits', () => {
      const testData = {
        ssn: { last: 'CDEF' },
        verified: true,
      }

      const expectedErrors = ['ssn.last.format']

      expect(validateModel(testData, ssn))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('validates against specific invalid SSNs', () => {
    const testData = {
      ssn: {
        first: '999', middle: '99', last: '9999', notApplicable: false,
      },
      verified: true,
    }

    const expectedErrors = ['ssn.ssn']

    expect(validateModel(testData, ssn))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a notApplicable ssn', () => {
    const testData = {
      ssn: {
        first: '', middle: '', last: '', notApplicable: true,
      },
      verified: false,
    }

    expect(validateModel(testData, ssn)).toEqual(true)
  })

  it('passes a valid, verified ssn', () => {
    const testData = {
      ssn: {
        first: '123', middle: '12', last: '1234', notApplicable: false,
      },
      verified: true,
    }

    expect(validateModel(testData, ssn)).toEqual(true)
  })
})
