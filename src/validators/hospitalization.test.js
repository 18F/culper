import HospitalizationsValidator, {
  HospitalizationValidator
} from './hospitalization'
import Location from '../components/Form/Location'

describe('Hospitalization validation', function() {
  it('should validate admission', function() {
    const tests = [
      {
        state: {
          Admission: { value: 'Voluntary' },
          Explanation: {
            value: 'Because I can'
          }
        },
        expected: true
      },
      {
        state: {
          Admission: { value: 'Foo' },
          Explanation: {
            value: 'Because I can'
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new HospitalizationValidator(test.state, null).validAdmission()
      ).toBe(test.expected)
    })
  })

  it('should validate hospitalization', function() {
    const tests = [
      {
        state: {
          Facility: {
            value: 'Place 1'
          },
          FacilityAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          TreatmentDate: {
            from: {
              month: '1',
              day: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2012',
              date: new Date('1/1/2012')
            },
            present: false
          },
          Admission: { value: 'Voluntary' },
          Explanation: {
            value: 'Because I can'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new HospitalizationValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate hospitalized branch', function() {
    const tests = [
      {
        state: {
          Hospitalized: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          Hospitalized: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new HospitalizationsValidator(test.state, null).validHospitalization()
      ).toBe(test.expected)
    })
  })
  it('should validate hospitalizations', function() {
    const tests = [
      {
        state: {
          Hospitalized: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Facility: {
                    value: 'Place 1'
                  },
                  FacilityAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  TreatmentDate: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Admission: { value: 'Voluntary' },
                  Explanation: {
                    value: 'Because I can'
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Hospitalized: { value: 'Nope' },
          List: {
            branch: { value: '' },
            items: [
              {
                Item: {
                  Facility: {
                    value: 'Place 1'
                  },
                  FacilityAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  TreatmentDate: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Admission: { value: 'Voluntary' },
                  Explanation: {
                    value: 'Because I can'
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Hospitalized: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [
              {
                Facility: {
                  value: null
                },
                FacilityAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                TreatmentDate: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                    date: new Date('1/1/2010')
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                Admission: { value: 'Voluntary' },
                Explanation: {
                  value: 'Because I can'
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Hospitalized: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Facility: {
                  value: null
                },
                FacilityAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Admission: { value: 'Voluntary' },
                Explanation: {
                  value: 'Because I can'
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Hospitalized: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          Hospitalized: { value: 'No' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new HospitalizationsValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
