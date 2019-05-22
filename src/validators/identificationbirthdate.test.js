import IdentificationBirthDateValidator, {
  validateIdentificationBirthDate,
} from './identificationbirthdate'

describe('The IdentificationBirthDateValidator class', () => {
  it('should validate a birth date', () => {
    const testData = {
      Date: {
        year: '1980',
        month: '08',
        day: '14',
      },
    }

    expect(new IdentificationBirthDateValidator(testData).isValid()).toBe(true)
  })

  it('should fail an invalid birth date', () => {
    const testData = {
      Date: {
        year: '1980',
        day: '14',
      },
    }

    expect(new IdentificationBirthDateValidator(testData).isValid()).toBe(false)
  })

  it('should fail a birthdate that is too young', () => {
    const testData = {
      Date: {
        year: '2019',
        month: '08',
        day: '14',
      },
    }

    expect(new IdentificationBirthDateValidator(testData).isValid()).toBe(false)
  })
})

describe('The validateIdentificationBirthdate function', () => {
  it('should validate a birth date', () => {
    const testData = {
      Date: {
        year: '1980',
        month: '08',
        day: '14',
      },
    }

    expect(validateIdentificationBirthDate(testData)).toBe(true)
  })

  it('should fail an invalid birth date', () => {
    const testData = {
      Date: {
        year: '1980',
        day: '14',
      },
    }

    expect(validateIdentificationBirthDate(testData)).toBe(false)
  })

  it('should fail a birthdate that is too young', () => {
    const testData = {
      Date: {
        year: '2019',
        month: '08',
        day: '14',
      },
    }

    expect(validateIdentificationBirthDate(testData)).toBe(false)
  })
})
