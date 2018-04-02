import { unschema } from '../schema'
import { historyComments } from './history-comments'

describe('Schema for history comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(historyComments(data))).toEqual(data)
  })
})
