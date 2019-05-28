import accordion from '../accordion'

describe('The accordion validator', () => {
  it('fails if items is undefined', () => {
    const testData = { items: undefined }
    expect(accordion(testData)).toBeTruthy()
  })

  it('fails if there are no items', () => {
    const testData = { items: [] }
    expect(accordion(testData)).toBeTruthy()
  })

  it('fails if there is no validator', () => {
    const testData = { items: [{ Item: 'Thing' }] }
    expect(accordion(testData)).toBeTruthy()
  })

  it('fails if any of the items fail the validator', () => {
    const testData = {
      items: [
        { Item: { value: 'Thing' } },
        { Item: { value: 'email@gmail.com' } },
        { Item: { value: '' } },
      ],
    }

    const validator = { value: { email: true } }
    expect(accordion(testData, { validator })).toBeTruthy()
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
      expect(accordion(testData, { validator, length: { minimum: 3 } })).toBeTruthy()
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
})
