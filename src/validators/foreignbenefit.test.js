import ForeignBenefitValidator, { OneTimeBenefitValidator, FutureBenefitValidator, ContinuingBenefitValidator } from './foreignbenefit'

describe('Foreign Born Benefits', function () {
  it('should validate benefit activities', function () {
    const tests = [
      {
        props: {
          InterestTypes: ['Yourself'],
          BenefitType: 'Educational',
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
      expect(new ForeignBenefitValidator(null, test.props).isValid()).toBe(test.expected)
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
      expect(new ForeignBenefitValidator(null, test.props).validBenefit()).toBe(test.expected)
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
      expect(new OneTimeBenefitValidator(null, test.props).isValid()).toBe(test.expected)
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
      expect(new OneTimeBenefitValidator(null, test.props).validObligatedExplanation()).toBe(test.expected)
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
      expect(new FutureBenefitValidator(null, test.props).isValid()).toBe(test.expected)
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
      expect(new FutureBenefitValidator(null, test.props).validObligatedExplanation()).toBe(test.expected)
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
      expect(new ContinuingBenefitValidator(null, test.props).isValid()).toBe(test.expected)
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
      expect(new ContinuingBenefitValidator(null, test.props).validObligatedExplanation()).toBe(test.expected)
    })
  })
})
