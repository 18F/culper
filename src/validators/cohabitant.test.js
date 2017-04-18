import CohabitantsValidator, { CohabitantValidator } from './cohabitant'

describe('Cohabitant validation', function () {
  it('validates other name', () => {
    const tests = [
      {
        state: {
          OtherNameNotApplicable: true
        },
        expected: true
      },
      {
        state: {
          OtherNameNotApplicable: false,
          OtherName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          OtherNameUsed: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).validOtherName()).toBe(test.expected)
    })
  })

  it('validates cohabitant', () => {
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
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          BirthPlace: {
            domestic: true,
            country: 'United States',
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA'
          },
          SSN: {
            first: '111',
            middle: '11',
            last: '1111',
            applicable: true
          },
          OtherNameNotApplicable: false,
          OtherName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          OtherNameUsed: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          ForeignBornDocument: {
            DocumentType: 'FS240',
            DocumentExpirationNotApplicable: true,
            DocumentNumber: {
              value: 'A1234'
            }
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('validates cohabitants', () => {
    const tests = [
      {
        state: {
          HasCohabitant: 'Nope'
        },
        expected: false
      },
      {
        state: {
          HasCohabitant: 'No'
        },
        expected: true
      },
      {
        state: {
          HasCohabitant: 'Yes',
          CohabitantList: []
        },
        expected: false
      },
      {
        state: {
          HasCohabitant: 'Yes',
          CohabitantList: [{Cohabitant: {}}]
        },
        expected: false
      },
      {
        state: {
          HasCohabitant: 'Yes',
          CohabitantList: [
            {
              Cohabitant: {
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
                Birthdate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                BirthPlace: {
                  domestic: true,
                  country: 'United States',
                  city: 'Arlington',
                  county: 'Arlington',
                  state: 'VA'
                },
                SSN: {
                  first: '111',
                  middle: '11',
                  last: '1111',
                  applicable: true
                },
                OtherNameNotApplicable: false,
                OtherName: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                OtherNameUsed: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2016')
                  },
                  present: false
                },
                ForeignBornDocument: {
                  DocumentType: 'FS240',
                  DocumentExpirationNotApplicable: true,
                  DocumentNumber: {
                    value: 'A1234'
                  }
                }
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
