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
})
