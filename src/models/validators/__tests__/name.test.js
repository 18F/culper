import name from '../name'

describe('The name validator', () => {
  it('fails an invalid name', () => {
    const testData = {
      Name: {
        first: 'Blah',
        middle: [],
      },
    }

    expect(name(testData)).toBeTruthy()
  })

  it('passes a valid name', () => {
    const testData = {
      Name: {
        first: 'Person',
        noMiddleName: true,
        last: 'Lastname',
      },
    }

    expect(name(testData)).toBeNull()
  })
})
