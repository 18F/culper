import { country, countryValueResolver, timeout } from './location-helpers'

describe('Location helpers', () => {
  it('can set timeout function', () => {
    let called = false
    const w = {
      setTimeout: (fn, ms) => { called = true }
    }
    timeout(null, 0, w)
    expect(called).toBe(true)
  })

  it('timeout does nothing if window does not exist', () => {
    let called = false
    const w = null
    timeout(null, 0, w)
    expect(called).toBe(false)
  })

  it('can handle various country inputs', () => {
    const tests = [
      {
        props: {
          country: {
            value: ['Germany'],
            comments: 'My comment'
          }
        },
        expect: {
          value: ['Germany'],
          comments: 'My comment'
        }
      },
      {
        props: {
          country: 'Germany',
          countryComments: 'My comment'
        },
        expect: {
          value: ['Germany'],
          comments: 'My comment'
        }
      },
      {
        props: {
          country: ''
        },
        expect: {
          value: [],
          comments: ''
        }
      }
    ]

    tests.forEach(test => {
      expect(countryValueResolver(test.props)).toEqual(test.expect)
    })
  })

  it('can process extracting country', () => {
    const tests = [
      {
        data: {
          value: 'United States'
        },
        expect: 'United States'
      },
      {
        data: null,
        expect: null
      },
      {
        data: 'United States',
        expect: 'United States'
      }
    ]

    tests.forEach(test => {
      expect(country(test.data)).toEqual(test.expect)
    })
  })
})
