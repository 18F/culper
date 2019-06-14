import { validateModel } from 'models/validate'
import militaryForeign, { foreignMilitaryContact } from '../militaryForeign'

describe('The foreign military model', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Organization.required',
      'Name.required',
      'Dates.required',
      'Country.required',
      'Rank.required',
      'Division.required',
      'Circumstances.required',
      'ReasonLeft.required',
    ]

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Organization requires a valid value', () => {
    const testData = {
      Organization: { value: 'TestInvalidValue' },
    }

    const expectedErrors = ['Organization.hasValue']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires MaintainsContact branch filled if SF86', () => {
    const testData = { formType: 'SF86' }
    const expectedErrors = ['MaintainsContact.required']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires MaintainsContact branch filled if SF865P', () => {
    const testData = { formType: 'SF85P' }
    const expectedErrors = ['MaintainsContact.required']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a valid list of contacts if MaintainsContact', () => {
    const testData = { MaintainsContact: { value: 'Yes' } }
    const expectedErrors = ['List.required']

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})

describe('The foreign military contact model', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Address.required',
      'Title.required',
      'Dates.required',
      'Frequency.required',
    ]

    expect(validateModel(testData, foreignMilitaryContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
