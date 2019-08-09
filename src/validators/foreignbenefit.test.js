import ForeignBenefitValidator, {
  OneTimeBenefitValidator,
  FutureBenefitValidator,
  ContinuingBenefitValidator,
  OtherBenefitValidator,
} from './foreignbenefit'

describe('Foreign Born Benefits', () => {
  it('should validate benefit activities', () => {
    const tests = [
      {
        props: {
          InterestTypes: { values: ['Yourself'] },
          BenefitType: { value: 'Other' },
          OtherBenefitType: {
            value: 'Other',
          },
          BenefitFrequency: { value: 'OneTime' },
          OneTimeBenefit: {
            Received: {
              month: '1',
              day: '1',
              year: '2010',
            },
            Country: {
              value: 'Germany',
            },
            Value: {
              value: '2000',
            },
            Reason: {
              value: 'Foo',
            },
            Obligated: { value: 'Yes' },
            ObligatedExplanation: {
              value: 'Because',
            },
          },
        },
        expected: true,
      },
      {
        props: {
          InterestTypes: { values: ['Yourself'] },
          BenefitType: { value: 'Educational' },
          BenefitFrequency: { value: 'Future' },
          FutureBenefit: {
            Began: {
              month: '1',
              day: '1',
              year: '2030',
            },
            Frequency: { value: 'Other' },
            OtherFrequency: {
              value: 'Other',
            },
            Country: {
              value: 'Germany',
            },
            Value: {
              value: '2000',
            },
            Reason: {
              value: 'Foo',
            },
            Obligated: { value: 'Yes' },
            ObligatedExplanation: {
              value: 'Because',
            },
          },
        },
        expected: true,
      },
      {
        props: {
          InterestTypes: { values: ['Yourself'] },
          BenefitType: { value: 'Educational' },
          BenefitFrequency: { value: 'Continuing' },
          ContinuingBenefit: {
            Began: {
              month: '1',
              day: '1',
              year: '2010',
            },
            End: {
              month: '1',
              day: '1',
              year: '2020',
            },
            Frequency: { value: 'Weekly' },
            Country: {
              value: 'Germany',
            },
            Value: {
              value: '2000',
            },
            Reason: {
              value: 'Foo',
            },
            Obligated: { value: 'Yes' },
            ObligatedExplanation: {
              value: 'Because',
            },
          },
        },
        expected: true,
      },
      {
        props: {
          InterestTypes: { values: ['Yourself'] },
          BenefitType: { value: 'Educational' },
          BenefitFrequency: { value: 'Other' },
          OtherBenefit: {
            Began: {
              month: '1',
              day: '1',
              year: '2010',
            },
            End: {
              month: '1',
              day: '1',
              year: '2020',
            },
            Frequency: { value: 'Weekly' },
            Country: {
              value: 'Germany',
            },
            Value: {
              value: '2000',
            },
            Reason: {
              value: 'Foo',
            },
            Obligated: { value: 'Yes' },
            ObligatedExplanation: {
              value: 'Because',
            },
            OtherFrequencyTypeExplanation: {
              value: 'Some Explanation',
            },
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new ForeignBenefitValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate invalid benefit frequency ', () => {
    const tests = [
      {
        props: {
          InterestTypes: { values: ['Yourself'] },
          BenefitType: { value: 'Educational' },
          BenefitFrequency: { value: 'Does not exist' },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(new ForeignBenefitValidator(test.props).validBenefit()).toBe(
        test.expected
      )
    })
  })

  it('should validate benefit types', () => {
    const tests = [
      {
        props: {
          BenefitType: { value: 'Educational' },
        },
        expected: true,
      },
      {
        props: {
          BenefitType: { value: 'Medical' },
        },
        expected: true,
      },
      {
        props: {
          BenefitType: { value: 'Retirement' },
        },
        expected: true,
      },
      {
        props: {
          BenefitType: { value: 'DoesntExist' },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(new ForeignBenefitValidator(test.props).validBenefitType()).toBe(
        test.expected
      )
    })
  })

  it('should validate one time benefit', () => {
    const tests = [
      {
        props: {
          Received: {
            month: '1',
            day: '1',
            year: '2010',
          },
          Country: {
            value: 'Germany',
          },
          Value: {
            value: '2000',
          },
          Reason: {
            value: 'Foo',
          },
          Obligated: { value: 'Yes' },
          ObligatedExplanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new OneTimeBenefitValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate one time obligated explanation', () => {
    const tests = [
      {
        props: {
          Obligated: { value: 'Yes' },
          ObligatedExplanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
      {
        props: {
          Obligated: { value: 'No' },
        },
        expected: true,
      },
      {
        props: {
          Obligated: { value: 'Nope' },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        new OneTimeBenefitValidator(test.props).validObligatedExplanation()
      ).toBe(test.expected)
    })
  })

  it('should validate future benefit', () => {
    const tests = [
      {
        props: {
          Began: {
            month: '1',
            day: '1',
            year: '2030',
          },
          Frequency: { value: 'Weekly' },
          Country: {
            value: 'Germany',
          },
          Value: {
            value: '2000',
          },
          Reason: {
            value: 'Foo',
          },
          Obligated: { value: 'Yes' },
          ObligatedExplanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new FutureBenefitValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate future benefit obligated explanation', () => {
    const tests = [
      {
        props: {
          Obligated: { value: 'Yes' },
          ObligatedExplanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
      {
        props: {
          Obligated: { value: 'No' },
        },
        expected: true,
      },
      {
        props: {
          Obligated: { value: 'Nope' },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        new FutureBenefitValidator(test.props).validObligatedExplanation()
      ).toBe(test.expected)
    })
  })

  it('should validate continuing benefit', () => {
    const tests = [
      {
        props: {
          Began: {
            month: '1',
            day: '1',
            year: '2010',
          },
          End: {
            month: '1',
            day: '1',
            year: '2020',
          },
          Frequency: { value: 'Weekly' },
          Country: {
            value: 'Germany',
          },
          Value: {
            value: '2000',
          },
          Reason: {
            value: 'Foo',
          },
          Obligated: { value: 'Yes' },
          ObligatedExplanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new ContinuingBenefitValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate continuing benefit obligated explanation', () => {
    const tests = [
      {
        props: {
          Obligated: { value: 'Yes' },
          ObligatedExplanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
      {
        props: {
          Obligated: { value: 'No' },
        },
        expected: true,
      },
      {
        props: {
          Obligated: { value: 'Nope' },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        new ContinuingBenefitValidator(test.props).validObligatedExplanation()
      ).toBe(test.expected)
    })
  })

  it('should validate continuing benefit other frequency', () => {
    const tests = [
      {
        props: {
          Frequency: { value: 'Annually' },
        },
        expected: true,
      },
      {
        props: {
          Frequency: { value: 'Nope' },
        },
        expected: false,
      },
      {
        props: {
          Frequency: { value: 'Other' },
          OtherFrequency: {
            value: 'Something else',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new ContinuingBenefitValidator(test.props).validFrequency()).toBe(
        test.expected
      )
    })
  })

  it('should validate future benefit other frequency', () => {
    const tests = [
      {
        props: {
          Frequency: { value: 'Annually' },
        },
        expected: true,
      },
      {
        props: {
          Frequency: { value: 'Nope' },
        },
        expected: false,
      },
      {
        props: {
          Frequency: { value: 'Other' },
          OtherFrequency: {
            value: 'Something else',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new FutureBenefitValidator(test.props).validFrequency()).toBe(
        test.expected
      )
    })
  })

  it('should validate other benefit other frequency', () => {
    const tests = [
      {
        props: {
          Frequency: { value: 'Annually' },
        },
        expected: true,
      },
      {
        props: {
          Frequency: { value: 'Nope' },
        },
        expected: false,
      },
      {
        props: {
          Frequency: { value: 'Other' },
          OtherFrequency: {
            value: 'Something else',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new OtherBenefitValidator(test.props).validFrequency()).toBe(
        test.expected
      )
    })
  })
})
