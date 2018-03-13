import { unschema } from '../schema'
import { citizenshipComments } from './citizenship-comments'

describe('Schema for citizenship comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(citizenshipComments(data))).toEqual(data)
  })
})
