import React from 'react'
import { shallow } from 'enzyme'
import { Residence } from './Residence'

describe('The residence section', () => {
  it('can trigger updates', () => {
    const onUpdate = jest.fn()
    const expected = {
      List: {
        branch: {},
        items: [
          {
            Item: {
              Dates: {
                from: {
                  day: '1',
                  month: '1',
                  year: '2014',
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2018',
                },
              },
            },
          },
        ],
      },
      onUpdate,
    }
    const component = shallow(<Residence {...expected} />)
    expect(component).toBeDefined()
  })
})
