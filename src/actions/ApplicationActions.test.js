import * as actionTypes from 'constants/actionTypes'

import {
  updateIdentificationApplicantName,
  updateIdentificationBirthPlace,
  updateIdentificationBirthDate,
  updateIdentificationSSN,
  reportErrors,
  validateFormData,
} from './ApplicationActions'

describe('Application actions', () => {
  it('should create an action for validating the form data', () => {
    const expectedAction = {
      type: actionTypes.VALIDATE_FORM_DATA,
    }

    expect(validateFormData()).toEqual(expectedAction)
  })

  it('should create an action for updating identification properties', () => {
    const tests = [
      {
        name: 'ApplicantName',
        callback: () => updateIdentificationApplicantName('charles xavier'),
        expected: {
          type: 'Identification.ApplicantName',
          section: 'Identification',
          property: 'ApplicantName',
          values: 'charles xavier',
        },
      },
      {
        name: 'ApplicantBirthPlace',
        callback: () => updateIdentificationBirthPlace('Earth'),
        expected: {
          type: 'Identification.ApplicantBirthPlace',
          section: 'Identification',
          property: 'ApplicantBirthPlace',
          values: 'Earth',
        },
      },
      {
        name: 'ApplicantBirthDate',
        callback: () => updateIdentificationBirthDate('6/21/1982'),
        expected: {
          type: 'Identification.ApplicantBirthDate',
          section: 'Identification',
          property: 'ApplicantBirthDate',
          values: '6/21/1982',
        },
      },
      {
        name: 'ApplicantSSN',
        callback: () => updateIdentificationSSN('123456789'),
        expected: {
          type: 'Identification.ApplicantSSN',
          section: 'Identification',
          property: 'ApplicantSSN',
          values: '123456789',
        },
      },
      {
        name: 'ApplicantNameReportError',
        callback: () => {
          const errors = [
            {
              code: 'minlength',
              valid: false,
            },
            {
              code: 'empty',
              section: 'Identification',
              subsection: 'Elsewhere',
              valid: false,
            },
          ]

          return reportErrors('Identification', 'ApplicantName', errors)
        },
        expected: {
          type: 'Errors.Identification',
          section: 'Errors',
          property: 'Identification',
          values: [
            {
              code: 'minlength',
              section: 'Identification',
              subsection: 'ApplicantName',
              valid: false,
            },
            {
              code: 'empty',
              section: 'Identification',
              subsection: 'Elsewhere',
              valid: false,
            },
          ],
        },
      },
    ]

    tests.forEach((t) => {
      const actual = t.callback()
      expect(actual.type).toEqual(t.expected.type)
      expect(actual.section).toEqual(t.expected.section)
      expect(actual.subsection).toEqual(t.expected.subsection)
      expect(actual.property).toEqual(t.expected.property)
      expect(actual.values).toEqual(t.expected.values)
    })
  })
})
