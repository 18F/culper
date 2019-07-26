import { validateModel } from 'models/validate'
import usPassport from '../usPassport'

describe('The US Passport model', () => {
  it('HasPassports is required', () => {
    const testData = {}
    const expectedErrors = ['HasPassports.presence.REQUIRED']
    expect(validateModel(testData, usPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasPassports must have a valid value', () => {
    const testData = { HasPassports: { value: true } }
    const expectedErrors = ['HasPassports.hasValue.value.inclusion.INCLUSION']
    expect(validateModel(testData, usPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasPassports is "No"', () => {
    it('Name is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Name.presence.REQUIRED']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Number is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Number.presence.REQUIRED']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Issued is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Issued.presence.REQUIRED']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Expiration is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Expiration.presence.REQUIRED']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid US Passport', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      expect(validateModel(testData, usPassport)).toEqual(true)
    })
  })

  describe('if HasPassports is "Yes"', () => {
    it('validates required fields', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
      }
      const expectedErrors = [
        'Name.presence.REQUIRED',
        'Number.presence.REQUIRED',
        'Issued.presence.REQUIRED',
        'Expiration.presence.REQUIRED',
      ]
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Name must be a valid name', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
        Name: 'First middle last',
      }
      const expectedErrors = [
        'Name.model.first.presence.REQUIRED',
        'Name.model.middle.presence.REQUIRED',
        'Name.model.last.presence.REQUIRED',
      ]
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Expiration must be after Issued', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
        Issued: { day: 5, month: 12, year: 2010 },
        Expiration: { day: 5, month: 12, year: 2009 },
      }
      const expectedErrors = ['Expiration.date']
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Expiration can be in the future', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
        Issued: { day: 5, month: 12, year: 2010 },
        Expiration: { day: 5, month: 12, year: 2030 },
      }

      const expectedErrors = ['Expiration.date']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Issued is before 1/1/1990', () => {
      it('Number must be a valid value', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Issued: { year: '1980', day: '10', month: '4' },
          Expiration: { year: '1990', day: '10', month: '4' },
          Number: {
            value: '....',
          },
        }
        const expectedErrors = ['Number.hasValue.value.format.INVALID_FORMAT']
        expect(validateModel(testData, usPassport))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid US Passport', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Name: { first: 'Test', noMiddleName: true, last: 'Passport' },
          Issued: { year: '1980', day: '10', month: '4' },
          Expiration: { year: '1990', day: '10', month: '4' },
          Number: {
            value: 'abc123',
          },
        }
        expect(validateModel(testData, usPassport)).toEqual(true)
      })
    })

    describe('if Issued is after 1/1/1990', () => {
      it('Number must be a valid value', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Name: { first: 'Test', noMiddleName: true, last: 'Passport' },
          Issued: { year: '1990', day: '10', month: '4' },
          Expiration: { year: '2000', day: '10', month: '4' },
          Number: {
            value: 'abc123',
          },
        }
        const expectedErrors = ['Number.hasValue.value.length.LENGTH_WRONG']
        expect(validateModel(testData, usPassport))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid US Passport', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Name: { first: 'Test', noMiddleName: true, last: 'Passport' },
          Issued: { year: '1990', day: '10', month: '4' },
          Expiration: { year: '2000', day: '10', month: '4' },
          Number: {
            value: 'abc123def',
          },
        }
        expect(validateModel(testData, usPassport)).toEqual(true)
      })
    })
  })
})
