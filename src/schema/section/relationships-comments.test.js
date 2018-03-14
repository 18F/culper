import { unschema } from '../schema'
import { relationshipsComments } from './relationships-comments'

describe('Schema for relationships comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(relationshipsComments(data))).toEqual(data)
  })
})
