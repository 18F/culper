import { validateModel } from 'models/validate'
import competence from 'models/competence'

describe('The competence model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'IsIncompetent.presence.REQUIRED',
    ]

    expect(validateModel(testData, competence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IsIncompetent must be a valid value', () => {
    const testData = {
      IsIncompetent: { value: 'invalid' },
    }
    const expectedErrors = [
      'IsIncompetent.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, competence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if IsIncompetent is "Yes"', () => {
    it('List is required', () => {
      const testData = {
        IsIncompetent: { value: 'Yes' },
      }
      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, competence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        IsIncompetent: { value: 'Yes' },
        List: { test: 'invalid' },
      }
      const expectedErrors = [
        'List.accordion.INVALID_BRANCH',
      ]

      expect(validateModel(testData, competence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List items must be valid Orders', () => {
      const testData = {
        IsIncompetent: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
              },
            },
          ],
        },
      }
      const expectedErrors = [
        'List.accordion.0.CourtName.presence.REQUIRED',
        'List.accordion.0.CourtAddress.presence.REQUIRED',
        'List.accordion.0.Occurred.presence.REQUIRED',
        'List.accordion.0.Appeals.presence.REQUIRED',
      ]

      expect(validateModel(testData, competence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid competence', () => {
      const testData = {
        IsIncompetent: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
                CourtName: { value: 'Test court' },
                CourtAddress: {
                  street: '50 Court St',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '10002',
                  country: { value: 'United States' },
                },
                Occurred: { month: '09', year: '2012' },
                Appeals: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'Yes' },
                        CourtName: { value: 'Test court' },
                        CourtAddress: {
                          street: '50 Court St',
                          city: 'New York',
                          state: 'NY',
                          zipcode: '10002',
                          country: { value: 'United States' },
                        },
                        Disposition: { value: 'Test disposition' },
                      },
                    },
                    {
                      Item: {
                        Has: { value: 'No' },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, competence)).toEqual(true)
    })
  })

  describe('if IsIncompetent is "No"', () => {
    it('List is not required', () => {
      const testData = {
        IsIncompetent: { value: 'No' },
      }
      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, competence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid competence', () => {
      const testData = {
        IsIncompetent: { value: 'No' },
      }

      expect(validateModel(testData, competence)).toEqual(true)
    })
  })
})
