import { validateModel } from 'models/validate'
import ssn from '../ssn'

describe('The ssn model', () => {
  it('ssn first, middle, and last are required', () => {
    const testData = {
      ssn: '',
    }

    const expectedErrors = ['first.required', 'middle.required', 'last.required']

    expect(validateModel(testData, ssn))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ssn first must be 3 digits', () => {
    const testData = {
      first: '1234',
    }

    const expectedErrors = ['first.format']

    expect(validateModel(testData, ssn))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ssn middle must be 2 digits', () => {
    const testData = {
      middle: 'ab',
    }

    const expectedErrors = ['middle.format']

    expect(validateModel(testData, ssn))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ssn last must be 4 digits', () => {
    const testData = {
      last: 'CDEF',
    }

    const expectedErrors = ['last.format']

    expect(validateModel(testData, ssn))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid ssn', () => {
    const testData = {
      first: '123',
      middle: '12',
      last: '1234',
    }

    expect(validateModel(testData, ssn)).toEqual(true)
  })
})
