import requireEmpty from '../requireEmpty'

describe('The requireEmpty validator', () => {
  it('fails if a value is not empty', () => {
    expect(requireEmpty(true)).toEqual('VALUE_NOT_EMPTY')
    expect(requireEmpty(false)).toEqual('VALUE_NOT_EMPTY')
    expect(requireEmpty('test')).toEqual('VALUE_NOT_EMPTY')
    expect(requireEmpty(0)).toEqual('VALUE_NOT_EMPTY')
    expect(requireEmpty({ test: 'thing' })).toEqual('VALUE_NOT_EMPTY')
    expect(requireEmpty(['blah'])).toEqual('VALUE_NOT_EMPTY')
  })

  it('passes if a value is empty', () => {
    expect(requireEmpty(null)).toBe(null)
    expect(requireEmpty(undefined)).toBe(null)
    expect(requireEmpty('')).toBe(null)
    expect(requireEmpty([])).toBe(null)
    expect(requireEmpty({})).toBe(null)
  })
})
