import { validateModel } from '../validate'

import name from '../shared/name'

describe('The name model', () => {
  it('first name is required', () => {
    const testData = { first: '' }
    const expectedErrors = ['first.required']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('first name must be 1 character if firstInitialOnly is checked', () => {
    const testData = { first: 'Foo', firstInitialOnly: true }
    const expectedErrors = ['first.length']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('first name must be greater than 1 character if firstInitialOnly is not checked', () => {
    const testData = { first: 'F', firstInitialOnly: false }
    const expectedErrors = ['first.length']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('first name cannot be greater than 100 characters', () => {
    const testData = {
      first: 'Fooaslfkjalsfkjalsfkjalsfkjalskfjlaskfjaskjflaksjflkasjflakjsflaksjflasjflkasfjlajsflalskfjlaskfjalsfkja',
    }
    const expectedErrors = ['first.length']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name is required if noMiddleName is not checked', () => {
    const testData = {
      middle: '',
      noMiddleName: false,
    }

    const expectedErrors = ['middle.required']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  // TODO - need to validate that presence is false
  it.skip('middle name should be empty if noMiddleName is checked', () => {
    const testData = {
      middle: 'Foo',
      noMiddleName: true,
    }

    const expectedErrors = ['middle.required']

    expect(validateModel(testData, name))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name must be 1 character if middleInitialOnly is checked', () => {
    const testData = {
      middle: 'Foo',
      noMiddleName: false,
      middleInitialOnly: true,
    }

    const expectedErrors = ['middle.length']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name must be greater than 1 character if middleInitialOnly is not checked', () => {
    const testData = {
      middle: 'J',
      noMiddleName: false,
      middleInitialOnly: false,
    }

    const expectedErrors = ['middle.length']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('middle name cannot be greater than 100 characters', () => {
    const testData = {
      middle: 'Fooaslfkjalsfkjalsfkjalsfkjalskfjlaskfjaskjflaksjflkasjflakjsflaksjflasjflkasfjlajsflalskfjlaskfjalsfkja',
      noMiddleName: false,
      middleInitialOnly: false,
    }

    const expectedErrors = ['middle.length']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('last name is required', () => {
    const testData = { last: '' }
    const expectedErrors = ['last.required']

    expect(validateModel(testData, name))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('last name cannot be greater than 100 characters', () => {
    const testData = {
      last: 'Fooaslfkjalsfkjalsfkjalsfkjalskfjlaskfjaskjflaksjflkasjflakjsflaksjflasjflkasfjlajsflalskfjlaskfjalsfkja',
    }

    const expectedErrors = ['last.length']

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

    const expectedErrors = ['suffix.required']

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

    const expectedErrors = ['suffix.inclusion']

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

    const expectedErrors = ['suffixOther.required']

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
