import { unschema } from '../schema'
import { legalPoliceAdditionalOffenses } from './legal-police-additionaloffenses'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Date: {},
              Description: {},
              InvolvedViolence: {},
              InvolvedFirearms: {},
              InvolvedSubstances: {},
              CourtName: {},
              CourtAddress: {
                country: null,
              },
              CourtCharge: {},
              CourtOutcome: {},
              CourtDate: {},
              ChargeType: {},
              WasSentenced: {},
              Sentence: {
                Description: {},
                ExceedsYear: {},
                Incarcerated: {},
                IncarcerationDates: {
                  from: {},
                  to: {},
                  present: null,
                },
                IncarcerationDatesNA: {},
                ProbationDates: {
                  from: {},
                  to: {},
                  present: null,
                },
                ProbationDatesNA: {},
              },
              AwaitingTrial: {},
              AwaitingTrialExplanation: {},
            },
          },
        ],
      },
    }

    expect(unschema(legalPoliceAdditionalOffenses(data))).toEqual(data)
  })
})
