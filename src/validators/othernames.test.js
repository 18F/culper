import OtherNamesValidator from './othernames'
import { OtherNameValidator } from './othernames'

describe('OtherNames validation', function () {
  it('should validate has other names', function () {
    const tests = [
      {
        state: {
          HasOtherNames: 'Yes'
        },
        expected: true
      },
      {
        state: {
          HasOtherNames: 'No'
        },
        expected: true
      },
      {
        state: {
          HasOtherNames: 'Blah'
        },
        expected: false
      },
      {
        state: {
          HasOtherNames: 'foo'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherNamesValidator(test.state, null).validHasOtherNames()).toBe(test.expected)
    })
  })

  it('should validate list of other names', function () {
    const tests = [
      {
        state: {
          HasOtherNames: 'Yes',
          List: [
            {
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                lastInitialOnly: false,
                suffix: 'Jr'
              },
              MaidenName: {
                value: 'Foo'
              },
              DatesUsed: {
                from: new Date('1/1/2015'),
                to: new Date('1/1/2016'),
                present: false
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasOtherNames: 'Yes',
          List: [
            {
              Name: {
                first: '',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                lastInitialOnly: false,
                suffix: 'Jr'
              },
              MaidenName: {
                value: 'Foo'
              },
              DatesUsed: {
                from: new Date('1/1/2015'),
                to: new Date('1/1/2016'),
                present: false
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasOtherNames: 'Foo',
          List: []
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherNamesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate name', function () {
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
            lastInitialOnly: false,
            suffix: 'Jr'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).validName()).toBe(test.expected)
    })
  })

  it('should validate maiden name', function () {
    const tests = [
      {
        state: {
          MaidenName: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          MaidenName: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          MaidenName: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).validMaidenName()).toBe(test.expected)
    })
  })

  it('should validate dates used', function () {
    const tests = [
      {
        state: {
          DatesUsed: {
            from: new Date('1/1/2015'),
            to: new Date('1/1/2016'),
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          DatesUsed: null
        },
        expected: false
      },
      {
        state: {
          DatesUsed: {
            from: null,
            to: new Date('1/1/2016')
          }
        },
        expected: false
      },
      {
        state: {
          DatesUsed: {
            from: new Date('1/1/2016'),
            to: null
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).validDatesUsed()).toBe(test.expected)
    })
  })

  it('should validate a full other name', function () {
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
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          MaidenName: {
            value: 'Foo'
          },
          DatesUsed: {
            from: new Date('1/1/2015'),
            to: new Date('1/1/2016'),
            present: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
