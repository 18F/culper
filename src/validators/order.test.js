import OrderValidator from './order'

describe('Order validation', function () {
  it('validates court', () => {
    const tests = [
      {
        state: {
          CourtName: {
            value: 'Circuit Court'
          },
          CourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      },
      {
        state: {
          CourtName: null,
          CourtAddress: null
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, null).validCourt()).toBe(test.expected)
    })
  })

  it('validates disposition (conditional)', () => {
    const tests = [
      {
        state: {
          Disposition: {
            value: 'Stuff'
          }
        },
        props: null,
        expected: true
      },
      {
        state: {
          Disposition: {}
        },
        props: null,
        expected: false
      },
      {
        state: {
          Disposition: {}
        },
        props: {
          prefix: 'competence'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, test.props).validDisposition()).toBe(test.expected)
    })
  })

  it('validates appeals', () => {
    const tests = [
      {
        state: {
          Appeals: [
            {
              Has: 'Yes',
              CourtName: {
                value: 'Appeals Court'
              },
              CourtAddress: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
              },
              Disposition: {
                value: 'Stuff'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          Appeals: []
        },
        expected: false
      },
      {
        state: {
          Appeals: [{ Has: 'No' }]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, null).validAppeals()).toBe(test.expected)
    })
  })

  it('validates competence item', () => {
    const tests = [
      {
        state: {
          CourtName: {
            value: 'Circuit Court'
          },
          CourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          Disposition: {
            value: 'Stuff'
          },
          Occurred: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Appeals: [{ Has: 'No' }]
        },
        expected: true
      },
      {
        state: {
          CourtName: null,
          CourtAddress: null
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
