import React from 'react'
import { mount } from 'enzyme'
import Multiple from './Multiple'

describe('The multiple component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'multiple'
    }
    const component = mount(<Multiple {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays accordion for citizenships', () => {
    const expected = {
      name: 'multiple',
      HasMultiple: { value: 'Yes' }
    }
    const component = mount(<Multiple {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'multiple',
      HasMultiple: { value: 'Yes' },
      List: { items: [{}] },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Multiple {...expected} />)
    updates = 0
    component.find('.has-multiple .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('displays custome summary', () => {
    const props = {
      HasMultiple: { value: 'Yes' },
      List: {
        branch: {},
        items: [
          {
            Item: {
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2000',
                  date: new Date('1/1/2000')
                },
                to: {
                  month: '4',
                  day: '1',
                  year: '2010',
                  date: new Date('4/1/2010')
                }
              },
              Country: {
                value: ['United States']
              }
            }
          }
        ]
      }
    }
    const component = mount(<Multiple {...props} />)
    expect(component.find('.summary .left .context').text()).toBe(
      'United States'
    )
    expect(component.find('.summary .left .dates').text()).toBe(
      '1/2000 - 4/2010'
    )
  })
})
