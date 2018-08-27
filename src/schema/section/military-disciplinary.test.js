import { unschema } from '../schema'
import { militaryDisciplinary } from './military-disciplinary'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasDisciplinary: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Date: {},
              Offenses: {},
              Name: {},
              Court: {},
              Outcome: {}
            }
          }
        ]
      }
    }

    expect(unschema(militaryDisciplinary(data))).toEqual(data)
  })
})
