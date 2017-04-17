import { dateRangeFormat } from './summaryHelper'

describe('The summary helper', () => {
  it('Renders formatted date ranges', () => {
    const tests = [
      {
        date: {
          from: {
            date: new Date('1/1/2000')
          },
          to: {
            date: new Date('1/1/2002')
          }
        },
        expected: '1/2000 - 1/2002'
      },
      {
        date: null,
        expected: null
      }
    ]

    tests.forEach(test => {
      expect(dateRangeFormat(test.date)).toEqual(test.expected)
    })
  })
})
