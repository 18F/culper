import React from 'react'
import { shallow } from 'enzyme'
import EducationSummaryProgress from './EducationSummaryProgress'

describe('The EducationSummaryProgress component', () => {
  const validEducation = [
    {
      uuid: '33fbaa6e-ca7a-8755-2cb5-17177549d2e7',
      open: true,
      Item: {
        Dates: {
          name: 'Dates',
          from: {
            name: 'from',
            month: '12',
            day: '12',
            year: '2013',
            estimated: false,
            touched: true,
          },
          to: {
            name: 'to',
            month: '12',
            day: '12',
            year: '2015',
            estimated: false,
            touched: true,
          },
          present: false,
        },
        Type: {
          name: 'type-college',
          value: 'College',
          checked: false,
        },
        Name: {
          value: 'Test School',
          name: 'Name',
        },
        Address: {
          uid: 'Address-f969ab20-1b31-697d-6902-459b0b39ab56',
          street: '1147 Murphy Hall',
          city: 'Los Angeles',
          zipcode: '90095',
          state: 'CA',
          country: {
            value: 'United States',
          },
          layout: 'Address',
          validated: true,
        },
        Comments: {},
        ReferenceName: {},
        ReferenceNameNotApplicable: {},
        ReferencePhone: {},
        ReferenceEmail: {},
        ReferenceEmailNotApplicable: {},
        ReferenceAddress: {},
        Diplomas: {
          items: [
            {
              Item: {
                Has: {
                  name: 'branchcollection',
                  value: 'Yes',
                },
                Diploma: {
                  name: 'diploma-bachelor',
                  value: 'Bachelor',
                  checked: false,
                },
                DiplomaOther: {},
                Date: {
                  name: 'Date',
                  month: '12',
                  day: '1',
                  year: '2015',
                  estimated: false,
                  touched: true,
                },
              },
              index: '603730f6-293a-579b-05d5-4fa3d37774d3',
            },
            {
              Item: {
                Has: {
                  name: 'branchcollection',
                  value: 'No',
                },
              },
              index: 'b71bb28a-c60b-36f6-84dd-c07e6e61977b',
            },
          ],
        },
      },
    },
  ]

  const invalidEducation = [
    {
      uuid: '33fbaa6e-ca7a-8755-2cb5-17177549d3f8',
      open: true,
      Item: {
        Dates: {
          name: 'Dates',
          from: {
            name: 'from',
            month: '12',
            day: '12',
            year: '2013',
            estimated: false,
            touched: true,
          },
          to: {
            name: 'to',
            month: '12',
            day: '12',
            year: '2015',
            estimated: false,
            touched: true,
          },
          present: false,
        },
        Type: {
          name: 'type-college',
          value: '',
          checked: false,
        },
        Name: {
          value: 'Test School',
          name: 'Name',
        },
        Address: {
          uid: 'Address-f969ab20-1b31-697d-6902-459b0b39ab56',
          street: '1147 Murphy Hall',
          city: 'Los Angeles',
          zipcode: '90095',
          state: 'CA',
          country: {
            value: 'United States',
          },
          layout: 'Address',
          validated: true,
        },
        Comments: {},
        ReferenceName: {},
        ReferenceNameNotApplicable: {},
        ReferencePhone: {},
        ReferenceEmail: {},
        ReferenceEmailNotApplicable: {},
        ReferenceAddress: {},
        Diplomas: {
          items: [
            {
              Item: {
                Has: {
                  name: 'branchcollection',
                  value: 'Yes',
                },
                Diploma: {
                  name: 'diploma-bachelor',
                  value: 'Bachelor',
                  checked: false,
                },
                DiplomaOther: {},
                Date: {
                  name: 'Date',
                  month: '12',
                  day: '1',
                  year: '2015',
                  estimated: false,
                  touched: true,
                },
              },
              index: '603730f6-293a-579b-05d5-4fa3d37774d3',
            },
            {
              Item: {
                Has: {
                  name: 'branchcollection',
                  value: 'No',
                },
              },
              index: 'b71bb28a-c60b-36f6-84dd-c07e6e61977b',
            },
          ],
        },
      },
    },
  ]

  it('renders without crashing (no education items)', () => {
    shallow(<EducationSummaryProgress />)
  })

  it('renders valid education items', () => {
    shallow(
      <EducationSummaryProgress
        items={validEducation}
      />
    )
  })

  it('renders education school items (both valid and invalid', () => {
    shallow(
      <EducationSummaryProgress
        items={[...validEducation, ...invalidEducation]}
        errors={['List.accordion.33fbaa6e-ca7a-8755-2cb5-17177549d3f8.Type.hasValue.MISSING_VALUE']}
      />
    )
  })

  it('doesnt crash with an untouched/empty education item', () => {
    shallow(
      <EducationSummaryProgress
        items={[
          { uuid: 'test-fake-uuid', open: true },
        ]}
      />
    )
  })
})
