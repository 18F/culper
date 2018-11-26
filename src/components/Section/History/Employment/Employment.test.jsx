import React from 'react'
import { shallow, mount } from 'enzyme'
import Employment from './Employment'

describe('The employment section', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      List: {
        branch: {},
        items: [
          {
            type: "Gap",
            Item: {
              Dates: {
                from: {
                  day: '1',
                  month: '1',
                  year: '2013',
                  date: new Date('1/1/2013')
                },
                to: {
                  day: '12',
                  month: '31',
                  year: '2013',
                  date: new Date('12/31/2013')
                }
              }
            }
          },
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

  it('sorts employment items with most recent being first', () => {
    const props = {
      List: {
        branch: {},
        items: [
          {
            Item: {
              Dates: {
                from: {
                  day: '10',
                  month: '10',
                  year: '2005',
                  date: new Date('10/10/2005')
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2007',
                  date: new Date('10/10/2007')
                }
              }
            }
          },
          {
            Item: {
              Dates: {
                from: {
                  day: '10',
                  month: '10',
                  year: '2000',
                  date: new Date('10/10/2000')
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2004',
                  date: new Date('10/10/2004')
                }
              }
            }
          },
          {
            Item: {
              Dates: {
                from: {
                  day: '10',
                  month: '10',
                  year: '2014',
                  date: new Date('10/10/2014')
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2018',
                  date: new Date('10/10/2018')
                }
              }
            }
          }
        ]
      }
    }

    const component = mount(<Employment {...props} />)
    const sortedEmploymentItems = component.instance().sortEmploymentItems(props.List.items)

    console.log(sortedEmploymentItems[0])
    expect(sortedEmploymentItems[0].Item.Dates.from.year).toEqual('2014')
    expect(sortedEmploymentItems[1].Item.Dates.from.year).toEqual('2005')
    expect(sortedEmploymentItems[2].Item.Dates.from.year).toEqual('2000')
  })
})
