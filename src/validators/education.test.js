import HistoryEducationValidator, { EducationItemValidator } from './education'
import Location from '../components/Form/Location'

describe('Education component validation', function () {
  it('handle no education', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'No' },
          HasDegree10: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'No' }
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'No' },
          HasDegree10: { value: 'Yes' }
        },
        expected: false
      },
      {
        data: {
          HasAttended: null,
          HasDegree10: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEducationValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('handle dates', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: '1',
              day: '1',
              year: '2004',
              date: new Date('1/1/2004')
            },
            present: false
          }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2004',
              date: new Date('1/1/2004')
            },
            to: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            present: false
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.data).validDates()).toBe(test.expected)
    })
  })

  it('handle address', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.data).validAddress()).toBe(test.expected)
    })
  })

  it('handle name', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Name: {
            value: 'Hubert Humphrey High'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.data).validName()).toBe(test.expected)
    })
  })

  it('handle type', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Type: { value: 'High School' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.data).validType()).toBe(test.expected)
    })
  })

  it('handle reference', () => {
    const today = new Date()
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: `${today.getMonth() + 1}`,
              day: `${today.getDate()}`,
              year: `${today.getFullYear()}`,
              date: today
            },
            present: true
          },
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          ReferenceNameNotApplicable: {
            applicable: true
          },
          ReferencePhone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: ''
          },
          ReferenceEmail: {
            value: 'user@local.dev'
          },
          ReferenceEmailNotApplicable: {
            applicable: true
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: '1',
              day: '1',
              year: '2001',
              date: new Date('1/1/2001')
            },
            present: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.data).validReference()).toBe(test.expected)
    })
  })

  it('handle diplomas', () => {
    const today = new Date()
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: { items: [] }
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: null
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                    date: today
                  },
                  Diploma: {
                    value: 'Other'
                  },
                  DiplomaOther: {
                    value: ''
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {},
                  Diploma: {
                    value: 'Other'
                  },
                  DiplomaOther: {
                    value: 'Other'
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Diploma: {}
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                    date: today
                  },
                  Diploma: {
                    value: 'High School Diploma'
                  },
                  DiplomaOther: {}
                }
              },
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                    date: today
                  },
                  Diploma: {
                    value: 'Other'
                  },
                  DiplomaOther: {
                    value: 'GED'
                  }
                }
              },
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                    date: today
                  },
                  Diploma: {
                    value: 'High School Diploma'
                  },
                  DiplomaOther: {}
                }
              },
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.data).validDiplomas()).toBe(test.expected)
    })
  })

  it('handle valid attendance', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Nope' },
          HasDegree10: { value: 'Yes' }
        },
        expected: false
      },
      {
        data: {
          HasAttended: { value: 'No' },
          HasDegree10: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEducationValidator(test.data).validAttendance()).toBe(test.expected)
    })
  })

  it('handle valid list', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'Yes' },
          List: {
            branch: {
              value: 'No'
            },
            items: [
              {
                Item: {
                  Name: {
                    value: 'School name'
                  },
                  ReferenceNameNotApplicable: {
                    applicable: false
                  },
                  Type: { value: 'High School' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  },
                  Diplomas: {
                    items: [
                      {
                        Item: {
                          Has: { value: 'No' },
                          Diploma: {}
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'Yes' },
          List: {
            branch: {
              value: 'No'
            },
            items: [
              {
                Item: {
                  Name: {
                    value: ''
                  },
                  Type: { value: 'High School' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  },
                  Diplomas: {
                    items: [
                      {
                        Item: {
                          Has: { value: 'No' },
                          Diploma: {}
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEducationValidator(test.data).validList()).toBe(test.expected)
    })
  })
})
