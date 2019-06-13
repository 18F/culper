import { validateModel } from 'models/validate'
import militaryHistory from '../militaryHistory'

describe('The military history model', () => {
  it('requires HasServed', () => {
    const testData = {
      HasServed: {},
    }
    const expectedErrors = ['HasServed.required']

    expect(validateModel(testData, militaryHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a List if HasServed is Yes', () => {
    const testData = {
      HasServed: {
        value: 'Yes',
      },
    }
    const expectedErrors = ['List.required']

    expect(validateModel(testData, militaryHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasServed requires an accepted value (Yes or No)', () => {
    const testData = {
      HasServed: {
        value: 'Yaaas',
      },
    }
    const expectedErrors = ['HasServed.hasValue']

    expect(validateModel(testData, militaryHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
