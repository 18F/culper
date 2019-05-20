import array from '../array'

describe('The array validator', () => {
  it('fails if any item in the array fails the validation', () => {
    const testValidator = {
      email: true,
    }

    const testData = [
      'myemail@gmail.com',
      'thisisnotanemail',
      'some@person.co',
    ]

    expect(array(testData, { validator: testValidator })).toBeTruthy()
  })

  it('passes if all items in the array pass the validation', () => {
    const testValidator = {
      email: true,
    }

    const testData = [
      'myemail@gmail.com',
      'thisisanemail@xy.za',
      'some@person.co',
    ]

    expect(array(testData, { validator: testValidator })).toBeNull()
  })

  it('passes if the array is empty', () => {
    const testValidator = {
      email: true,
    }

    const testData = []

    expect(array(testData, { validator: testValidator })).toBeNull()
  })
})
