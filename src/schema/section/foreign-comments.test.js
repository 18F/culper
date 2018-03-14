import { unschema } from '../schema'
import { foreignComments } from './foreign-comments'

describe('Schema for foreign comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(foreignComments(data))).toEqual(data)
  })
})
