import ExistingConditionsValidator from './existingconditions'
import Location from '../components/Form/Location'

describe('Diagnosis validation', function () {
  it('validates did not follow', () => {
    const tests = [
      {
        state: {
          DidNotFollow: { value: 'Yes' },
          DidNotFollowExplanation: {
            value: 'Stuff'
          }
        },
        expected: true
      },
      {
        state: {
          DidNotFollow: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          DidNotFollow: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          DidNotFollow: { value: 'Yes' },
          DidNotFollowExplanation: {
            value: null
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, null).validDidNotFollow()).toBe(test.expected)
    })
  })

  it('validates treatment list', () => {
    const tests = [
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Condition: 'Test',
                  Effective: { value: 'Yes' },
                  Explanation: {
                    value: null
                  },
                  Diagnosed: {
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
                  Treatment: {
                    Name: {
                      value: 'Circuit Court'
                    },
                    Address: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'Virginia',
                      zipcode: '22202',
                      layout: Location.ADDRESS
                    },
                    Phone: {
                      noNumber: '',
                      number: '7031112222',
                      numberType: 'Home',
                      type: 'Domestic',
                      timeOfDay: 'Both',
                      extension: ''
                    }
                  },
                  TreatmentFacility: {
                    Name: {
                      value: 'Circuit Court'
                    },
                    Address: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'Virginia',
                      zipcode: '22202',
                      layout: Location.ADDRESS
                    },
                    Phone: {
                      noNumber: '',
                      number: '7031112222',
                      numberType: 'Home',
                      type: 'Domestic',
                      timeOfDay: 'Both',
                      extension: ''
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
        state: {
          ReceivedTreatment: { value: 'No' },
          Explanation: {
            value: 'Testing'
          }
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [{Treatment: {}}]
          }
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: { value: 'Decline' }
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: { value: 'Nope' }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, test.props).validTreatmentList()).toBe(test.expected)
    })
  })

  it('validates diagnosis', () => {
    const tests = [
      {
        state: {
          HasCondition: { value: 'Yes' },
          ReceivedTreatment: { value: 'Yes' },
          DidNotFollow: { value: 'No' },
          DidNotFollowExplanation: {
            value: 'Stuff'
          },
          Explanation: null,
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Condition: {
                    value: 'Test'
                  },
                  Effective: { value: 'Yes' },
                  Explanation: {
                    value: null
                  },
                  Diagnosed: {
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
                  Treatment: {
                    Name: {
                      value: 'Circuit Court'
                    },
                    Address: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'Virginia',
                      zipcode: '22202',
                      layout: Location.ADDRESS
                    },
                    Phone: {
                      noNumber: '',
                      number: '7031112222',
                      numberType: 'Home',
                      type: 'Domestic',
                      timeOfDay: 'Both',
                      extension: ''
                    }
                  },
                  TreatmentFacility: {
                    Name: {
                      value: 'Circuit Court'
                    },
                    Address: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'Virginia',
                      zipcode: '22202',
                      layout: Location.ADDRESS
                    },
                    Phone: {
                      noNumber: '',
                      number: '7031112222',
                      numberType: 'Home',
                      type: 'Domestic',
                      timeOfDay: 'Both',
                      extension: ''
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
        state: {
          HasCondition: { value: 'No' }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
