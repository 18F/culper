import React from 'react'
import { shallow, mount } from 'enzyme'
import { ApplicantBirthPlace } from './ApplicantBirthPlace'

describe('The ApplicantBirthPlace component', () => {
  it('renders without errors', () => {
    const component = shallow(<ApplicantBirthPlace />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('displays no error by default', () => {
    const component = mount(<ApplicantBirthPlace />)

    component.find('.blocks .yes input').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('implements an onUpdate handler', () => {
    let updates = 0
    const testProps = {
      name: 'input-focus',
      className: 'input-focus',
      label: 'Text input focused',
      value: '',
      onUpdate: () => {
        updates += 1
      },
    }
    const component = mount(<ApplicantBirthPlace {...testProps} />)
    component.find('.blocks .yes input').simulate('change')
    expect(updates).toBe(1)
  })
})
