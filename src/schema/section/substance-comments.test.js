import { unschema } from '../schema'
import { substanceComments } from './substance-comments'

describe('Schema for substance comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(substanceComments(data))).toEqual(data)
  })
})
