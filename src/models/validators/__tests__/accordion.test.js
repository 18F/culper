import accordion from '../accordion'

describe('The accordion validator', () => {
  it('fails if items is undefined', () => {
    const testData = {}
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
})
