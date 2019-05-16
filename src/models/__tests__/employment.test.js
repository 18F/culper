import { validateModel } from 'models/validate'
import employment from 'models/employment'

describe('The employment model', () => {
  it('the EmploymentActivity field is required', () => {
    const testData = {}
    const expectedErrors = ['EmploymentActivity.required']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EmploymentActivity must be a valid value', () => {
    const testData = {
      EmploymentActivity: 'Some other thing',
    }
    const expectedErrors = ['EmploymentActivity.inclusion']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.required']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field must be a valid date range', () => {
    const testData = {
      Dates: {
        to: { year: 1990, month: 5, day: 12 },
        from: { year: 2000, month: 12, day: 1 },
        present: false,
      },
    }

    const expectedErrors = ['Dates.daterange']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if EmploymentActivity is Unemployment', () => {
    it('the Reference fields are required', () => {
      const testData = {
        EmploymentActivity: 'Unemployment',
      }

      const expectedErrors = [
        'ReferenceName.required',
        'ReferencePhone.required',
        'ReferenceAddress.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceName must be a valid name', () => {
      const testData = {
        EmploymentActivity: 'Unemployment',
        ReferenceName: {
          last: 'Lastname',
        },
      }

      const expectedErrors = [
        'ReferenceName.name',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhone must be a valid phone', () => {
      const testData = {
        EmploymentActivity: 'Unemployment',
        ReferencePhone: {
          number: 'abcde',
        },
      }

      const expectedErrors = [
        'ReferencePhone.phone',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceAddress must be a valid address', () => {
      const testData = {
        EmploymentActivity: 'Unemployment',
        ReferenceAddress: 'Not an address',
      }

      const expectedErrors = [
        'ReferenceAddress.address',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: 'Unemployment',
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          to: { year: 2000, month: 12, day: 1 },
          present: false,
        },
        ReferenceName: {
          first: 'Person',
          noMiddleName: true,
          last: 'Name',
        },
        ReferencePhone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        ReferenceAddress: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })
  })

  describe('if EmploymentActivity is SelfEmployment', () => {
    it('the Title field is required', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
      }

      const expectedErrors = [
        'Title.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Status field is required', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
      }

      const expectedErrors = [
        'Status.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field is required', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
      }

      const expectedErrors = [
        'Address.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field must be a valid address', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
        Address: 'Not a valid address',
      }

      const expectedErrors = [
        'Address.address',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field is required', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
      }

      const expectedErrors = [
        'Telephone.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must be a valid phone', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
        Telephone: {
          number: 'notvalid',
        },
      }

      const expectedErrors = [
        'Telephone.phone',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Employment field is required', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
      }

      const expectedErrors = [
        'Employment.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Reference fields are required', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
      }

      const expectedErrors = [
        'ReferenceName.required',
        'ReferencePhone.required',
        'ReferenceAddress.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceName must be a valid name', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
        ReferenceName: {
          last: 'Lastname',
        },
      }

      const expectedErrors = [
        'ReferenceName.name',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhone must be a valid phone', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
        ReferencePhone: {
          number: 'abcde',
        },
      }

      const expectedErrors = [
        'ReferencePhone.phone',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceAddress must be a valid address', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
        ReferenceAddress: 'Not an address',
      }

      const expectedErrors = [
        'ReferenceAddress.address',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: 'SelfEmployment',
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          present: true,
        },
        Title: 'Manager',
        Status: 'Full-time',
        Address: {
          street: '40 Office St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Day',
        },
        Employment: 'Company',
        ReferenceName: {
          first: 'Person',
          noMiddleName: true,
          last: 'Name',
        },
        ReferencePhone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        ReferenceAddress: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })
  })

  describe('if EmploymentActivity is military', () => {
    it('the Title field is required', () => {
      const testData = {
        EmploymentActivity: 'ActiveMilitary',
      }

      const expectedErrors = [
        'Title.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the DutyStation field is required', () => {
      const testData = {
        EmploymentActivity: 'ActiveMilitary',
      }

      const expectedErrors = [
        'DutyStation.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Status field is required', () => {
      const testData = {
        EmploymentActivity: 'NationalGuard',
      }

      const expectedErrors = [
        'Status.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field is required', () => {
      const testData = {
        EmploymentActivity: 'USPHS',
      }

      const expectedErrors = [
        'Address.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field must be a valid address', () => {
      const testData = {
        EmploymentActivity: 'ActiveMilitary',
        Address: 'Not a valid address',
      }

      const expectedErrors = [
        'Address.address',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field is required', () => {
      const testData = {
        EmploymentActivity: 'NationalGuard',
      }

      const expectedErrors = [
        'Telephone.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must be a valid phone', () => {
      const testData = {
        EmploymentActivity: 'USPHS',
        Telephone: {
          number: 'notvalid',
        },
      }

      const expectedErrors = [
        'Telephone.phone',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor field is required', () => {
      const testData = {
        EmploymentActivity: 'NationalGuard',
      }

      const expectedErrors = [
        'Supervisor.required',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor field must be a valid supervisor', () => {
      const testData = {
        EmploymentActivity: 'NationalGuard',
        Supervisor: {
          SupervisorName: 'something',
        },
      }

      const expectedErrors = [
        'Supervisor.model',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: 'ActiveMilitary',
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          present: true,
        },
        Title: 'Manager',
        DutyStation: 'Something',
        Status: 'Full-time',
        Address: {
          street: '40 Office St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Day',
        },
        Supervisor: {
          SupervisorName: 'Person Supervisor',
          Title: 'VP',
          EmailNotApplicable: { applicable: false },
          Address: {
            street: '40 Office St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })
  })
})
