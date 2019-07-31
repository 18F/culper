import birthplace from 'models/shared/locations/birthplace'
import location from '../location'

describe('The location validator', () => {
  it('fails if no validator is passed', () => {
    const testData = { test: '123' }
    expect(location(testData, {})).toEqual('INVALID_VALIDATOR')
  })

  it('fails if the data is not valid for the given location model', () => {
    const testData = { test: '123' }
    const options = { validator: birthplace }
    expect(location(testData, options)).toEqual([
      'city.presence.REQUIRED',
      'country.presence.REQUIRED',
      'county.presence.REQUIRED',
    ])
  })

  it('passes if the data is valid for the given location model', () => {
    const testData = {
      city: 'Boston',
      state: 'MA',
      country: 'United States',
      county: 'Boston',
    }
    const options = { validator: birthplace }
    expect(location(testData, options)).toBeNull()
  })

  it('passes if the country is an object', () => {
    const testData = {
      city: 'Boston',
      state: 'MA',
      country: {
        value: 'United States',
      },
      county: 'Boston',
    }

    const options = { validator: birthplace }
    expect(location(testData, options)).toBeNull()
  })

  it('passes if the country is an array', () => {
    const testData = {
      city: 'Boston',
      state: 'MA',
      country: {
        value: ['United States'],
      },
      county: 'Boston',
    }

    const options = { validator: birthplace }
    expect(location(testData, options)).toBeNull()
  })
})
