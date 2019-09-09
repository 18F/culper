import { validateModel } from 'models/validate'
import investigation, { clearanceLevel } from '../investigation'

describe('The clearanceLevel model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Level.presence.REQUIRED',
    ]

    expect(validateModel(testData, clearanceLevel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Level must have a value', () => {
    const testData = { Level: 'Secret' }
    const expectedErrors = ['Level.hasValue.MISSING_VALUE']
    expect(validateModel(testData, clearanceLevel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Level is "Other"', () => {
    it('Explanation is required', () => {
      const testData = { Level: { value: 'Other' } }
      const expectedErrors = ['Explanation.presence.REQUIRED']
      expect(validateModel(testData, clearanceLevel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Explanation must have a value', () => {
      const testData = {
        Level: { value: 'Other' },
        Explanation: 'test',
      }
      const expectedErrors = ['Explanation.hasValue.MISSING_VALUE']
      expect(validateModel(testData, clearanceLevel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid clearanceLevel', () => {
      const testData = {
        Level: { value: 'Other' },
        Explanation: { value: 'Something' },
      }
      expect(validateModel(testData, clearanceLevel)).toEqual(true)
    })
  })

  it('passes a valid clearanceLevel', () => {
    const testData = {
      Level: { value: 'Top Secret' },
    }
    expect(validateModel(testData, clearanceLevel)).toEqual(true)
  })
})

describe('The investigation model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Agency.presence.REQUIRED',
      'Completed.presence.REQUIRED',
      'Granted.presence.REQUIRED',
      'ClearanceLevel.presence.REQUIRED',
    ]

    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Agency must have a value', () => {
    const testData = { Agency: 'FBI' }
    const expectedErrors = ['Agency.hasValue.MISSING_VALUE']
    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Completed must be a valid date', () => {
    const testData = { Completed: { day: 2, year: 1000 } }
    const expectedErrors = ['Completed.date.month.presence.REQUIRED']
    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Completed cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Completed: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Completed.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, investigation, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Completed cannot be in the future', () => {
    const testData = {
      Completed: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Completed.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Granted must be a valid date', () => {
    const testData = { Granted: { day: 2, year: 1000 } }
    const expectedErrors = ['Granted.date.month.presence.REQUIRED']
    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Granted must be after Completed', () => {
    const testData = {
      Completed: { day: 2, month: 1, year: 2019 },
      Granted: { day: 2, month: 10, year: 2018 },
    }
    const expectedErrors = ['Granted.date.date.datetime.DATE_TOO_EARLY']
    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ClearanceLevel must be a valid ClearanceLevel', () => {
    const testData = {
      ClearanceLevel: {
        value: 'Secret',
      },
    }
    const expectedErrors = [
      'ClearanceLevel.model.Level.presence.REQUIRED',
    ]
    expect(validateModel(testData, investigation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Agency is not applicable', () => {
    it('Agency is not required', () => {
      const testData = {
        AgencyNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Agency.presence.REQUIRED']
      expect(validateModel(testData, investigation))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        AgencyNotApplicable: { applicable: false },
        Completed: { month: 4, day: 10, year: 2010 },
        Granted: { month: 5, day: 10, year: 2011 },
        ClearanceLevel: {
          Level: { value: 'None' },
        },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  describe('if Agency is "U.S. Department of Treasury"', () => {
    it('AgencyExplanation must have a value', () => {
      const testData = {
        Agency: { value: 'U.S. Department of Treasury' },
      }
      const expectedErrors = [
        'AgencyExplanation.presence.REQUIRED',
        'AgencyExplanation.hasValue.MISSING_VALUE',
      ]
      expect(validateModel(testData, investigation))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        Agency: { value: 'U.S. Department of Treasury' },
        AgencyExplanation: { value: 'Test agency' },
        Completed: { month: 5, day: 10, year: 2011 },
        Granted: { month: 5, day: 10, year: 2011 },
        ClearanceLevel: {
          Level: { value: 'None' },
        },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  describe('if Agency is "Foreign government"', () => {
    it('AgencyExplanation must have a value', () => {
      const testData = {
        Agency: { value: 'Foreign government' },
      }
      const expectedErrors = [
        'AgencyExplanation.presence.REQUIRED',
        'AgencyExplanation.hasValue.MISSING_VALUE',
      ]
      expect(validateModel(testData, investigation))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        Agency: { value: 'Foreign government' },
        AgencyExplanation: { value: 'Test agency' },
        Completed: { month: 5, day: 10, year: 2011 },
        Granted: { month: 5, day: 10, year: 2011 },
        ClearanceLevel: {
          Level: { value: 'None' },
        },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  describe('if Agency is "Other"', () => {
    it('AgencyExplanation must have a value', () => {
      const testData = {
        Agency: { value: 'Other' },
      }
      const expectedErrors = [
        'AgencyExplanation.presence.REQUIRED',
        'AgencyExplanation.hasValue.MISSING_VALUE',
      ]
      expect(validateModel(testData, investigation))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        Agency: { value: 'Other' },
        AgencyExplanation: { value: 'Test agency' },
        Completed: { month: 5, day: 10, year: 2011 },
        Granted: { month: 5, day: 10, year: 2011 },
        ClearanceLevel: {
          Level: { value: 'None' },
        },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  describe('if Completed is not applicable', () => {
    it('Completed is not required', () => {
      const testData = {
        CompletedNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Completed.presence.REQUIRED']
      expect(validateModel(testData, investigation))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        Agency: { value: 'FBI' },
        CompletedNotApplicable: { applicable: false },
        Granted: { month: 5, day: 10, year: 2011 },
        ClearanceLevel: {
          Level: { value: 'None' },
        },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  describe('if Granted is not applicable', () => {
    it('Granted is not required', () => {
      const testData = {
        GrantedNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Granted.presence.REQUIRED']
      expect(validateModel(testData, investigation))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        Agency: { value: 'FBI' },
        GrantedNotApplicable: { applicable: false },
        Completed: { month: 4, day: 10, year: 2010 },
        ClearanceLevel: {
          Level: { value: 'None' },
        },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  describe('if ClearanceLevel is not applicable', () => {
    it('ClearanceLevel is not required', () => {
      const testData = {
        ClearanceLevelNotApplicable: { applicable: false },
      }
      const expectedErrors = ['ClearanceLevel.presence.REQUIRED']
      expect(validateModel(testData, investigation))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid investigation', () => {
      const options = { requireLegalInvestigationClearanceGranted: false }
      const testData = {
        Agency: { value: 'FBI' },
        Completed: { month: 4, day: 10, year: 2010 },
        Granted: { month: 5, day: 10, year: 2011 },
        ClearanceLevelNotApplicable: { applicable: false },
      }
      expect(validateModel(testData, investigation, options)).toEqual(true)
    })
  })

  it('passes a valid investigation', () => {
    const options = { requireLegalInvestigationClearanceGranted: false }
    const testData = {
      Agency: { value: 'FBI' },
      Completed: { month: 4, day: 10, year: 2010 },
      Granted: { month: 5, day: 10, year: 2011 },
      ClearanceLevel: {
        Level: { value: 'None' },
      },
    }
    expect(validateModel(testData, investigation, options)).toEqual(true)
  })

  /**
   * The SF85 has a branching question asking if an applicant
   * has a clearance granted before asking for:
   * - Name of agency (if different from investigating agency): OPTIONAL
   * - Clearance date
   * - Level of clearance
   *
   * This is different from other questions because the questions
   * are displayed on the form without a branch.
   */
  describe('SF85', () => {
    const options = { requireLegalInvestigationClearanceGranted: true }

    it('requires ClearanceGranted to be answered', () => {
      const testData = {}
      const expectedErrors = [
        'ClearanceGranted.presence.REQUIRED',
        'ClearanceGranted.hasValue.MISSING_VALUE',
      ]
      expect(validateModel(testData, investigation, options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('was not granted clearance', () => {
      it('does not require Granted or ClearanceLevel', () => {
        const testData = {
          ClearanceGranted: { value: 'No' },
        }
        const expectedErrors = [
          'Granted.presence.REQUIRED',
          'ClearanceLevel.presence.REQUIRED',
        ]

        expect(validateModel(testData, investigation, options))
          .toEqual(expect.not.arrayContaining(expectedErrors))
      })

      it('passes a valid investigation', () => {
        const testData = {
          Agency: { value: 'FBI' },
          Completed: { month: 4, day: 10, year: 2010 },
          ClearanceGranted: { value: 'No' },
        }

        expect(validateModel(testData, investigation, options)).toEqual(true)
      })
    })

    describe('was granted clearance', () => {
      it('requires Granted or ClearanceLevel', () => {
        const testData = {
          ClearanceGranted: { value: 'Yes' },
        }
        const expectedErrors = [
          'Granted.presence.REQUIRED',
          'ClearanceLevel.presence.REQUIRED',
        ]

        expect(validateModel(testData, investigation, options))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid investigation', () => {
        const testData = {
          Agency: { value: 'FBI' },
          Completed: { month: 4, day: 10, year: 2010 },
          ClearanceGranted: { value: 'Yes' },
          Granted: { month: 5, day: 10, year: 2011 },
          ClearanceLevel: {
            Level: { value: 'Confidential' },
          },
        }

        expect(validateModel(testData, investigation, options)).toEqual(true)
      })
    })
  })
})
