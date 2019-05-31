import { validateModel } from 'models/validate'
import offense from '../otherOffense'

describe('The offense model', () => {
  it('the Date field is required', () => {
    const testData = {}
    const expectedErrors = ['Date.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Date field must be a valid date', () => {
    const testData = {
      Date: 'not a date',
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Description field is required', () => {
    const testData = {}
    const expectedErrors = ['Description.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Description field must have a value', () => {
    const testData = { Description: 'something' }
    const expectedErrors = ['Description.hasValue']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the InvolvedViolence field must have a valid value', () => {
    const testData = { InvolvedViolence: { value: 'true' } }
    const expectedErrors = ['InvolvedViolence.hasValue']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the InvolvedFirearms field must have a valid value', () => {
    const testData = { InvolvedFirearms: { value: 'false' } }
    const expectedErrors = ['InvolvedFirearms.hasValue']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the InvolvedSubstances field must have a valid value', () => {
    const testData = { InvolvedSubstances: { value: 100 } }
    const expectedErrors = ['InvolvedSubstances.hasValue']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtName field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtName.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtName field must have a value', () => {
    const testData = {
      CourtName: { value: '' },
    }
    const expectedErrors = ['CourtName.hasValue']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtAddress field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtAddress.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtAddress field must be a valid address', () => {
    const testData = {
      CourtAddress: { city: 'New York', state: 'MA', country: 'United States' },
    }
    const expectedErrors = ['CourtAddress.location']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Charges field is required', () => {
    const testData = {}
    const expectedErrors = ['Charges.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Charges field must have at least one item', () => {
    const testData = {
      Charges: { items: [] },
    }
    const expectedErrors = ['Charges.accordion']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the WasSentenced field is required', () => {
    const testData = {}
    const expectedErrors = ['WasSentenced.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the WasSentenced field must have a valid value', () => {
    const testData = {
      WasSentenced: { value: 'invalid' },
    }
    const expectedErrors = ['WasSentenced.hasValue']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Sentenced is Yes', () => {
    it('the Sentence field is required', () => {
      const testData = {
        WasSentenced: { value: 'Yes' },
      }
      const expectedErrors = ['Sentence.required']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Sentence field must be a valid Sentence', () => {
      const testData = {
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
      const expectedErrors = ['Sentence.model']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AwaitingTrial field is not required', () => {
      const testData = {
        WasSentenced: { value: 'Yes' },
      }
      const expectedErrors = ['AwaitingTrial.required']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AwaitingTrialExplanation field is not required', () => {
      const testData = {
        WasSentenced: { value: 'Yes' },
      }
      const expectedErrors = ['AwaitingTrialExplanation.required']

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
                CourtDate: { year: 2017, month: 12 },
              },
            },
          ],
        },
        WasSentenced: { value: 'Yes' },
        Sentence: {
          Description: { value: 'Something' },
          ExceedsYear: { value: 'No' },
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
        WasSentenced: { value: 'No' },
      }
      const expectedErrors = ['Sentence.required']

      expect(validateModel(testData, offense))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AwaitingTrial field is required', () => {
      const testData = {
        WasSentenced: { value: 'No' },
      }
      const expectedErrors = ['AwaitingTrial.required']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AwaitingTrial field must have a valid value', () => {
      const testData = {
        WasSentenced: { value: 'No' },
        AwaitingTrial: 'Yes',
      }
      const expectedErrors = ['AwaitingTrial.hasValue']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AwaitingTrialExplanation field is required', () => {
      const testData = {
        WasSentenced: { value: 'No' },
        AwaitingTrialExplanation: undefined,
      }
      const expectedErrors = ['AwaitingTrialExplanation.required']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the AwaitingTrialExplanation field must have a value', () => {
      const testData = {
        WasSentenced: { value: 'No' },
        AwaitingTrialExplanation: 'something',
      }
      const expectedErrors = ['AwaitingTrialExplanation.hasValue']

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
                CourtDate: { year: 2017, month: 12 },
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
