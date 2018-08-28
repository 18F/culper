import React from 'react'
import { mount } from 'enzyme'
import NegativeImpacts from './NegativeImpacts'

describe('The NegativeImpacts component', () => {
  it('Renders without errors', () => {
    const component = mount(<NegativeImpacts />)
    expect(component.find('.negative-impacts').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<NegativeImpacts onUpdate={onUpdate} />)
    expect(component.find('.negative-impacts').length).toBe(1)
    component.find('.has-impacts .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      HasImpacts: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              Occurred: {
                month: '1',
                year: '2010'
              },
              Circumstances: {
                value: 'Foo'
              },
              NegativeImpact: {
                value: 'Bar'
              },
              Used: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              }
            }
          }
        ]
      }
    }
    const component = mount(<NegativeImpacts {...expected} />)
    component.find('textarea[name="Circumstances"]').simulate('change')
    expect(updates).toBe(2)
  })
})
