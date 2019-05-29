import { validateModel } from 'models/validate'
import cohabitant from '../cohabitant'

describe('The cohabitant model', () => {
  it('name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('name must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('birthdate is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.required']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('birthdate must be a valid date', () => {
    const testData = {
      Birthdate: { year: 3000 },
    }
    const expectedErrors = ['Birthdate.date']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field is required', () => {
    const testData = {}
    const expectedErrors = ['BirthPlace.required']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field must be a valid location', () => {
    const testData = {
      BirthPlace: { street: 'address' },
    }
    const expectedErrors = ['BirthPlace.location']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the SSN field is required', () => {
    const testData = {}
    const expectedErrors = ['SSN.required']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the SSN field must be a valid SSN', () => {
    const testData = {
      SSN: { number: '123456789' },
    }
    const expectedErrors = ['SSN.ssn']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.required']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field must have a value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.hasValue']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field is required', () => {
    const testData = {}
    const expectedErrors = ['OtherNames.required']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field must be valid', () => {
    const testData = {
      OtherNames: true,
    }
    const expectedErrors = ['OtherNames.branchCollection']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('OtherNames items must be valid', () => {
    const testData = {
      OtherNames: {
        items: [
          { Item: { Has: { value: 'Yes' } } },
          { Item: { Has: { value: 'No' } } },
        ],
      },
    }
    const expectedErrors = ['OtherNames.branchCollection']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid cohabitant', () => {
    const testData = {
      Name: { first: 'Person', noMiddleName: true, last: 'Name' },
      Birthdate: { day: 5, month: 2, year: 1980 },
      BirthPlace: {
        city: 'New York', state: 'NY', country: 'United States',
      },
      SSN: { first: '234', middle: '12', last: '3490' },
      Citizenship: { value: ['United States'] },
      OtherNames: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              OtherName: { first: 'Person', noMiddleName: true, last: 'Oldname' },
              MaidenName: { value: 'Yes' },
              DatesUsed: {
                from: { year: 1980, month: 2, day: 5 },
                to: { year: 2000, month: 10, day: 14 },
              },
            },
          },
          { Item: { Has: { value: 'No' } } },
        ],
      },
    }

    expect(validateModel(testData, cohabitant)).toEqual(true)
  })

  describe('if birthplace is outside the US', () => {
    it('foreign born document is required', () => {
      const testData = {
        BirthPlace: { country: 'Canada' },
      }
      const expectedErrors = ['ForeignBornDocument.required']

      expect(validateModel(testData, cohabitant))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('foreign born document must be valid', () => {
      const testData = {
        BirthPlace: { country: 'Canada' },
        ForeignBornDocument: 'my document',
      }
      const expectedErrors = ['ForeignBornDocument.model']

      expect(validateModel(testData, cohabitant))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid cohabitant', () => {
      const testData = {
        Name: { first: 'Person', noMiddleName: true, last: 'Name' },
        Birthdate: { day: 5, month: 2, year: 1980 },
        BirthPlace: {
          city: 'Toronto', country: 'Canada',
        },
        SSN: { first: '234', middle: '12', last: '3490' },
        Citizenship: { value: ['United States'] },
        OtherNames: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
        ForeignBornDocument: {
          DocumentType: { value: 'Visa' },
          DocumentExpirationNotApplicable: { applicable: false },
          DocumentNumber: { value: 'abcdef123450' },
        },
      }

      expect(validateModel(testData, cohabitant)).toEqual(true)
    })
  })
})
