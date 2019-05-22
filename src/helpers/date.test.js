import { today, dateWithinRange } from './date'

describe('The dateWithinRange helper function', () => {
  it('returns true if the date is within the range', () => {
    const testDate = today.minus({ years: 2 }).toObject()
    const testDuration = { years: 5 }

    expect(dateWithinRange(testDate, testDuration)).toBe(true)
  })

  it('returns false if the date is not within the range', () => {
    const testDate = today.minus({ years: 15 }).toObject()
    const testDuration = { years: 5 }

    expect(dateWithinRange(testDate, testDuration)).toBe(false)
  })

  it('returns true if the date is exactly at the range boundary', () => {
    const testDate = today.minus({ years: 5 }).toObject()
    const testDuration = { years: 5 }

    expect(dateWithinRange(testDate, testDuration)).toBe(true)
  })
})
