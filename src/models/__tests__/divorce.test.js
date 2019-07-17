import { validateModel } from 'models/validate'
import divorce from '../divorce'

describe('The divorce model', () => {
  it('the name field is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the name field must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthdate field is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthdate field must be a valid date', () => {
    const testData = {
      Birthdate: { year: 3000 },
    }
    const expectedErrors = ['Birthdate.date']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field is required', () => {
    const testData = {}
    const expectedErrors = ['BirthPlace.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field must be a valid location', () => {
    const testData = {
      BirthPlace: { street: 'address' },
    }
    const expectedErrors = ['BirthPlace.location']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the citizenship field is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the citizenship field must be valid', () => {
    const testData = {
      Citizenship: { value: '' },
    }
    const expectedErrors = ['Citizenship.country']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the telephone field is required', () => {
    const testData = {}
    const expectedErrors = ['Telephone.required']
    const options = {
      requireRelationshipMaritalDivorcePhoneNumber: true,
    }
    expect(validateModel(testData, divorce, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the telephone field must be a valid phone number', () => {
    const testData = {
      Telephone: { number: '123' },
    }
    const expectedErrors = ['Telephone.model']
    const options = {
      requireRelationshipMaritalDivorcePhoneNumber: true,
    }

    expect(validateModel(testData, divorce, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the recognized field is required', () => {
    const testData = {}
    const expectedErrors = ['Recognized.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the recognized field must be a valid date', () => {
    const testData = {
      Recognized: 'date',
    }
    const expectedErrors = ['Recognized.date']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the address field must be a valid location', () => {
    const testData = {
      Address: 'invalid',
    }
    const expectedErrors = ['Address.location']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the date divorced field is required', () => {
    const testData = {}
    const expectedErrors = ['DateDivorced.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the date divorced field must be a valid date', () => {
    const testData = {
      DateDivorced: { year: '500' },
    }
    const expectedErrors = ['DateDivorced.date']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the status field is required', () => {
    const testData = {}
    const expectedErrors = ['Status.required']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the status field must be valid', () => {
    const testData = {
      Status: {
        value: 'invalid',
      },
    }
    const expectedErrors = ['Status.hasValue']

    expect(validateModel(testData, divorce))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if the status is widowed', () => {
    it('the divorce location field is not required', () => {
      const testData = {
        Status: { value: 'Widowed' },
      }
      const expectedErrors = ['DivorceLocation.required']

      expect(validateModel(testData, divorce))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the deceased field is not required', () => {
      const testData = {
        Status: { value: 'Widowed' },
      }
      const expectedErrors = ['Deceased.required']

      expect(validateModel(testData, divorce))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the deceased address field is not required', () => {
      const testData = {
        Status: { value: 'Widowed' },
      }
      const expectedErrors = ['DeceasedAddress.required']

      expect(validateModel(testData, divorce))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid divorce', () => {
      const testData = {
        Status: { value: 'Widowed' },
        Name: { first: 'Person', noMiddleName: true, last: 'Spouse' },
        Birthdate: { day: 5, month: 10, year: 1980 },
        BirthPlace: { city: 'New York', state: 'NY', country: 'United States' },
        Citizenship: { value: ['United States'] },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        Recognized: { day: 10, month: 1, year: 2001 },
        Address: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10000',
          country: 'United States',
        },
        DateDivorced: { day: 1, month: 1, year: 2010 },
      }

      expect(validateModel(testData, divorce)).toEqual(true)
    })
  })

  describe('if the status is not widowed', () => {
    it('the divorce location field is required', () => {
      const testData = {
        Status: { value: 'Divorced' },
      }
      const expectedErrors = ['DivorceLocation.required']

      expect(validateModel(testData, divorce))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the divorce location field must be a valid location', () => {
      const testData = {
        Status: { value: 'Divorced' },
        DivorceLocation: 'invalid',
      }
      const expectedErrors = ['DivorceLocation.location']

      expect(validateModel(testData, divorce))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the deceased field is required', () => {
      const testData = {
        Status: { value: 'Annulled' },
      }
      const expectedErrors = ['Deceased.required']

      expect(validateModel(testData, divorce))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the deceased field must be valid', () => {
      const testData = {
        Status: { value: 'Annulled' },
        Deceased: { value: 'invalid' },
      }
      const expectedErrors = ['Deceased.hasValue']

      expect(validateModel(testData, divorce))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if the deceased value is not No', () => {
      it('the deceased address field is not required', () => {
        const testData = {
          Status: { value: 'Divorced' },
          Deceased: { value: 'Yes' },
        }
        const expectedErrors = ['DeceasedAddress.required']

        expect(validateModel(testData, divorce))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid divorce', () => {
        const testData = {
          Status: { value: 'Divorced' },
          Name: { first: 'Person', noMiddleName: true, last: 'Spouse' },
          Birthdate: { day: 5, month: 10, year: 1980 },
          BirthPlace: { city: 'New York', state: 'NY', country: 'United States' },
          Citizenship: { value: ['United States'] },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          Recognized: { day: 10, month: 1, year: 2001 },
          Address: {
            street: '1 Main St',
            city: 'New York',
            state: 'NY',
            zipcode: '10000',
            country: 'United States',
          },
          DateDivorced: { day: 1, month: 1, year: 2010 },
          DivorceLocation: {
            street: '1 Main St',
            city: 'New York',
            state: 'NY',
            zipcode: '10000',
            country: 'United States',
          },
          Deceased: { value: 'Yes' },
        }

        expect(validateModel(testData, divorce)).toEqual(true)
      })
    })

    describe('if the deceased value is No', () => {
      it('the deceased address field is required', () => {
        const testData = {
          Status: { value: 'Divorced' },
          Deceased: { value: 'No' },
        }
        const expectedErrors = ['DeceasedAddress.required']

        expect(validateModel(testData, divorce))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the deceased address field must be a valid location', () => {
        const testData = {
          Status: { value: 'Divorced' },
          Deceased: { value: 'No' },
          DeceasedAddress: 'invalid address',
        }
        const expectedErrors = ['DeceasedAddress.location']

        expect(validateModel(testData, divorce))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid divorce', () => {
        const testData = {
          Status: { value: 'Divorced' },
          Name: { first: 'Person', noMiddleName: true, last: 'Spouse' },
          Birthdate: { day: 5, month: 10, year: 1980 },
          BirthPlace: { city: 'New York', state: 'NY', country: 'United States' },
          Citizenship: { value: ['United States'] },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          Recognized: { day: 10, month: 1, year: 2001 },
          Address: {
            city: 'New York',
            state: 'NY',
            country: 'United States',
          },
          DateDivorced: { day: 1, month: 1, year: 2010 },
          DivorceLocation: {
            city: 'New York',
            state: 'NY',
            zipcode: '10000',
            country: 'United States',
          },
          Deceased: { value: 'No' },
          DeceasedAddress: {
            street: '1 Main St',
            city: 'New York',
            state: 'NY',
            zipcode: '10000',
            country: 'United States',
          },
        }

        expect(validateModel(testData, divorce)).toEqual(true)
      })
    })
  })

  describe('SF85P', () => {
    it('does not need a phone number', () => {
      const testData = {
        Status: { value: 'Widowed' },
        Name: { first: 'Person', noMiddleName: true, last: 'Spouse' },
        Birthdate: { day: 5, month: 10, year: 1980 },
        BirthPlace: { city: 'New York', state: 'NY', country: 'United States' },
        Citizenship: { value: ['United States'] },
        Telephone: {},
        Recognized: { day: 10, month: 1, year: 2001 },
        Address: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10000',
          country: 'United States',
        },
        DateDivorced: { day: 1, month: 1, year: 2010 },
      }
      const options = {
        requireRelationshipMaritalDivorcePhoneNumber: false,
      }
      expect(validateModel(testData, divorce, options)).toEqual(true)
    })
  })
})
