import { validateModel } from 'models/validate'
import offense from '../offense'

describe('The offense model', () => {
  it('the Date field is required', () => {
    const testData = {}
    const expectedErrors = ['Date.presence.REQUIRED']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Date field must be a valid date', () => {
    const testData = {
      Date: 'not a date',
    }
    const expectedErrors = [
      'Date.date.day.presence.REQUIRED',
      'Date.date.month.presence.REQUIRED',
      'Date.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Date: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, offense, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be in the future', () => {
    const testData = {
      Date: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Description field is required', () => {
    const testData = {}
    const expectedErrors = ['Description.presence.REQUIRED']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Description field must have a value', () => {
    const testData = { Description: 'something' }
    const expectedErrors = ['Description.hasValue.MISSING_VALUE']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the InvolvedViolence field must have a valid value', () => {
    const options = { requireLegalOffenseInvolvements: true }
    const testData = { InvolvedViolence: { value: 'true' } }
    const expectedErrors = ['InvolvedViolence.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, offense, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the InvolvedFirearms field must have a valid value', () => {
    const options = { requireLegalOffenseInvolvements: true }
    const testData = { InvolvedFirearms: { value: 'false' } }
    const expectedErrors = ['InvolvedFirearms.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, offense, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the InvolvedSubstances field must have a valid value', () => {
    const options = { requireLegalOffenseInvolvements: true }
    const testData = { InvolvedSubstances: { value: 100 } }
    const expectedErrors = ['InvolvedSubstances.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, offense, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field is required', () => {
    const testData = { Address: null }
    const expectedErrors = ['Address.presence.REQUIRED']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid address', () => {
    const testData = { Address: { street: '123 Offense St' } }
    const expectedErrors = [
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the WasCited field must have a valid value', () => {
    const testData = { WasCited: { value: true } }
    const expectedErrors = ['WasCited.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if WasCited is Yes', () => {
    it('the CitedBy field is required', () => {
      const testData = {
        WasCited: { value: 'Yes' },
      }
      const expectedErrors = ['CitedBy.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CitedBy field must have a value', () => {
      const testData = {
        WasCited: { value: 'Yes' },
        CitedBy: 'someone',
      }
      const expectedErrors = ['CitedBy.hasValue.MISSING_VALUE']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AgencyAddress field is required', () => {
      const testData = {
        WasCited: { value: 'Yes' },
      }
      const expectedErrors = ['AgencyAddress.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AgencyAddress field must be a valid address', () => {
      const testData = {
        WasCited: { value: 'Yes' },
        AgencyAddress: { country: 'United States' },
      }
      const expectedErrors = [
        'AgencyAddress.location.city.presence.REQUIRED',
        'AgencyAddress.location.state.presence.REQUIRED',
        'AgencyAddress.location.zipcode.presence.REQUIRED',
      ]

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Offense', () => {
      const testData = {
        Date: { year: 2015, month: 6, day: 2 },
        Description: { value: 'I did something bad' },
        InvolvedViolence: { value: 'Yes' },
        InvolvedFirearms: { value: 'No' },
        InvolvedSubstances: { value: 'Yes' },
        Address: {
          city: 'Somecity',
          state: 'NY',
          zipcode: '10022',
          country: { value: 'United States' },
        },
        WasCited: { value: 'Yes' },
        CitedBy: { value: 'the police' },
        AgencyAddress: {
          city: 'Somecity',
          state: 'NY',
          zipcode: '10022',
          country: { value: 'United States' },
        },
        WasCharged: { value: 'No' },
        Explanation: { value: 'It wasnt that bad' },
      }

      expect(validateModel(testData, offense)).toEqual(true)
    })
  })

  describe('if WasCited is No', () => {
    it('the CitedBy field is not required', () => {
      const testData = {
        WasCited: { value: 'No' },
      }
      const expectedErrors = ['CitedBy.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AgencyAddress field is not required', () => {
      const testData = {
        WasCited: { value: 'No' },
      }
      const expectedErrors = ['AgencyAddress.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Offense', () => {
      const testData = {
        Date: { year: 2015, month: 6, day: 2 },
        Description: { value: 'I did something bad' },
        InvolvedViolence: { value: 'Yes' },
        InvolvedFirearms: { value: 'No' },
        InvolvedSubstances: { value: 'Yes' },
        Address: {
          city: 'Somecity',
          state: 'NY',
          zipcode: '10022',
          country: { value: 'United States' },
        },
        WasCited: { value: 'No' },
        WasCharged: { value: 'No' },
        Explanation: { value: 'It wasnt that bad' },
      }

      expect(validateModel(testData, offense)).toEqual(true)
    })
  })

  it('the WasCharged field must have a valid value', () => {
    const testData = { WasCharged: { value: false } }
    const expectedErrors = ['WasCharged.hasValue.MISSING_VALUE']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if WasCharged is Yes', () => {
    it('the Explanation field is not required', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
      }
      const expectedErrors = ['Explanation.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CourtName field is required', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
      }
      const expectedErrors = ['CourtName.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CourtName field must have a value', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
        CourtName: { value: '' },
      }
      const expectedErrors = ['CourtName.hasValue.MISSING_VALUE']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CourtAddress field is required', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
      }
      const expectedErrors = ['CourtAddress.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CourtAddress field must be a valid address', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
        CourtAddress: { city: 'New York', state: 'MA', country: 'United States' },
      }
      const expectedErrors = [
        'CourtAddress.location.zipcode.presence.REQUIRED',
      ]

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Charges field is required', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
      }
      const expectedErrors = ['Charges.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Charges field must have at least one item', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
        Charges: { items: [] },
      }
      const expectedErrors = ['Charges.accordion.MISSING_ITEMS']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the WasSentenced field is required', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
      }
      const expectedErrors = ['WasSentenced.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the WasSentenced field must have a valid value', () => {
      const testData = {
        WasCharged: { value: 'Yes' },
        WasSentenced: { value: 'invalid' },
      }
      const expectedErrors = ['WasSentenced.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Sentenced is Yes', () => {
      it('the Sentence field is required', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'Yes' },
        }
        const expectedErrors = ['Sentence.presence.REQUIRED']

        expect(validateModel(testData, offense))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the Sentence field must be a valid Sentence', () => {
        const options = {
          requireLegalOffenseSentenced: true,
          requireLegalOffenseIncarcerated: true,
        }
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'Yes' },
          Sentence: {
            Description: {},
            ExceedsYear: { value: '' },
            Incarcerated: { value: 'Yes' },
            IncarcerationDates: {
              from: { year: 1995, month: 2, day: 10 },
              to: { year: 2010, month: 10, day: 1 },
            },
          },
        }
        const expectedErrors = [
          'Sentence.model.Description.presence.REQUIRED',
          'Sentence.model.ExceedsYear.hasValue.MISSING_VALUE',
          'Sentence.model.ProbationDates.presence.REQUIRED',
        ]

        expect(validateModel(testData, offense, options))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the AwaitingTrial field is not required', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'Yes' },
        }
        const expectedErrors = ['AwaitingTrial.presence.REQUIRED']

        expect(validateModel(testData, offense))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the AwaitingTrialExplanation field is not required', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'Yes' },
        }
        const expectedErrors = ['AwaitingTrialExplanation.presence.REQUIRED']

        expect(validateModel(testData, offense))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid Offense', () => {
        const testData = {
          Date: { year: 2015, month: 6, day: 2 },
          Description: { value: 'I did something bad' },
          InvolvedViolence: { value: 'Yes' },
          InvolvedFirearms: { value: 'No' },
          InvolvedSubstances: { value: 'Yes' },
          Address: {
            city: 'Somecity',
            state: 'NY',
            zipcode: '10022',
            country: { value: 'United States' },
          },
          WasCited: { value: 'Yes' },
          CitedBy: { value: 'the police' },
          AgencyAddress: {
            city: 'Somecity',
            state: 'NY',
            zipcode: '10022',
            country: { value: 'United States' },
          },
          WasCharged: { value: 'Yes' },
          CourtName: { value: 'Test Court' },
          CourtAddress: {
            city: 'Somecity',
            state: 'NY',
            zipcode: '10022',
            country: { value: 'United States' },
          },
          Charges: {
            items: [
              {
                Item: {
                  ChargeType: { value: 'Felony' },
                  CourtCharge: { value: 'My charges' },
                  CourtOutcome: { value: 'The outcome' },
                  CourtDate: { year: 2017, day: 3, month: 12 },
                },
              },
            ],
          },
          WasSentenced: { value: 'Yes' },
          Sentence: {
            Description: { value: 'Something' },
            ExceedsYear: { value: 'Yes' },
            Incarcerated: { value: 'Yes' },
            ProbationDates: {
              from: { year: 2010, month: 2, day: 10 },
              to: { year: 2013, month: 10, day: 1 },
            },
            IncarcerationDates: {
              from: { year: 1995, month: 2, day: 10 },
              to: { year: 2010, month: 10, day: 1 },
            },
          },
        }

        expect(validateModel(testData, offense)).toEqual(true)
      })
    })

    describe('if Sentenced is No', () => {
      it('the Sentence field is not required', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' },
        }
        const expectedErrors = ['Sentence.presence.REQUIRED']

        expect(validateModel(testData, offense))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the AwaitingTrial field is required', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' },
        }
        const expectedErrors = ['AwaitingTrial.presence.REQUIRED']

        expect(validateModel(testData, offense))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the AwaitingTrial field must have a valid value', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' },
          AwaitingTrial: 'Yes',
        }
        const expectedErrors = ['AwaitingTrial.hasValue.MISSING_VALUE']

        expect(validateModel(testData, offense))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the AwaitingTrialExplanation field is required', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' },
          AwaitingTrialExplanation: undefined,
        }
        const expectedErrors = ['AwaitingTrialExplanation.presence.REQUIRED']

        expect(validateModel(testData, offense))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the AwaitingTrialExplanation field must have a value', () => {
        const testData = {
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' },
          AwaitingTrialExplanation: 'something',
        }
        const expectedErrors = ['AwaitingTrialExplanation.hasValue.MISSING_VALUE']

        expect(validateModel(testData, offense))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid Offense', () => {
        const testData = {
          Date: { year: 2015, month: 6, day: 2 },
          Description: { value: 'I did something bad' },
          InvolvedViolence: { value: 'Yes' },
          InvolvedFirearms: { value: 'No' },
          InvolvedSubstances: { value: 'Yes' },
          Address: {
            city: 'Somecity',
            state: 'NY',
            zipcode: '10022',
            country: { value: 'United States' },
          },
          WasCited: { value: 'Yes' },
          CitedBy: { value: 'the police' },
          AgencyAddress: {
            city: 'Somecity',
            state: 'NY',
            zipcode: '10022',
            country: { value: 'United States' },
          },
          WasCharged: { value: 'Yes' },
          CourtName: { value: 'Test Court' },
          CourtAddress: {
            city: 'Somecity',
            state: 'NY',
            zipcode: '10022',
            country: { value: 'United States' },
          },
          Charges: {
            items: [
              {
                Item: {
                  ChargeType: { value: 'Felony' },
                  CourtCharge: { value: 'My charges' },
                  CourtOutcome: { value: 'The outcome' },
                  CourtDate: { year: 2017, day: 3, month: 12 },
                },
              },
            ],
          },
          WasSentenced: { value: 'No' },
          AwaitingTrial: { value: 'Yes' },
          AwaitingTrialExplanation: { value: 'Something' },
        }

        expect(validateModel(testData, offense)).toEqual(true)
      })
    })
  })

  describe('if WasCharged is No', () => {
    it('the Explanation field is required', () => {
      const testData = {
        WasCharged: { value: 'No' },
      }
      const expectedErrors = ['Explanation.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Explanation field must have a value', () => {
      const testData = {
        WasCharged: { value: 'No' },
        Explanation: 'blah',
      }
      const expectedErrors = ['Explanation.hasValue.MISSING_VALUE']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CourtName field is not required', () => {
      const testData = {
        WasCharged: { value: 'No' },
      }
      const expectedErrors = ['CourtName.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the CourtAddress field is not required', () => {
      const testData = {
        WasCharged: { value: 'No' },
      }
      const expectedErrors = ['CourtAddress.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Charges field is not required', () => {
      const testData = {
        WasCharged: { value: 'No' },
      }
      const expectedErrors = ['Charges.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the WasSentenced field is not required', () => {
      const testData = {
        WasCharged: { value: 'No' },
      }
      const expectedErrors = ['WasSentenced.presence.REQUIRED']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Offense', () => {
      const testData = {
        Date: { year: 2015, month: 6, day: 2 },
        Description: { value: 'I did something bad' },
        InvolvedViolence: { value: 'Yes' },
        InvolvedFirearms: { value: 'No' },
        InvolvedSubstances: { value: 'Yes' },
        Address: {
          city: 'Somecity',
          state: 'NY',
          zipcode: '10022',
          country: { value: 'United States' },
        },
        WasCited: { value: 'Yes' },
        CitedBy: { value: 'the police' },
        AgencyAddress: {
          city: 'Somecity',
          state: 'NY',
          zipcode: '10022',
          country: { value: 'United States' },
        },
        WasCharged: { value: 'No' },
        Explanation: { value: 'It wasnt that bad' },
      }

      expect(validateModel(testData, offense)).toEqual(true)
    })
  })
})
