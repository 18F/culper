import { isZipcodeState } from './zipcodes'

describe('The zipcodes lookup', () => {
  it('It expects to validate if zip code is in state', () => {
    const tests = [
      {
        state: 'CA',
        zipcode: '90210',
        expected: true
      },
      {
        state: 'NY',
        zipcode: '06390',
        expected: true
      },
      {
        state: 'NY',
        zipcode: '06391',
        expected: false
      },
      {
        state: 'CT',
        zipcode: '06389',
        expected: true
      },
      {
        state: 'CA',
        zipcode: '06389',
        expected: false
      },
      {
        state: 'NOT State',
        zipcode: '00000',
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(isZipcodeState(test.state, test.zipcode)).toBe(test.expected)
    })
  })
})
