import { validateModel } from 'models/validate'
import citizenship from '../citizenship'

describe('The citizenship model', () => {
  it('Country is required', () => {
    const testData = {}
    const expectedErrors = ['Country.required']

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a value', () => {
    const testData = { Country: 'Place' }
    const expectedErrors = ['Country.hasValue']

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.required']

    expect(validateModel(testData, citizenship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: ['January', 'February'],
    }
    const expectedErrors = ['Dates.daterange']

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
      const expectedErrors = ['Current.required']

      expect(validateModel(testData, citizenship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Dates exists and does not include the present', () => {
    it('Current is required', () => {
      const testData = { Dates: { present: false } }
      const expectedErrors = ['Current.required']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Current must have a valid value', () => {
      const testData = {
        Dates: { present: false },
        Current: { value: true },
      }
      const expectedErrors = ['Current.hasValue']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Current is "Yes"', () => {
      it('CurrentExplanation is required', () => {
        const testData = {
          Dates: { present: false },
          Current: { value: 'Yes' },
        }
        const expectedErrors = ['CurrentExplanation.required']

        expect(validateModel(testData, citizenship))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CurrentExplanation must have a value', () => {
        const testData = {
          Dates: { present: false },
          Current: { value: 'Yes' },
          CurrentExplanation: { value: '' },
        }
        const expectedErrors = ['CurrentExplanation.hasValue']

        expect(validateModel(testData, citizenship))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })
  })

  describe('if Country is United States', () => {
    it('How is not required', () => {
      const testData = {
        Country: { value: 'United States' },
      }
      const expectedErrors = ['How.required']

      expect(validateModel(testData, citizenship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Renounced is not required', () => {
      const testData = {
        Country: { value: 'United States' },
      }
      const expectedErrors = ['Renounced.required']

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
      const expectedErrors = ['How.required']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('How must have a value', () => {
      const testData = {
        Country: { value: 'Canada' },
        How: { test: 'thing' },
      }
      const expectedErrors = ['How.hasValue']

      expect(validateModel(testData, citizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid citizenship', () => {
      const testData = {
        Country: { value: 'Canada' },
        Dates: {
          from: { year: 2000, day: 2, month: 4 },
          to: { year: 2005, day: 2, month: 10 },
        },
        How: { value: 'Because!' },
        Current: { value: 'Yes' },
        CurrentExplanation: { value: 'Because!' },
      }

      expect(validateModel(testData, citizenship)).toEqual(true)
    })

    describe('if CitizenshipRenounced is required', () => {
      it('Renounced is required', () => {
        const testData = {
          Country: { value: 'Canada' },
        }
        const expectedErrors = ['Renounced.required']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Renounced must have a valid value', () => {
        const testData = {
          Country: { value: 'Canada' },
          Renounced: false,
        }
        const expectedErrors = ['Renounced.hasValue']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('RenouncedExplanation is required', () => {
        const testData = {
          Country: { value: 'Canada' },
          Renounced: { value: 'No' },
        }
        const expectedErrors = ['RenouncedExplanation.required']

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: true }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('RenouncedExplanation must have a value', () => {
        const testData = {
          Country: { value: 'Canada' },
          Renounced: { value: 'Yes' },
          RenouncedExplanation: ['some reason'],
        }
        const expectedErrors = ['RenouncedExplanation.hasValue']

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
      it('Renounced is required', () => {
        const testData = {
          Country: { value: 'Canada' },
        }
        const expectedErrors = ['Renounced.required']

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
        }

        expect(validateModel(testData, citizenship, { requireCitizenshipRenounced: false }))
          .toEqual(true)
      })
    })
  })
})
