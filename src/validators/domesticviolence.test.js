import DomesticViolence, { DomesticViolenceItem } from './domesticviolence'
import Location from '../components/Form/Location'

describe('Domestic Violence validation', function () {
  it('can validate DomesticViolenceItem', () => {
    const tests = [
      {
        state: {
          CourtName: {
            value: '4th Circuit Court'
          },
          CourtAddress: {
            country: 'United States',
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
      expect(new DomesticViolenceItem(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can validate DomesticViolence', () => {
    const tests = [
      {
        state: {
          List: [
            {
              Has: 'Yes',
              domestic: {
                CourtName: {
                  value: '4th Circuit Court'
                },
                CourtAddress: {
                  country: 'United States',
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
          ]
        },
        expected: true
      },
      {
        state: {},
        expected: false
      },
      {
        state: { List: [] },
        expected: false
      },
      {
        state: { List: [{ Has: 'No' }] },
        expected: true
      },
      {
        state: { List: [{ Has: 'Yes' }] },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DomesticViolence(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
