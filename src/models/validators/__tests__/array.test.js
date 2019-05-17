import array from '../array'

describe('The array validator', () => {
  it('fails if there are no values', () => {
    const testData = {}
    expect(array(testData)).toBeTruthy()
  })

  it('fails if there is no validator', () => {
    const testData = { values: [] }
    expect(array(testData)).toBeTruthy()
  })

  it('fails if any item in the array fails the validation', () => {
    const testValidator = {
      email: true,
    }

    const testData = {
      values: [
        'myemail@gmail.com',
        'thisisnotanemail',
        'some@person.co',
      ],
    }

    expect(array(testData, { validator: testValidator })).toBeTruthy()
  })

  it('passes if all items in the array pass the validation', () => {
    const testValidator = {
      email: true,
    }

    const testData = {
      values: [
        'myemail@gmail.com',
        'thisisanemail@xy.za',
        'some@person.co',
      ],
    }

    expect(array(testData, { validator: testValidator })).toBeNull()
  })

  it('passes if the array is empty', () => {
    const testValidator = {
      email: true,
    }

    const testData = {
      values: [],
    }

    expect(array(testData, { validator: testValidator })).toBeNull()
  })

  describe('with a length validator option', () => {
    it('fails if the array length does not validate', () => {
      const testValidator = {
        email: true,
      }

      const testData = {
        values: [],
      }

      const lengthValidator = { minimum: 2 }

      expect(array(testData, { validator: testValidator, length: lengthValidator })).toBeTruthy()
    })
  })
})
