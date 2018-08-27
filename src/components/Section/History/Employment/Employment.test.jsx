import React from 'react'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The employment section', () => {
  it('can trigger updates', () => {
    let updates = 0
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
                  date: new Date('1/1/2014')
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2018',
                  date: new Date('1/1/2018')
                }
              }
            }
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Employment {...expected} />)
    expect(updates).toBe(1)
  })
})
