import phone from '../phone'

describe('The phone validator', () => {
  it('fails an invalid phone number', () => {
    const testData = {
      Telephone: 'test',
    }

    expect(phone(testData)).toBeTruthy()
  })

  it('passes a valid phone number', () => {
    const testData = {
      Telephone: {
        number: '1234567890',
        timeOfDay: 'Evening',
        type: 'Domestic',
      },
    }

    expect(phone(testData)).toBeNull()
  })
})
