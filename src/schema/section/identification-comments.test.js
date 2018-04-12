import { unschema } from '../schema'
import { identificationComments } from './identification-comments'

describe('Schema for identification comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(identificationComments(data))).toEqual(data)
  })
})
