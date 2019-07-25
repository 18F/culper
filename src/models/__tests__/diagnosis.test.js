import { validateModel } from 'models/validate'
import diagnosis from 'models/diagnosis'

describe('The diagnosis model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Condition.presence.REQUIRED',
      'Diagnosed.presence.REQUIRED',
      'Treatment.presence.REQUIRED',
      'Effective.presence.REQUIRED',
      'TreatmentFacility.presence.REQUIRED',
    ]

    expect(validateModel(testData, diagnosis))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Condition must have a value', () => {
    const testData = {
      Condition: { value: '' },
    }
    const expectedErrors = [
      'Condition.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, diagnosis))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Diagnosed must be a valid date range', () => {
    const testData = {
      Diagnosed: { value: '123456789' },
    }
    const expectedErrors = [
      'Diagnosed.daterange.from.presence.REQUIRED',
      'Diagnosed.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, diagnosis))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Treatment must be a valid treatment', () => {
    const testData = {
      Treatment: { value: 'Test' },
    }
    const expectedErrors = [
      'Treatment.model.Name.presence.REQUIRED',
      'Treatment.model.Phone.presence.REQUIRED',
      'Treatment.model.Address.presence.REQUIRED',
    ]

    expect(validateModel(testData, diagnosis))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentFacility must be a valid treatment', () => {
    const testData = {
      TreatmentFacility: { value: 'Test' },
    }
    const expectedErrors = [
      'TreatmentFacility.model.Name.presence.REQUIRED',
      'TreatmentFacility.model.Phone.presence.REQUIRED',
      'TreatmentFacility.model.Address.presence.REQUIRED',
    ]

    expect(validateModel(testData, diagnosis))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Effective must have a valid value', () => {
    const testData = {
      Effective: { value: 'test' },
    }
    const expectedErrors = [
      'Effective.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, diagnosis))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Effective is "No"', () => {
    it('Explanation must have a value', () => {
      const testData = {
        Effective: { value: 'No' },
        Explanation: { value: '' },
      }
      const expectedErrors = [
        'Explanation.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, diagnosis))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid diagnosis', () => {
      const testData = {
        Condition: { value: 'Test' },
        Diagnosed: {
          from: { year: 2010, month: 2, day: 20 },
          present: true,
        },
        Treatment: {
          Name: { value: 'Test name' },
          Phone: {
            number: '1234567890',
            timeOfDay: 'Both',
            type: 'Domestic',
          },
          Address: {
            street: '39 Facility St',
            city: 'New York',
            state: 'NY',
            zipcode: '10025',
            country: 'United States',
          },
        },
        TreatmentFacility: {
          Name: { value: 'Test name' },
          Phone: {
            number: '1234567890',
            timeOfDay: 'Both',
            type: 'Domestic',
          },
          Address: {
            street: '39 Facility St',
            city: 'New York',
            state: 'NY',
            zipcode: '10025',
            country: 'United States',
          },
        },
        Effective: { value: 'No' },
        Explanation: { value: 'Test explanation' },
      }

      expect(validateModel(testData, diagnosis)).toEqual(true)
    })
  })

  describe('if ExistingCondition option is true', () => {
    it('Condition is not required', () => {
      const testData = {}
      const expectedErrors = [
        'Condition.presence.REQUIRED',
      ]

      expect(validateModel(testData, diagnosis, { existingCondition: true }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Effective is not required', () => {
      const testData = {}
      const expectedErrors = [
        'Effective.presence.REQUIRED',
      ]

      expect(validateModel(testData, diagnosis, { existingCondition: true }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid diagnosis', () => {
      const testData = {
        Diagnosed: {
          from: { year: 2010, month: 2, day: 20 },
          present: true,
        },
        Treatment: {
          Name: { value: 'Test name' },
          Phone: {
            number: '1234567890',
            timeOfDay: 'Both',
            type: 'Domestic',
          },
          Address: {
            street: '39 Facility St',
            city: 'New York',
            state: 'NY',
            zipcode: '10025',
            country: 'United States',
          },
        },
        TreatmentFacility: {
          Name: { value: 'Test name' },
          Phone: {
            number: '1234567890',
            timeOfDay: 'Both',
            type: 'Domestic',
          },
          Address: {
            street: '39 Facility St',
            city: 'New York',
            state: 'NY',
            zipcode: '10025',
            country: 'United States',
          },
        },
      }

      expect(validateModel(testData, diagnosis, { existingCondition: true }))
        .toEqual(true)
    })
  })

  it('passes a valid diagnosis', () => {
    const testData = {
      Condition: { value: 'Test' },
      Diagnosed: {
        from: { year: 2010, month: 2, day: 20 },
        present: true,
      },
      Treatment: {
        Name: { value: 'Test name' },
        Phone: {
          number: '1234567890',
          timeOfDay: 'Both',
          type: 'Domestic',
        },
        Address: {
          street: '39 Facility St',
          city: 'New York',
          state: 'NY',
          zipcode: '10025',
          country: 'United States',
        },
      },
      TreatmentFacility: {
        Name: { value: 'Test name' },
        Phone: {
          number: '1234567890',
          timeOfDay: 'Both',
          type: 'Domestic',
        },
        Address: {
          street: '39 Facility St',
          city: 'New York',
          state: 'NY',
          zipcode: '10025',
          country: 'United States',
        },
      },
      Effective: { value: 'Yes' },
    }

    expect(validateModel(testData, diagnosis)).toEqual(true)
  })
})
