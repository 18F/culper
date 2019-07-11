import branchCollection from '../branchCollection'

describe('The branch collection validator', () => {
  it('passes if there is no value', () => {
    const testData = undefined
    expect(branchCollection(testData)).toBeNull()
  })

  it('fails if there are no items', () => {
    const testData = {}
    expect(branchCollection(testData)).toBe('MISSING_ITEMS')
  })

  it('fails if the items array is empty', () => {
    const testData = { items: [] }
    expect(branchCollection(testData)).toBe('MISSING_ITEMS')
  })

  it('fails if no validator is passed', () => {
    const testData = { items: ['one', 'two', 'three'] }
    expect(branchCollection(testData)).toEqual('INVALID_VALIDATOR')
  })

  it('fails if none of the items have a "No" value', () => {
    const testData = {
      items: [
        {},
        'One',
        { Item: {} },
        { Item: { Has: 'Yes' } },
        { Item: { Has: { value: 'Yes' } } },
      ],
    }

    const validator = {
      Text: { presence: true },
    }

    expect(branchCollection(testData, { validator })).toBe('INCOMPLETE_COLLECTION')
  })

  it('fails if any of the items fail the validator', () => {
    const testData = {
      items: [
        { Item: { Has: { value: 'Yes' }, Text: 'Some text' } },
        { Item: { Has: { value: 'Yes' }, Test: 'Invalid' } },
        { Item: { Has: { value: 'No' } } },
      ],
    }

    const validator = {
      Text: { presence: true },
    }

    expect(branchCollection(testData, { validator })).toEqual(['Text.presence.REQUIRED'])
  })

  it('passes a valid list of items', () => {
    const testData = {
      items: [
        { Item: { Has: { value: 'Yes' }, Text: 'Some text' } },
        { Item: { Has: { value: 'Yes' }, Text: 'More text' } },
        { Item: { Has: { value: 'No' } } },
      ],
    }

    const validator = {
      Text: { presence: true },
    }

    expect(branchCollection(testData, { validator })).toBeNull()
  })
})
