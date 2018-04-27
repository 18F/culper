import { updateIdentificationApplicantName, updateIdentificationBirthPlace, updateIdentificationBirthDate, updateIdentificationSSN, reportErrors } from './ApplicationActions'

describe('Application actions', function () {
  it('should create an action for updating identification properties', function () {
    const tests = [
      {
        name: 'ApplicantName',
        callback: function () {
          return updateIdentificationApplicantName('charles xavier')
        },
        expected: {
          type: 'Identification.ApplicantName',
          section: 'Identification',
          property: 'ApplicantName',
          values: 'charles xavier'
        }
      },
      {
        name: 'ApplicantBirthPlace',
        callback: function () {
          return updateIdentificationBirthPlace('Earth')
        },
        expected: {
          type: 'Identification.ApplicantBirthPlace',
          section: 'Identification',
          property: 'ApplicantBirthPlace',
          values: 'Earth'
        }
      },
      {
        name: 'ApplicantBirthDate',
        callback: function () {
          return updateIdentificationBirthDate('6/21/1982')
        },
        expected: {
          type: 'Identification.ApplicantBirthDate',
          section: 'Identification',
          property: 'ApplicantBirthDate',
          values: '6/21/1982'
        }
      },
      {
        name: 'ApplicantSSN',
        callback: function () {
          return updateIdentificationSSN('123456789')
        },
        expected: {
          type: 'Identification.ApplicantSSN',
          section: 'Identification',
          property: 'ApplicantSSN',
          values: '123456789'
        }
      },
      {
        name: 'ApplicantNameReportError',
        callback: function () {
          return reportErrors('Identification', 'ApplicantName', [{ code: 'minlength', valid: false }])
        },
        expected: {
          type: 'Errors.Identification',
          section: 'Errors',
          property: 'Identification',
          values: [{ code: 'minlength', valid: false }]
        }
      }
    ]

    tests.forEach((t) => {
      let actual = t.callback()
      expect(actual.type).toEqual(t.expected.type)
      expect(actual.section).toEqual(t.expected.section)
      expect(actual.property).toEqual(t.expected.property)
      expect(actual.values).toEqual(t.expected.values)
    })
  })
})
