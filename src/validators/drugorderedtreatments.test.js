import DrugOrderedTreatmentsValidator, {
  DrugOrderedTreatmentValidator,
} from './drugorderedtreatments'
import Location from '../components/Form/Location'

describe('Drug Ordered Treatment Validation', () => {
  it('should validate drug ordered treatments', () => {
    const tests = [
      {
        state: {
          TreatmentOrdered: { value: 'Nope' },
        },
        expected: false,
      },
      {
        state: {
          TreatmentOrdered: { value: 'No' },
        },
        expected: true,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [],
          },
        },
        expected: false,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ OrderedTreatment: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ OrderedTreatment: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  OrderedBy: {
                    values: ['Employer'],
                  },
                  Explanation: {
                    value: 'The explanation',
                  },
                  ActionTaken: { value: 'Yes' },
                  DrugType: 'Cocaine',
                  TreatmentProvider: {
                    value: 'Provider',
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                  TreatmentProviderTelephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    type: 'Domestic',
                    extension: '',
                  },
                  TreatmentDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                    },
                  },
                  TreatmentCompleted: { value: 'Yes' },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  OrderedBy: {
                    values: ['Employer'],
                  },
                  Explanation: {
                    value: 'The explanation',
                  },
                  ActionTaken: { value: 'Yes' },
                  DrugType: 'Cocaine',
                  TreatmentProvider: {
                    value: 'Provider',
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                  TreatmentProviderTelephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: '',
                  },
                  TreatmentDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                    },
                  },
                  TreatmentCompleted: { value: 'No' },
                  NoTreatmentExplanation: {
                    value: 'No treatment',
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  OrderedBy: {
                    values: ['Employer'],
                  },
                  Explanation: {
                    value: 'The explanation',
                  },
                  ActionTaken: { value: 'No' },
                  NoActionTakenExplanation: {
                    value: 'No action taken',
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  OrderedBy: {
                    values: ['Employer', 'None'],
                  },
                  Explanation: {
                    value: 'The explanation',
                  },
                  ActionTaken: { value: 'No' },
                  NoActionTakenExplanation: {
                    value: 'No action taken',
                  },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        state: {
          TreatmentOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  OrderedBy: {
                    values: ['Employer'],
                  },
                  Explanation: {
                    value: 'The explanation',
                  },
                  ActionTaken: { value: 'Nope' },
                },
              },
            ],
          },
        },
        expected: false,
      },
    ]
    tests.forEach((test) => {
      expect(new DrugOrderedTreatmentsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate treatment completed', () => {
    const tests = [
      {
        state: {
          ActionTaken: { value: 'Yes' },
          TreatmentCompleted: { value: 'Nope' },
        },
        expected: false,
      },
      {
        state: {
          ActionTaken: { value: 'Yes' },
          TreatmentCompleted: { value: 'No' },
          NoTreatmentExplanation: {
            value: 'Nothing',
          },
        },
        expected: true,
      },
      {
        state: {
          ActionTaken: { value: 'Yes' },
          TreatmentCompleted: { value: 'Yes' },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(
        new DrugOrderedTreatmentValidator(test.state).validTreatmentCompleted()
      ).toBe(test.expected)
    })
  })
})
