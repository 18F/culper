import accordion from '../accordion'

describe('The accordion validator', () => {
  it('fails if items is undefined', () => {
    const testData = { items: undefined, branch: { value: 'No' } }
    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toEqual('MISSING_ITEMS')
  })

  it('fails if there are no items', () => {
    const testData = { items: [], branch: { value: 'No' } }
    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toEqual('MISSING_ITEMS')
  })

  it('fails if there is no validator', () => {
    const testData = { items: [{ Item: 'Thing' }] }
    expect(accordion(testData)).toEqual('INVALID_VALIDATOR')
  })

  it('fails if there is no branch value', () => {
    const testData = { items: [] }
    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toEqual('INVALID_BRANCH')
  })

  it('fails if the branch value is not "No"', () => {
    const testData = { items: [], branch: { value: 'Yes' } }
    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toEqual('INVALID_BRANCH')
  })

  it('fails if any of the items are missing an Item', () => {
    const testData = {
      items: [
        { Item: { value: 'email@gmail.com' } },
        { value: 'invalid' },
      ],
      branch: { value: 'No' },
    }

    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toEqual('INVALID_ITEM')
  })

  it('fails if any of the items fail the validator', () => {
    const testData = {
      items: [
        { Item: { value: 'Thing' } },
        { Item: { value: 'email@gmail.com' } },
        { Item: { value: '' } },
      ],
      branch: { value: 'No' },
    }

    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toEqual([
      'value.email.INVALID_EMAIL',
      'value.email.INVALID_EMAIL',
    ])
  })

  it('passes if all of the items pass the validator', () => {
    const testData = {
      items: [
        { Item: { value: 'myemail@yahoo.com' } },
        { Item: { value: 'email@gmail.com' } },
        { Item: { value: 'another@email.org' } },
      ],
      branch: { value: 'No' },
    }

    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toBeNull()
  })

  describe('with a length option', () => {
    it('fails if there are not enough items to pass the length validator', () => {
      const testData = {
        items: [
          { Item: { value: 'myemail@yahoo.com' } },
          { Item: { value: 'email@gmail.com' } },
        ],
        branch: { value: 'No' },
      }

      const validator = { value: { email: true } }
      expect(accordion(testData, { validator, length: { minimum: 3 } })).toEqual(['items.length.LENGTH_TOO_SHORT'])
    })

    it('passes if there are enough items to pass the length validator', () => {
      const testData = {
        items: [
          { Item: { value: 'myemail@yahoo.com' } },
          { Item: { value: 'email@gmail.com' } },
          { Item: { value: 'another@email.org' } },
        ],
        branch: { value: 'No' },
      }

      const validator = { value: { email: true } }
      expect(accordion(testData, { validator, length: { minimum: 3 } })).toBeNull()
    })
  })

  describe('with the ignoreBranch option', () => {
    it('does not fail if there is no branch value', () => {
      const testData = { items: [] }
      const validator = { value: { email: true } }
      expect(accordion(testData, { validator, ignoreBranch: true })).not.toEqual('INVALID_BRANCH')
    })

    it('does not fail if the branch value is not "No"', () => {
      const testData = { items: [], branch: { value: 'Yes' } }
      const validator = { value: { email: true } }
      expect(accordion(testData, { validator, ignoreBranch: true })).not.toEqual('INVALID_BRANCH')
    })

    it('passes a valid accordion with no branch', () => {
      const testData = {
        items: [
          { Item: { value: 'myemail@yahoo.com' } },
          { Item: { value: 'email@gmail.com' } },
          { Item: { value: 'another@email.org' } },
        ],
      }

      const validator = { value: { email: true } }
      expect(accordion(testData, { validator, ignoreBranch: true })).toBeNull()
    })
  })
})
