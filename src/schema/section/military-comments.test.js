import { unschema } from '../schema'
import { militaryComments } from './military-comments'

describe('Schema for military comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(militaryComments(data))).toEqual(data)
  })
})
