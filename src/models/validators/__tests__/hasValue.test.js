import hasValue from '../hasValue'

describe('The hasValue validator', () => {
  it('fails if there is no value', () => {
    const testData = null
    expect(hasValue(testData)).toBeTruthy()
  })

  it('fails if there is no value key', () => {
    const testData = {}
    expect(hasValue(testData)).toBeTruthy()
  })

  it('fails if the value key is empty', () => {
    const testData = { value: '' }
    expect(hasValue(testData)).toBeTruthy()
  })

  it('passes if there is a value', () => {
    const testData = { value: 'something' }
    expect(hasValue(testData)).toBeNull()
  })

  describe('with a validator passed in', () => {
    it('fails if the value does not pass the validator', () => {
      const testData = { value: 'test' }
      const validator = { inclusion: ['Yes', 'No'] }
      expect(hasValue(testData, { validator })).toBeTruthy()
    })

    it('passes if the value passes the validator', () => {
      const testData = { value: 'No' }
      const validator = { inclusion: ['Yes', 'No'] }
      expect(hasValue(testData, { validator })).toBeNull()
    })
  })
})
