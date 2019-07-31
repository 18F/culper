import { validateModel } from 'models/validate'
import name from '../name'

describe('The name model', () => {
  it('first name is required', () => {
    const testData = { first: '' }
    const expectedErrors = ['first.presence.REQUIRED']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('first name must be 1 character if firstInitialOnly is checked', () => {
    const testData = { first: 'Foo', firstInitialOnly: true }
    const expectedErrors = ['first.length.LENGTH_WRONG']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('first name must be greater than 1 character if firstInitialOnly is not checked', () => {
    const testData = { first: 'F', firstInitialOnly: false }
    const expectedErrors = ['first.length.LENGTH_TOO_SHORT']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('first name cannot be greater than 100 characters', () => {
    const testData = {
      first: 'Fooaslfkjalsfkjalsfkjalsfkjalskfjlaskfjaskjflaksjflkasjflakjsflaksjflasjflkasfjlajsflalskfjlaskfjalsfkja',
    }
    const expectedErrors = ['first.length.LENGTH_TOO_LONG']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name is required if noMiddleName is not checked', () => {
    const testData = {
      middle: '',
      noMiddleName: false,
    }

    const expectedErrors = ['middle.presence.REQUIRED']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name should be empty if noMiddleName is checked', () => {
    const testData = {
      middle: 'Foo',
      noMiddleName: true,
    }

    const expectedErrors = ['middle.requireEmpty.VALUE_NOT_EMPTY']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name must be 1 character if middleInitialOnly is checked', () => {
    const testData = {
      middle: 'Foo',
      noMiddleName: false,
      middleInitialOnly: true,
    }

    const expectedErrors = ['middle.length.LENGTH_WRONG']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name must be greater than 1 character if middleInitialOnly is not checked', () => {
    const testData = {
      middle: 'J',
      noMiddleName: false,
      middleInitialOnly: false,
    }

    const expectedErrors = ['middle.length.LENGTH_TOO_SHORT']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name cannot be greater than 100 characters', () => {
    const testData = {
      middle: 'Fooaslfkjalsfkjalsfkjalsfkjalskfjlaskfjaskjflaksjflkasjflakjsflaksjflasjflkasfjlajsflalskfjlaskfjalsfkja',
      noMiddleName: false,
      middleInitialOnly: false,
    }

    const expectedErrors = ['middle.length.LENGTH_TOO_LONG']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('last name is required', () => {
    const testData = { last: '' }
    const expectedErrors = ['last.presence.REQUIRED']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('last name cannot be greater than 100 characters', () => {
    const testData = {
      last: 'Fooaslfkjalsfkjalsfkjalsfkjalskfjlaskfjaskjflaksjflkasjflakjsflaksjflasjflkasfjlajsflalskfjlaskfjalsfkja',
    }

    const expectedErrors = ['last.length.LENGTH_TOO_LONG']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('suffix is not required', () => {
    const testData = {
      first: 'Foo',
      middle: 'Foo',
      last: 'Bar',
      suffix: null,
    }

    const expectedErrors = ['suffix.presence.REQUIRED']

    expect(validateModel(testData, name))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('suffix must be a valid value', () => {
    const testData = {
      first: 'Foo',
      middle: 'Foo',
      last: 'Bar',
      suffix: 'Foo',
    }

    const expectedErrors = ['suffix.inclusion.INCLUSION']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('suffixOther is required if value of suffix is "Other"', () => {
    const testData = {
      first: 'Foo',
      middle: 'Foo',
      last: 'Bar',
      suffix: 'Other',
      suffixOther: '',
    }

    const expectedErrors = ['suffixOther.presence.REQUIRED']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid name', () => {
    const testData = { first: 'Foo', middle: 'Foo', last: 'Bar' }
    expect(validateModel(testData, name)).toEqual(true)
  })

  it('passes a valid first initial', () => {
    const testData = {
      first: 'F',
      firstInitialOnly: true,
      middle: 'Foo',
      last: 'J',
    }

    expect(validateModel(testData, name)).toEqual(true)
  })

  it('passes a valid middle initial', () => {
    const testData = {
      first: 'Foo',
      middle: 'F',
      middleInitialOnly: true,
      last: 'J',
    }

    expect(validateModel(testData, name)).toEqual(true)
  })

  it('passes a valid no middle name', () => {
    const testData = {
      first: 'Foo',
      noMiddleName: true,
      last: 'J',
    }

    expect(validateModel(testData, name)).toEqual(true)
  })

  it('passes a valid name with a suffix', () => {
    const testData = {
      first: 'Foo',
      noMiddleName: true,
      last: 'J',
      suffix: 'Jr',
    }

    expect(validateModel(testData, name)).toEqual(true)
  })

  it('passes a valid name with suffix "Other"', () => {
    const testData = {
      first: 'Foo',
      noMiddleName: true,
      last: 'J',
      suffix: 'Other',
      suffixOther: 'Some other suffix',
    }

    expect(validateModel(testData, name)).toEqual(true)
  })
})
