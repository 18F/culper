import country from '../country'

/**
 * Country value formats:
 *
 * country: 'United States'
 *
 * country: {
 *  value: 'Canada'
 * }
 *
 * country: {
 *  value: ['Canada'],
 * }
 *
 * country: {
 *  value: ['Canada', 'Germany'],
 * }
 */

// TODO - how should this interact with presence: true?

describe('The country validator', () => {
  describe('for a string value', () => {
    it('fails if the value is not a valid country', () => {
      const testData = 'Made up country'
      expect(country(testData)).toBeTruthy()
    })

    it('passes if the value is a valid country', () => {
      const testData = 'United States'
      expect(country(testData)).toBeNull()
    })
  })

  describe('for an object value', () => {
    it('fails if the value is null', () => {
      const testData = { value: null }
      expect(country(testData)).toBeTruthy()
    })

    it('fails if the value key is empty', () => {
      const testData = { value: '' }
      expect(country(testData)).toBeTruthy()
    })

    it('fails if the value is not a valid country', () => {
      const testData = {
        value: 'Made up country',
      }
      expect(country(testData)).toBeTruthy()
    })

    it('passes if the value is a valid country', () => {
      const testData = {
        value: 'United States',
      }
      expect(country(testData)).toBeNull()
    })
  })

  describe('for an array value', () => {
    it('fails if the array is empty', () => {
      const testData = {
        value: [],
      }
      expect(country(testData)).toBeTruthy()
    })

    it('fails if the value includes an invalid country', () => {
      const testData = {
        value: ['Canada', 'Made up country'],
      }
      expect(country(testData)).toBeTruthy()
    })

    it('passes if all of the values are valid countries', () => {
      const testData = {
        value: ['Canada', 'United States'],
      }
      expect(country(testData)).toBeNull()
    })
  })
})
