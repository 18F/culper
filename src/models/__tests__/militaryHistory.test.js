import { validateModel } from 'models/validate'
import militaryHistory from '../militaryHistory'

describe('The military history model', () => {
  it('requires HasServed', () => {
    const testData = {
      HasServed: {},
    }
    const expectedErrors = ['HasServed.presence.REQUIRED']

    expect(validateModel(testData, militaryHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a List if HasServed is Yes', () => {
    const testData = {
      HasServed: {
        value: 'Yes',
      },
    }
    const expectedErrors = ['List.presence.REQUIRED']

    expect(validateModel(testData, militaryHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasServed requires an accepted value (Yes or No)', () => {
    const testData = {
      HasServed: {
        value: 'Yaaas',
      },
    }
    const expectedErrors = ['HasServed.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, militaryHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
