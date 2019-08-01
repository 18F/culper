import { validateModel } from 'models/validate'
import consultation from 'models/consultation'

describe('The consultation model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Consulted.presence.REQUIRED',
    ]

    expect(validateModel(testData, consultation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Consulted must be a valid value', () => {
    const testData = {
      Consulted: { value: 'invalid' },
    }
    const expectedErrors = [
      'Consulted.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, consultation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Consulted is "Yes"', () => {
    it('List is required', () => {
      const testData = {
        Consulted: { value: 'Yes' },
      }
      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, consultation))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        Consulted: { value: 'Yes' },
        List: { test: 'invalid' },
      }
      const expectedErrors = [
        'List.accordion.INVALID_BRANCH',
      ]

      expect(validateModel(testData, consultation))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List items must be valid Orders', () => {
      const testData = {
        Consulted: { value: 'Yes' },
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
        'List.accordion.0.Disposition.presence.REQUIRED',
        'List.accordion.0.Occurred.presence.REQUIRED',
        'List.accordion.0.Appeals.presence.REQUIRED',
      ]

      expect(validateModel(testData, consultation))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid consultation', () => {
      const testData = {
        Consulted: { value: 'Yes' },
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
                Disposition: { value: 'Test disposition' },
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

      expect(validateModel(testData, consultation)).toEqual(true)
    })
  })

  describe('if Consulted is "No"', () => {
    it('List is not required', () => {
      const testData = {
        Consulted: { value: 'No' },
      }
      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, consultation))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid consultation', () => {
      const testData = {
        Consulted: { value: 'No' },
      }

      expect(validateModel(testData, consultation)).toEqual(true)
    })
  })
})
