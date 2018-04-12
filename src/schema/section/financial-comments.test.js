import { unschema } from '../schema'
import { financialComments } from './financial-comments'

describe('Schema for financial comments', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: { value: 'Yes' }
    }

    expect(unschema(financialComments(data))).toEqual(data)
  })
})
