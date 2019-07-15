import branchCollection from '../branchCollection'

describe('The branch collection validator', () => {
  it('passes if there is no value', () => {
    const testData = undefined
    expect(branchCollection(testData)).toBeNull()
  })

  it('fails if there are no items', () => {
    const testData = {}
    expect(branchCollection(testData, {})).toBe('Collection is empty')
  })

  it('fails if the items array is empty', () => {
    const testData = { items: [] }
    expect(branchCollection(testData, {})).toBe('Collection is empty')
  })

  it('fails if no validator is passed', () => {
    const testData = { items: ['one', 'two', 'three'] }
    expect(branchCollection(testData, {})).toBeTruthy()
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

    expect(branchCollection(testData, { validator })).toBe('Incomplete collection')
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

    expect(branchCollection(testData, { validator })).toBeTruthy()
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
