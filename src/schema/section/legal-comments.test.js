import { unschema } from '../schema'
import { legalComments } from './legal-comments'

describe('Schema for legal comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(legalComments(data))).toEqual(data)
  })
})
