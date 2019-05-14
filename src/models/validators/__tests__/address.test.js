import address from '../address'

describe('The address validator', () => {
  it('fails an invalid address', () => {
    const testData = {
      Location: {
        street: null,
        city: 'Boston',
        state: 'NY',
        zipcode: '12345',
      },
    }

    expect(address(testData)).toBeTruthy()
  })

  it('passes a valid address', () => {
    const testData = {
      Location: {
        street: '123 Main St',
        street2: 'Apt 2B',
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'United States',
        county: 'Manhattan',
      },
    }

    expect(address(testData)).toBeNull()
  })
})
