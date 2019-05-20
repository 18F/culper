import { validateModel } from 'models/validate'
import education from 'models/education'

describe('The education model', () => {
  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.required']

    expect(validateModel(testData, education))
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

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.required']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid address', () => {
    const testData = {
      Address: ['not', 'an', 'address'],
    }
    const expectedErrors = ['Address.location']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Name field is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Name field must have a value', () => {
    const testData = {
      Name: 'invalid',
    }
    const expectedErrors = ['Name.hasValue']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Type field must have a value', () => {
    const testData = {
      Type: { test: false },
    }
    const expectedErrors = ['Type.hasValue']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Diplomas field is required', () => {
    const testData = {}
    const expectedErrors = ['Diplomas.required']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Diplomas field must be valid', () => {
    const testData = {
      Diplomas: {
        items: [
          { Item: { Has: { value: 'Yes' }, Thing: true } },
        ],
      },
    }
    const expectedErrors = ['Diplomas.branchCollection']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Diploma items must be valid', () => {
    const testData = {
      Diplomas: {
        items: [
          { Item: { Has: { value: 'Yes' }, Diploma: 'Testing' } },
        ],
      },
    }
    const expectedErrors = ['Diplomas.branchCollection']

    expect(validateModel(testData, education))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if the date range is not within the last 3 years', () => {
    it('Reference fields are not required', () => {
      const testData = {
        Dates: {
          from: { year: 2006, month: 9, day: 1 },
          to: { year: 2010, month: 5, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
      }

      const expectedErrors = [
        'ReferenceName.required',
        'ReferencePhone.required',
        'ReferenceEmail.required',
        'ReferenceAddress.required',
      ]

      expect(validateModel(testData, education))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid education item', () => {
      const testData = {
        Dates: {
          from: { year: 2006, month: 9, day: 1 },
          to: { year: 2010, month: 5, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
        Diplomas: {
          items: [
            { Item: { Has: { value: 'Yes' }, Diploma: { value: 'College' }, Date: { year: 2010, month: 5 } } },
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, education)).toBe(true)
    })
  })

  describe('if the date range is within the last 3 years', () => {
    it('Reference fields are required', () => {
      const testData = {
        Dates: {
          from: { year: 2017, month: 9, day: 1 },
          to: { year: 2019, month: 1, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
      }

      const expectedErrors = [
        'ReferenceName.required',
        'ReferencePhone.required',
        'ReferenceEmail.required',
        'ReferenceAddress.required',
      ]

      expect(validateModel(testData, education))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceName must be a valid name', () => {
      const testData = {
        Dates: {
          from: { year: 2017, month: 9, day: 1 },
          to: { year: 2019, month: 1, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
        ReferenceName: { first: 'only' },
      }

      const expectedErrors = [
        'ReferenceName.model',
      ]

      expect(validateModel(testData, education))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhone must be a valid phone', () => {
      const testData = {
        Dates: {
          from: { year: 2017, month: 9, day: 1 },
          to: { year: 2019, month: 1, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
        ReferencePhone: { first: 'only' },
      }

      const expectedErrors = [
        'ReferencePhone.model',
      ]

      expect(validateModel(testData, education))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceEmail must be a valid email', () => {
      const testData = {
        Dates: {
          from: { year: 2017, month: 9, day: 1 },
          to: { year: 2019, month: 1, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
        ReferenceEmail: { value: 'notanemail' },
      }

      const expectedErrors = [
        'ReferenceEmail.model',
      ]

      expect(validateModel(testData, education))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceAddress must be a valid address', () => {
      const testData = {
        Dates: {
          from: { year: 2017, month: 9, day: 1 },
          to: { year: 2019, month: 1, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
        ReferenceAddress: {
          street: 'Something',
          city: null,
        },
      }

      const expectedErrors = [
        'ReferenceAddress.location',
      ]

      expect(validateModel(testData, education))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if ReferenceNameNotApplicable is checked', () => {
      it('ReferenceName is not required', () => {
        const testData = {
          Dates: {
            from: { year: 2017, month: 9, day: 1 },
            to: { year: 2019, month: 1, day: 30 },
          },
          Address: {
            street: '40 School St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          Name: { value: 'My School' },
          Type: { value: 'College' },
          ReferenceNameNotApplicable: { applicable: false },
          ReferenceEmail: { value: 'myreference@email.com' },
          ReferencePhone: { number: '1242395029', numberType: 'Domestic', timeOfDay: 'Both' },
          ReferenceAddress: {
            street: '5 Reference Ave.',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
        }

        const expectedErrors = [
          'ReferenceName.required',
        ]

        expect(validateModel(testData, education))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if ReferenceEmailNotApplicable is checked', () => {
      it('ReferenceEmail is not required', () => {
        const testData = {
          Dates: {
            from: { year: 2017, month: 9, day: 1 },
            to: { year: 2019, month: 1, day: 30 },
          },
          Address: {
            street: '40 School St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          Name: { value: 'My School' },
          Type: { value: 'College' },
          ReferenceNameNotApplicable: { applicable: false },
          ReferenceEmailNotApplicable: { applicable: false },
          ReferencePhone: { number: '1242395029', numberType: 'Domestic', timeOfDay: 'Both' },
          ReferenceAddress: {
            street: '5 Reference Ave.',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
        }

        const expectedErrors = [
          'ReferenceName.required',
        ]

        expect(validateModel(testData, education))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    it('passes a valid education item', () => {
      const testData = {
        Dates: {
          from: { year: 2017, month: 9, day: 1 },
          to: { year: 2019, month: 1, day: 30 },
        },
        Address: {
          street: '40 School St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Name: { value: 'My School' },
        Type: { value: 'College' },
        ReferenceName: { first: 'Reference', noMiddleName: true, last: 'Person' },
        ReferenceEmail: { value: 'myreference@email.com' },
        ReferencePhone: { number: '1242395029', numberType: 'Domestic', timeOfDay: 'Both' },
        ReferenceAddress: {
          street: '5 Reference Ave.',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Diplomas: {
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
                Diploma: { value: 'Other' },
                DiplomaOther: { value: 'My Custom Degree' },
                Date: { year: 2010, month: 5 },
              },
            },
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, education)).toBe(true)
    })
  })
})
