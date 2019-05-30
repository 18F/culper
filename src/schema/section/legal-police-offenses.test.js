import { unschema } from '../schema'
import { legalPoliceOffenses } from './legal-police-offenses'

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
              Address: {
                country: null,
              },
              WasCited: {},
              CitedBy: {},
              AgencyAddress: {
                country: null,
              },
              WasCharged: {},
              Explanation: {},
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

    expect(unschema(legalPoliceOffenses(data))).toEqual(data)
  })
})
