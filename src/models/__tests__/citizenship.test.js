import { validateModel } from 'models/validate'
import citizenship from '../citizenship'

describe('The citizenship model', () => {
  it('Country is required', () => {
    const testData = {}
    const expectedErrors = ['Country.presence.REQUIRED']

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = { Country: { value: 'Place' } }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: ['January', 'February'],
    }
    const expectedErrors = [
      'Dates.daterange.from.presence.REQUIRED',
      'Dates.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Dates includes the present', () => {
    it('Current is not required', () => {
      const testData = {
        Dates: {
          present: true,
        },
      }
      const expectedErrors = ['Current.presence.REQUIRED']

      expect(validateModel(testData, citizenship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Dates exists and does not include the present', () => {
    it('Current is required', () => {
      const testData = { Dates: { present: false } }
      const expectedErrors = ['Current.presence.REQUIRED']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Current must have a valid value', () => {
      const testData = {
        Dates: { present: false },
        Current: { value: true },
      }
      const expectedErrors = ['Current.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CurrentExplanation is required', () => {
      const testData = {
        Dates: { present: false },
        Current: { value: 'No' },
      }
      const expectedErrors = ['CurrentExplanation.presence.REQUIRED']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CurrentExplanation must have a value', () => {
      const testData = {
        Dates: { present: false },
        Current: { value: 'Yes' },
        CurrentExplanation: { value: '' },
      }
      const expectedErrors = ['CurrentExplanation.hasValue.MISSING_VALUE']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Country is United States', () => {
    it('How is not required', () => {
      const testData = {
        Country: { value: 'United States' },
      }
      const expectedErrors = ['How.presence.REQUIRED']

      expect(validateModel(testData, citizenship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Renounced is not required', () => {
      const testData = {
        Country: { value: 'United States' },
      }
      const expectedErrors = ['Renounced.presence.REQUIRED']

      expect(validateModel(testData, citizenship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid citizenship', () => {
      const testData = {
        Country: { value: 'United States' },
        Dates: {
          from: { year: 2000, day: 2, month: 4 },
          present: true,
        },
      }

      expect(validateModel(testData, citizenship)).toEqual(true)
    })
  })

  describe('if Country is not United States', () => {
    it('How is required', () => {
      const testData = {
        Country: { value: 'Canada' },
      }
      const expectedErrors = ['How.presence.REQUIRED']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('How must have a value', () => {
      const testData = {
        Country: { value: 'Canada' },
        How: { test: 'thing' },
      }
      const expectedErrors = ['How.hasValue.MISSING_VALUE']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if CitizenshipRenounced is required', () => {
      it('Renounced is required', () => {
        const testData = {
          Country: { value: 'Canada' },
        }
        const expectedErrors = ['Renounced.presence.REQUIRED']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Renounced must have a valid value', () => {
        const testData = {
          Country: { value: 'Canada' },
          Renounced: { value: 'false' },
        }
        const expectedErrors = ['Renounced.hasValue.value.inclusion.INCLUSION']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('RenouncedExplanation is required', () => {
        const testData = {
          Country: { value: 'Canada' },
          Renounced: { value: 'No' },
        }
        const expectedErrors = ['RenouncedExplanation.presence.REQUIRED']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('RenouncedExplanation must have a value', () => {
        const testData = {
          Country: { value: 'Canada' },
          Renounced: { value: 'Yes' },
          RenouncedExplanation: ['some reason'],
        }
        const expectedErrors = ['RenouncedExplanation.hasValue.MISSING_VALUE']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid citizenship', () => {
        const testData = {
          Country: { value: 'Canada' },
          Dates: {
            from: { year: 2000, day: 2, month: 4 },
            present: true,
          },
          How: { value: 'Some reason' },
          Renounced: { value: 'Yes' },
          RenouncedExplanation: { value: 'Because' },
        }

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(true)
      })
    })

    describe('if CitizenshipRenounced is not required', () => {
      it('Renounced is not required', () => {
        const testData = {
          Country: { value: 'Canada' },
        }
        const expectedErrors = ['Renounced.presence.REQUIRED']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: false }))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid citizenship', () => {
        const testData = {
          Country: { value: 'Canada' },
          Dates: {
            from: { year: 2000, day: 2, month: 4 },
            present: true,
          },
          How: { value: 'Some reason' },
          Current: { value: 'Yes' },
          CurrentExplanation: { value: 'Because!' },
        }

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: false }))
          .toEqual(true)
      })
    })
  })
})
