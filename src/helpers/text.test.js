import { getYearsString, getNumberOfYearsString } from './text'

describe('getYearsString function', () => {
  it('returns the string for the number 5', () => {
    expect(getYearsString(5)).toEqual('five')
  })

  it('returns the string for the number 7', () => {
    expect(getYearsString(7)).toEqual('seven')
  })

  it('returns the string for the number 10', () => {
    expect(getYearsString(10)).toEqual('ten')
  })

  it('returns an empty string for all other cases', () => {
    expect(getYearsString('nonsense')).toEqual('')
  })
})

describe('getNumberOfYearsString', () => {
  it('returns "year" if 1 year', () => {
    expect(getNumberOfYearsString(1)).toEqual('year')
  })

  it('returns "years" for other years', () => {
    expect(getNumberOfYearsString(5)).toEqual('five (5) years')
  })

  describe('if includeNumericString is false', () => {
    it('returns "year" if 1 year', () => {
      expect(getNumberOfYearsString(1, false)).toEqual('year')
    })

    it('returns "years" for other years', () => {
      expect(getNumberOfYearsString(5, false)).toEqual('5 years')
    })
  })
})
