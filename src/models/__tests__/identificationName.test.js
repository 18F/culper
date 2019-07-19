import { validateModel } from 'models/validate'
import identificationName from 'models/sections/identificationName'

describe('The identification name section', () => {
  it('requires a name', () => {
    const testData = {}
    const expectedErrors = ['Name.required']
    expect(validateModel(testData, identificationName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a valid name', () => {
    const testData = {
      Name: {
        first: '',
        firstInitialOnly: false,
        last: '',
        middle: '',
        middleInitialOnly: false,
        hideMiddleName: false,
        noMiddleName: false,
        suffix: '',
        suffixOther: '',
      },
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, identificationName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })


  it('validates against a valid name', () => {
    const testData = {
      Name: {
        first: 'John',
        firstInitialOnly: false,
        last: 'Doe',
        middle: 'Smith',
        middleInitialOnly: false,
        hideMiddleName: false,
        noMiddleName: false,
        suffix: '',
        suffixOther: '',
      },
    }

    expect(validateModel(testData, identificationName)).toBe(true)
  })
})
