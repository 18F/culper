import { validateModel } from 'models/validate'
import order, { appeal } from '../order'

describe('The appeal model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'CourtName.presence.REQUIRED',
      'CourtAddress.presence.REQUIRED',
      'Disposition.presence.REQUIRED',
    ]

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtName must have a value', () => {
    const testData = { CourtName: 'test court' }
    const expectedErrors = ['CourtName.hasValue.MISSING_VALUE']

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtAddress must be a valid location', () => {
    const testData = { CourtAddress: { address: 'invalid address' } }
    const expectedErrors = [
      'CourtAddress.location.street.presence.REQUIRED',
      'CourtAddress.location.city.presence.REQUIRED',
      'CourtAddress.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtAddress field cannot be a PO box', () => {
    const testData = {
      CourtAddress: {
        street: 'PO Box 123',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      },
    }

    const expectedErrors = ['CourtAddress.location']

    expect(validateModel(testData, appeal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Disposition must have a value', () => {
    const testData = { Disposition: 'test' }
    const expectedErrors = ['Disposition.hasValue.MISSING_VALUE']

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
      'CourtName.presence.REQUIRED',
      'CourtAddress.presence.REQUIRED',
      'Disposition.presence.REQUIRED',
      'Occurred.presence.REQUIRED',
      'Appeals.presence.REQUIRED',
    ]

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtName must have a value', () => {
    const testData = { CourtName: 'test court' }
    const expectedErrors = ['CourtName.hasValue.MISSING_VALUE']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtAddress must be a valid location', () => {
    const testData = { CourtAddress: { address: 'invalid address' } }
    const expectedErrors = [
      'CourtAddress.location.street.presence.REQUIRED',
      'CourtAddress.location.city.presence.REQUIRED',
      'CourtAddress.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtAddress field cannot be a PO box', () => {
    const testData = {
      CourtAddress: {
        street: 'PO Box 123',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      },
    }

    const expectedErrors = ['CourtAddress.location']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Occurred must be a valid month/year', () => {
    const testData = { Occurred: { date: '3/16/00' } }
    const expectedErrors = [
      'Occurred.date.month.presence.REQUIRED',
      'Occurred.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Disposition must have a value', () => {
    const testData = { Disposition: 'test' }
    const expectedErrors = ['Disposition.hasValue.MISSING_VALUE']

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
    const expectedErrors = ['Appeals.branchCollection.INCOMPLETE_COLLECTION']

    expect(validateModel(testData, order))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Disposition is not required', () => {
    it('Disposition is not required', () => {
      const testData = {}
      const expectedErrors = ['Disposition.presence.REQUIRED']

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
