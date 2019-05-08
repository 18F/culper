import requireEmpty from '../requireEmpty'

describe('The requireEmpty validator', () => {
  it('fails if a value is not empty', () => {
    expect(requireEmpty(true)).toBeTruthy()
    expect(requireEmpty(false)).toBeTruthy()
    expect(requireEmpty('test')).toBeTruthy()
    expect(requireEmpty(0)).toBeTruthy()
    expect(requireEmpty({ test: 'thing' })).toBeTruthy()
    expect(requireEmpty(['blah'])).toBeTruthy()
  })

  it('passes if a value is empty', () => {
    expect(requireEmpty(null)).toBe(null)
    expect(requireEmpty(undefined)).toBe(null)
    expect(requireEmpty('')).toBe(null)
    expect(requireEmpty([])).toBe(null)
    expect(requireEmpty({})).toBe(null)
  })
})
