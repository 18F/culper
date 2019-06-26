import OrderValidator from './order'
import Location from '../components/Form/Location'

describe('Order validation', () => {
  it('validates court', () => {
    const tests = [
      {
        data: {
          CourtName: {
            value: 'Circuit Court',
          },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
        expected: true,
      },
      {
        data: {
          CourtName: null,
          CourtAddress: null,
        },
        expected: false,
      },
    ]
    tests.forEach((test) => {
      expect(new OrderValidator(test.data).validCourt()).toBe(test.expected)
    })
  })

  it('validates disposition (conditional)', () => {
    const tests = [
      {
        data: {
          Disposition: {
            value: 'Stuff',
          },
        },
        expected: true,
      },
      {
        data: {
          Disposition: {},
        },
        expected: false,
      },
      {
        data: {
          prefix: 'competence',
          Disposition: {},
        },
        expected: true,
      },
    ]
    tests.forEach((test) => {
      expect(new OrderValidator(test.data).validDisposition()).toBe(
        test.expected
      )
    })
  })

  it('validates appeals', () => {
    const tests = [
      {
        data: {
          Appeals: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  CourtName: {
                    value: 'Appeals Court',
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                  Disposition: {
                    value: 'Stuff',
                  },
                },
              },
              {
                Item: {
                  Has: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        data: {
          Appeals: {
            items: [],
          },
        },
        expected: false,
      },
      {
        data: {
          Appeals: {
            items: [{ Item: { Has: { value: 'No' } } }],
          },
        },
        expected: true,
      },
    ]
    tests.forEach((test) => {
      expect(new OrderValidator(test.data).validAppeals()).toBe(test.expected)
    })
  })

  it('validates competence item', () => {
    const tests = [
      {
        data: {
          CourtName: {
            value: 'Circuit Court',
          },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          Disposition: {
            value: 'Stuff',
          },
          Occurred: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Appeals: {
            items: [{ Item: { Has: { value: 'No' } } }],
          },
        },
        expected: true,
      },
      {
        data: {
          CourtName: {
            value: 'Circuit Court',
          },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          Occurred: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Appeals: {
            items: [{ Item: { Has: { value: 'No' } } }],
          },
          prefix: 'competence',
        },
        expected: true,
      },
      {
        data: {
          CourtName: null,
          CourtAddress: null,
        },
        expected: false,
      },
    ]
    tests.forEach((test) => {
      expect(new OrderValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
