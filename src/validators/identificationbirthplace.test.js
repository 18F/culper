import IdentificationBirthPlaceValidator, {
  validateIdentificationBirthPlace,
} from './identificationbirthplace'

describe('The validateIdentificationBirthPlace function', () => {
  it('should validate a birth place', () => {
    const testData = {
      Location: {
        city: 'Boston',
        state: 'MA',
        county: 'Boston',
        country: 'United States',
      },
    }

    expect(validateIdentificationBirthPlace(testData)).toBe(true)
  })

  it('should validate a domestic birth place with city and state', () => {
    const testData = {
      Location: {
        city: 'Boston',
        state: 'MA',
        country: 'United States',
      },
    }

    expect(validateIdentificationBirthPlace(testData)).toBe(true)
  })

  it('should validate a domestic birth place with county and state', () => {
    const testData = {
      Location: {
        state: 'MA',
        county: 'Boston',
        country: 'United States',
      },
    }

    expect(validateIdentificationBirthPlace(testData)).toBe(true)
  })

  it('should validate a foreign birth place', () => {
    const testData = {
      Location: {
        city: 'Toronto',
        country: {
          value: ['Canada'],
        },
      },
    }

    expect(validateIdentificationBirthPlace(testData)).toBe(true)
  })

  it('should fail an invalid birth place', () => {
    const testData = {
      Location: {
        state: 'MA',
        country: '',
      },
    }

    expect(validateIdentificationBirthPlace(testData))
      .toEqual(expect.arrayContaining([
        'Location.location.city.presence.REQUIRED',
        'Location.location.country.presence.REQUIRED',
        'Location.location.county.presence.REQUIRED',
      ]))
  })
})
