import React from 'react'
import { mount } from 'enzyme'
import { TerrorismAssociation } from './TerrorismAssociation'

describe('The legal associations terrorism component', () => {
  it('renders without errors', () => {
    const component = mount(<TerrorismAssociation />)
    expect(component.find('.legal-associations-terrorism').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates += 1
    }
    const component = mount(<TerrorismAssociation onUpdate={onUpdate} />)
    component
      .find('.legal-associations-terrorism-has-terrorism .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    let updates = 0
    const props = {
      HasTerrorism: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = mount(<TerrorismAssociation {...props} />)
    expect(
      component.find('.legal-associations-terrorism-explanation').length
    ).toBe(1)
    component
      .find('.legal-associations-terrorism-explanation textarea')
      .simulate('change')
    expect(updates).toBe(1)
  })
})
