import { validateModel } from 'models/validate'
import physicalAddress from '../physicalAddress'

describe('The PhysicalAddress model', () => {
  it('HasDifferentAddress is required', () => {
    const testData = {}
    const expectedErrors = ['HasDifferentAddress.required']
    expect(validateModel(testData, physicalAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDifferentAddress.value is required', () => {
    const testData = {
      HasDifferentAddress: '',
    }
    const expectedErrors = ['HasDifferentAddress.value.required']
    expect(validateModel(testData, physicalAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDifferentAddress.value must be a valid value', () => {
    const testData = {
      HasDifferentAddress: {
        value: 'invalid',
      },
    }
    const expectedErrors = ['HasDifferentAddress.value.inclusion']
    expect(validateModel(testData, physicalAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('with HasDifferentAddress.value set to "No"', () => {
    it('Address is not required', () => {
      const testData = {
        HasDifferentAddress: { value: 'No' },
      }

      const expectedErrors = ['Address.required']
      expect(validateModel(testData, physicalAddress))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Telephone is not required', () => {
      const testData = {
        HasDifferentAddress: { value: 'No' },
      }

      const expectedErrors = ['Telephone.required']
      expect(validateModel(testData, physicalAddress))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid physical address', () => {
      const testData = {
        HasDifferentAddress: { value: 'No' },
      }

      expect(validateModel(testData, physicalAddress)).toBe(true)
    })
  })

  describe('with HasDifferentAddress.value set to "Yes"', () => {
    it('Address is required', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
      }

      const expectedErrors = ['Address.required']
      expect(validateModel(testData, physicalAddress))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Address must be a valid address', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          test: 'blah',
        },
      }

      const expectedErrors = ['Address.address']
      expect(validateModel(testData, physicalAddress))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Telephone is required', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
      }

      const expectedErrors = ['Telephone.required']
      expect(validateModel(testData, physicalAddress))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Telephone must be a valid phone', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Telephone: 'something',
      }

      const expectedErrors = ['Telephone.phone']
      expect(validateModel(testData, physicalAddress))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid physical address', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
      }

      expect(validateModel(testData, physicalAddress)).toBe(true)
    })
  })
})
