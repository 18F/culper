import IdentificationOtherNamesValidator, {
  OtherNameValidator,
} from './identificationothernames'

describe('OtherNames validation', () => {
  it('should validate list of other names', () => {
    const tests = [
      {
        state: {
          HasOtherNames: { value: 'Yes' },
          List: null,
        },
        expected: false,
      },
      {
        state: {
          HasOtherNames: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    suffix: 'Jr',
                  },
                  MaidenName: {
                    value: 'Yes',
                  },
                  DatesUsed: {
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
                  Reason: {
                    value: 'Testing',
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
          HasOtherNames: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    first: '',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    suffix: 'Jr',
                  },
                  MaidenName: {
                    value: 'No',
                  },
                  DatesUsed: {
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
                    present: false,
                  },
                  Reason: {
                    value: 'Testing',
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
          HasOtherNames: { value: 'Foo' },
          List: {
            branch: { value: 'No' },
            items: [],
          },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        new IdentificationOtherNamesValidator(test.state, null).isValid()
      ).toBe(test.expected)
    })
  })

  it('should validate a full other name', () => {
    const tests = [
      {
        state: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          MaidenName: {
            value: 'No',
          },
          DatesUsed: {
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
            present: false,
          },
          Reason: {
            value: 'Testing',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new OtherNameValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
