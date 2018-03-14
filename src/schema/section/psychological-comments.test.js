import { unschema } from '../schema'
import { psychologicalComments } from './psychological-comments'

describe('Schema for psychological comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(psychologicalComments(data))).toEqual(data)
  })
})
