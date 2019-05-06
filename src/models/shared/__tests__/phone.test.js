import { validateModel } from 'models/validate'
import phone from '../phone'

describe('The phone model', () => {
  describe('with noNumber set to false', () => {
    it('type must be valid', () => {
      const testData = {
        type: 'Something',
      }

      const expectedErrors = ['type.inclusion']

      expect(validateModel(testData, phone))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('number is required', () => {
      const testData = {
        type: 'Domestic',
      }

      const expectedErrors = ['number.required']

      expect(validateModel(testData, phone))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('numberType is not required', () => {
      const testData = {
        type: 'Domestic',
      }

      const expectedErrors = ['numberType.required']

      expect(validateModel(testData, phone))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('timeOfDay is required', () => {
      const testData = {
        type: 'Domestic',
      }

      const expectedErrors = ['timeOfDay.required']

      expect(validateModel(testData, phone))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if options.requireNumberType is true', () => {
    it('numberType is required', () => {
      const testData = {
        type: 'Domestic',
      }

      const expectedErrors = ['numberType.required']

      expect(validateModel(testData, phone, { requireNumberType: true }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('for Domestic numbers', () => {
    it('number must be 10 digits', () => {
      const testData = {
        type: 'International',
        number: '12345abcde',
      }

      const expectedErrors = ['number.format']

      expect(validateModel(testData, phone))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('for International numbers', () => {
    it('number must be more than 10 digits', () => {
      const testData = {
        type: 'International',
        number: '1234567890',
      }

      const expectedErrors = ['number.format']

      expect(validateModel(testData, phone))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('passes if noNumber is true', () => {
    const testData = {
      noNumber: true,
    }

    expect(validateModel(testData, phone)).toEqual(true)
  })

  it('passes a valid Domestic number', () => {
    const testData = {
      type: 'Domestic',
      number: '1234567890',
      numberType: 'Home',
      timeOfDay: 'Both',
    }

    expect(validateModel(testData, phone)).toEqual(true)
  })

  it('passes a valid International number', () => {
    const testData = {
      type: 'International',
      number: '12345678901',
      numberType: 'Home',
      timeOfDay: 'Both',
    }

    expect(validateModel(testData, phone)).toEqual(true)
  })
})
