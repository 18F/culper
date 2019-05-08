import requireTrue from '../requireTrue'

describe('The requireTrue validator', () => {
  it('fails if a value is not true', () => {
    expect(requireTrue(false)).toBeTruthy()
    expect(requireTrue('')).toBeTruthy()
    expect(requireTrue('test')).toBeTruthy()
    expect(requireTrue([])).toBeTruthy()
    expect(requireTrue(null)).toBeTruthy()
    expect(requireTrue(undefined)).toBeTruthy()
  })

  it('passes if a value is true', () => {
    expect(requireTrue(true)).toBe(null)
  })
})
