import ForeignBenefitValidator, { OneTimeBenefitValidator, FutureBenefitValidator, ContinuingBenefitValidator } from './foreignbenefit'

describe('Foreign Born Benefits', function () {
  it('should validate benefit activities', function () {
    const tests = [
      {
        props: {
          InterestTypes: ['Yourself'],
          BenefitType: 'Other',
          OtherBenefitType: {
            value: 'Other'
          },
          BenefitFrequency: 'OneTime',
          OneTimeBenefit: {
            Received: {
              month: '1',
              day: '1',
              year: '2010'
            },
            Country: {
              value: 'Germany'
            },
            Value: {
              value: '2000'
            },
            Reason: {
              value: 'Foo'
            },
            Obligated: 'Yes',
            ObligatedExplanation: {
              value: 'Because'
            }
          }
        },
        expected: true
      },
      {
        props: {
          InterestTypes: ['Yourself'],
          BenefitType: 'Educational',
          BenefitFrequency: 'Future',
          FutureBenefit: {
            Begin: {
              month: '1',
              day: '1',
              year: '2010'
            },
            Frequency: 'Other',
            OtherFrequency: {
              value: 'Other'
            },
            Country: {
              value: 'Germany'
            },
            Value: {
              value: '2000'
            },
            Reason: {
              value: 'Foo'
            },
            Obligated: 'Yes',
            ObligatedExplanation: {
              value: 'Because'
            }
          }
        },
        expected: true
      },
      {
        props: {
          InterestTypes: ['Yourself'],
          BenefitType: 'Educational',
          BenefitFrequency: 'Continuing',
          ContinuingBenefit: {
            Began: {
              month: '1',
              day: '1',
              year: '2010'
            },
            End: {
              month: '1',
              day: '1',
              year: '2020'
            },
            Frequency: 'Weekly',
            Country: {
              value: 'Germany'
            },
            Value: {
              value: '2000'
            },
            Reason: {
              value: 'Foo'
            },
            Obligated: 'Yes',
            ObligatedExplanation: {
              value: 'Because'
            }
          }
        },
        expected: true
      },
      {
        props: {
          InterestTypes: ['Yourself'],
          BenefitType: 'Educational',
          BenefitFrequency: 'Other',
          OtherBenefit: {
            value: 'Sweet'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new ForeignBenefitValidator(test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate invalid benefit frequency ', function () {
    const tests = [
      {
        props: {
          InterestTypes: ['Yourself'],
          BenefitType: 'Educational',
          BenefitFrequency: 'Does not exist'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ForeignBenefitValidator(test.props).validBenefit()).toBe(test.expected)
    })
  })

  it('should validate benefit types', function () {
    const tests = [
      {
        props: {
          BenefitType: 'Educational'
        },
        expected: true
      },
      {
        props: {
          BenefitType: 'Medical'
        },
        expected: true
      },
      {
        props: {
          BenefitType: 'Retirement'
        },
        expected: true
      },
      {
        props: {
          BenefitType: 'DoesntExist'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ForeignBenefitValidator(test.props).validBenefitType()).toBe(test.expected)
    })
  })

  it('should validate one time benefit', function () {
    const tests = [
      {
        props: {
          Received: {
            month: '1',
            day: '1',
            year: '2010'
          },
          Country: {
            value: 'Germany'
          },
          Value: {
            value: '2000'
          },
          Reason: {
            value: 'Foo'
          },
          Obligated: 'Yes',
          ObligatedExplanation: {
            value: 'Because'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OneTimeBenefitValidator(test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate one time obligated explanation', function () {
    const tests = [
      {
        props: {
          Obligated: 'Yes',
          ObligatedExplanation: {
            value: 'Because'
          }
        },
        expected: true
      },
      {
        props: {
          Obligated: 'No'
        },
        expected: true
      },
      {
        props: {
          Obligated: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OneTimeBenefitValidator(test.props).validObligatedExplanation()).toBe(test.expected)
    })
  })

  it('should validate future benefit', function () {
    const tests = [
      {
        props: {
          Begin: {
            month: '1',
            day: '1',
            year: '2010'
          },
          Frequency: 'Weekly',
          Country: {
            value: 'Germany'
          },
          Value: {
            value: '2000'
          },
          Reason: {
            value: 'Foo'
          },
          Obligated: 'Yes',
          ObligatedExplanation: {
            value: 'Because'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new FutureBenefitValidator(test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate future benefit obligated explanation', function () {
    const tests = [
      {
        props: {
          Obligated: 'Yes',
          ObligatedExplanation: {
            value: 'Because'
          }
        },
        expected: true
      },
      {
        props: {
          Obligated: 'No'
        },
        expected: true
      },
      {
        props: {
          Obligated: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new FutureBenefitValidator(test.props).validObligatedExplanation()).toBe(test.expected)
    })
  })

  it('should validate continuing benefit', function () {
    const tests = [
      {
        props: {
          Began: {
            month: '1',
            day: '1',
            year: '2010'
          },
          End: {
            month: '1',
            day: '1',
            year: '2020'
          },
          Frequency: 'Weekly',
          Country: {
            value: 'Germany'
          },
          Value: {
            value: '2000'
          },
          Reason: {
            value: 'Foo'
          },
          Obligated: 'Yes',
          ObligatedExplanation: {
            value: 'Because'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new ContinuingBenefitValidator(test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate continuing benefit obligated explanation', function () {
    const tests = [
      {
        props: {
          Obligated: 'Yes',
          ObligatedExplanation: {
            value: 'Because'
          }
        },
        expected: true
      },
      {
        props: {
          Obligated: 'No'
        },
        expected: true
      },
      {
        props: {
          Obligated: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ContinuingBenefitValidator(test.props).validObligatedExplanation()).toBe(test.expected)
    })
  })

  it('should validate continuing benefit other frequency', function () {
    const tests = [
      {
        props: {
          Frequency: 'Annually'
        },
        expected: true
      },
      {
        props: {
          Frequency: 'Nope'
        },
        expected: false
      },
      {
        props: {
          Frequency: 'Other',
          OtherFrequency: {
            value: 'Something else'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new ContinuingBenefitValidator(test.props).validFrequency()).toBe(test.expected)
    })
  })

  it('should validate future benefit other frequency', function () {
    const tests = [
      {
        props: {
          Frequency: 'Annually'
        },
        expected: true
      },
      {
        props: {
          Frequency: 'Nope'
        },
        expected: false
      },
      {
        props: {
          Frequency: 'Other',
          OtherFrequency: {
            value: 'Something else'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new FutureBenefitValidator(test.props).validFrequency()).toBe(test.expected)
    })
  })
})
