import { validateModel } from 'models/validate'
import historyFederalService from 'models/sections/historyFederalService'

describe('The history federal service section model', () => {
  it('requires a List if HasFederalService', () => {
    const testData = {
      HasFederalService: { value: 'Yes' },
    }
    const expectedErrors = ['List.required']

    expect(validateModel(testData, historyFederalService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not require a List if HasFederalService is No', () => {
    const testData = {
      HasFederalService: { value: 'No' },
    }
    const unexpectedErrors = ['List.required']

    expect(validateModel(testData, historyFederalService))
      .toEqual(expect.not.arrayContaining(unexpectedErrors))
  })

  it('validates federal service list', () => {
    const testData = {
      HasFederalService: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {
                value: 'FDA',
              },
              Position: {
                value: 'CTR',
              },
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010',
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2016',
                },
                present: false,
              },
              Address: {
                country: { value: 'United States' },
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
                zipcode: '22202',
              },
            },
          },
        ],
      },
    }

    expect(validateModel(testData, historyFederalService)).toEqual(true)
  })
})
