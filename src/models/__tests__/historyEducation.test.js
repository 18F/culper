import { validateModel } from 'models/validate'
import historyEducation from 'models/sections/historyEducation'

describe('The history education section model', () => {
  it('requires applicant to answer if theyve attended school', () => {
    const testData = {}
    const expectedErrors = ['HasAttended.required']
    expect(validateModel(testData, historyEducation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires if applicant has degree(s) if they have not attended a school', () => {
    const testData = {
      HasAttended: { value: 'No' },
    }
    const expectedErrors = ['HasDegree10.required']
    expect(validateModel(testData, historyEducation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires List if HasAttended is Yes', () => {
    const testData = {
      HasAttended: { value: 'Yes' },
    }
    const expectedErrors = ['List.required']
    expect(validateModel(testData, historyEducation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires List if HasDegree10 is Yes', () => {
    const testData = {
      HasDegree10: { value: 'Yes' },
    }
    const expectedErrors = ['List.required']
    expect(validateModel(testData, historyEducation))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not require List if neither HasAttended nor HasDegree10 are Yes', () => {
    const testData = {
      HasAttended: { value: 'No' },
      HasDegree10: { value: 'No' },
    }
    const expectedErrors = ['List.required']
    expect(validateModel(testData, historyEducation))
      .toEqual(expect.not.arrayContaining(expectedErrors))
  })

  it('validates an entire education list', () => {
    const testData = {
      HasAttended: { value: 'Yes' },
      HasDegree10: { value: 'Yes' },
      List: {
        branch: {
          value: 'No',
        },
        items: [
          {
            Item: {
              Name: {
                value: 'School name',
              },
              ReferenceNameNotApplicable: {
                applicable: false,
              },
              Type: { value: 'High School' },
              Address: {
                country: { value: 'United States' },
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
                zipcode: '22202',
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
              Diplomas: {
                items: [
                  {
                    Item: {
                      Has: { value: 'No' },
                      Diploma: {},
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }

    expect(validateModel(testData, historyEducation)).toEqual(true)
  })
})
