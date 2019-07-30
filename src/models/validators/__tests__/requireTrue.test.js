import requireTrue from '../requireTrue'

describe('The requireTrue validator', () => {
  it('fails if a value is not true', () => {
    expect(requireTrue(false)).toEqual('VALUE_NOT_TRUE')
    expect(requireTrue('')).toEqual('VALUE_NOT_TRUE')
    expect(requireTrue('test')).toEqual('VALUE_NOT_TRUE')
    expect(requireTrue([])).toEqual('VALUE_NOT_TRUE')
    expect(requireTrue(null)).toEqual('VALUE_NOT_TRUE')
    expect(requireTrue(undefined)).toEqual('VALUE_NOT_TRUE')
  })

  it('passes if a value is true', () => {
    expect(requireTrue(true)).toBe(null)
  })
})
