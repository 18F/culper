import { validateModel } from 'models/validate'
import order, { appeal } from '../order'

describe('The appeal model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'CourtName.required',
      'CourtAddress.required',
      'Disposition.required',
    ]

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtName must have a value', () => {
    const testData = { CourtName: 'test court' }
    const expectedErrors = ['CourtName.hasValue']

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtAddress must be a valid location', () => {
    const testData = { CourtAddress: { address: 'invalid address' } }
    const expectedErrors = ['CourtAddress.location']

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Disposition must have a value', () => {
    const testData = { Disposition: 'test' }
    const expectedErrors = ['Disposition.hasValue']

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid appeal', () => {
    const testData = {
      CourtName: { value: 'Test court' },
      CourtAddress: {
        street: '50 Court St',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: { value: 'United States' },
      },
      Disposition: { value: 'Test disposition' },
    }

    expect(validateModel(testData, appeal)).toEqual(true)
  })
})

describe('The order model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'CourtName.required',
      'CourtAddress.required',
      'Disposition.required',
      'Occurred.required',
      'Appeals.required',
    ]

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtName must have a value', () => {
    const testData = { CourtName: 'test court' }
    const expectedErrors = ['CourtName.hasValue']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtAddress must be a valid location', () => {
    const testData = { CourtAddress: { address: 'invalid address' } }
    const expectedErrors = ['CourtAddress.location']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Occurred must be a valid month/year', () => {
    const testData = { Occurred: { date: '3/16/00' } }
    const expectedErrors = ['Occurred.date']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Disposition must have a value', () => {
    const testData = { Disposition: 'test' }
    const expectedErrors = ['Disposition.hasValue']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Appeals must be valid', () => {
    const testData = {
      Appeals: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Court: 'invalid',
            },
          },
        ],
      },
    }
    const expectedErrors = ['Appeals.branchCollection']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Disposition is not required', () => {
    it('Disposition is not required', () => {
      const testData = {}
      const expectedErrors = ['Disposition.required']

      expect(validateModel(testData, order, { requireDisposition: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid order', () => {
      const testData = {
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
      }

      expect(validateModel(testData, order, { requireDisposition: false })).toEqual(true)
    })
  })

  it('passes a valid order', () => {
    const testData = {
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
    }

    expect(validateModel(testData, order)).toEqual(true)
  })
})
