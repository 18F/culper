import DomesticViolence, { DomesticViolenceItem } from './domesticviolence'
import Location from '../components/Form/Location'

describe('Domestic Violence validation', function () {
  it('can validate DomesticViolenceItem', () => {
    const tests = [
      {
        data: {
          CourtName: {
            value: '4th Circuit Court'
          },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Explanation: {
            value: 'Some content'
          },
          Issued: {
            month: '1',
            year: '2009'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DomesticViolenceItem(test.data).isValid()).toBe(test.expected)
    })
  })

  it('can validate DomesticViolence', () => {
    const tests = [
      {
        data: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  domestic: {
                    CourtName: {
                      value: '4th Circuit Court'
                    },
                    CourtAddress: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'Virginia',
                      zipcode: '22202',
                      layout: Location.ADDRESS
                    },
                    Explanation: {
                      value: 'Some content'
                    },
                    Issued: {
                      month: '1',
                      year: '2009'
                    }
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {},
        expected: false
      },
      {
        data: {
          List: {
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            items: [{ Item: { Has: { value: 'No' } } }]
          }
        },
        expected: true
      },
      {
        data: {
          List: {
            items: [{ Item: { Has: { value: 'Yes' } } }]
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DomesticViolence(test.data).isValid()).toBe(test.expected)
    })
  })
})
