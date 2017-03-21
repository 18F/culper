import RelativesValidator, { RelativeValidator } from './relatives'

describe('Relatives validation', function () {
  it('validate initial relations', () => {
    const tests = [
      {
        state: {
          Relations: [],
          List: []
        },
        expected: false
      },
      {
        state: {
          Relations: ['Mother'],
          List: []
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativesValidator(test.state, null).validRelations()).toBe(test.expected)
    })
  })

  // it('validate items', () => {
  //   const tests = [
  //     {
  //       state: {
  //         Relations: [],
  //         List: []
  //       },
  //       expected: false
  //     },
  //     {
  //       state: {
  //         Relations: ['Mother'],
  //         List: []
  //       },
  //       expected: false
  //     },
  //     {
  //       state: {
  //         Relations: ['Mother'],
  //         List: [
  //           {
  //             Item: {
  //               Relations: ['Mother']
  //             }
  //           }
  //         ]
  //       },
  //       expected: true
  //     }
  //   ]

  //   tests.forEach(test => {
  //     expect(new RelativesValidator(test.state, null).isValid()).toBe(test.expected)
  //   })
  // })

  it('validate relative relationship', () => {
    const tests = [
      {
        state: {
          Relations: []
        },
        expected: false
      },
      {
        state: {
          Relations: ['Mother']
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validRelations()).toBe(test.expected)
    })
  })

  it('validate relative name', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Name: {}
        },
        expected: false
      },
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
      expect(new RelativeValidator(test.state, null).validName()).toBe(test.expected)
    })
  })

  it('validate relative birth date', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Birthplace: {}
        },
        expected: false
      },
      {
        state: {
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validBirthplace()).toBe(test.expected)
    })
  })

  // it('validate relative citizenship', () => {
  //   const tests = [
  //     {
  //       state: {
  //       },
  //       expected: false
  //     },
  //     {
  //       state: {
  //         Birthplace: {}
  //       },
  //       expected: false
  //     },
  //     {
  //       state: {
  //         Birthplace: {
  //           addressType: 'United States',
  //           address: '1234 Some Rd',
  //           city: 'Arlington',
  //           state: 'Virginia',
  //           zipcode: '22202'
  //         }
  //       },
  //       expected: true
  //     }
  //   ]

  //   tests.forEach(test => {
  //     expect(new RelativeValidator(test.state, null).validBirthplace()).toBe(test.expected)
  //   })
  // })

  it('validate relative maiden name', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          MaidenName: {}
        },
        expected: false
      },
      {
        state: {
          MaidenName: {
            value: 'Nunyabusiness'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validMaidenName()).toBe(test.expected)
    })
  })
})
