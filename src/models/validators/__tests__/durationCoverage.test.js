import { today } from 'helpers/date'
import durationCoverage from '../durationCoverage'

describe('The duration coverage validator', () => {
  it('passes if there is no value', () => {
    expect(durationCoverage(null))
      .toBeNull()
  })

  it('fails if there is no required duration', () => {
    const testRanges = [
      {
        Item: {
          Dates: {
            from: today.minus({ years: 8 }).toObject(),
            to: today.minus({ years: 6 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 5, months: 8 }).toObject(),
            to: today.minus({ years: 2, months: 10 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 2, months: 4 }).toObject(),
            to: today.minus({ years: 1, months: 11 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ months: 6 }).toObject(),
            present: true,
          },
        },
      },
    ]

    expect(durationCoverage({ items: testRanges }))
      .toEqual('Invalid options')
  })

  it('fails if there are any gaps', () => {
    const testDuration = { years: 3 }

    const testRanges = [
      {
        Item: {
          Dates: {
            from: today.minus({ years: 8 }).toObject(),
            to: today.minus({ years: 6 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 5, months: 8 }).toObject(),
            to: today.minus({ years: 2, months: 10 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 2, months: 4 }).toObject(),
            to: today.minus({ years: 1, months: 11 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ months: 6 }).toObject(),
            present: true,
          },
        },
      },
    ]

    expect(durationCoverage({ items: testRanges }, { requiredDuration: testDuration }))
      .toEqual('Gaps present')
  })

  it('passes if there are no gaps', () => {
    const testDuration = { years: 3 }

    const testRanges = [
      {
        Item: {
          Dates: {
            from: today.minus({ years: 8 }).toObject(),
            to: today.minus({ years: 6 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 5, months: 8 }).toObject(),
            to: today.minus({ years: 2, months: 4 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 2, months: 4 }).toObject(),
            to: today.minus({ years: 1, months: 11 }).toObject(),
          },
        },
      },
      {
        Item: {
          Dates: {
            from: today.minus({ years: 2, months: 6 }).toObject(),
            present: true,
          },
        },
      },
    ]

    expect(durationCoverage({ items: testRanges }, { requiredDuration: testDuration }))
      .toBeNull()
  })
})
