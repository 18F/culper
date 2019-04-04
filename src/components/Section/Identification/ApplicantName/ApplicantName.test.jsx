import React from 'react'
import { shallow, mount } from 'enzyme'
import { ApplicantName } from './ApplicantName'

describe('The ApplicantName component', () => {
  it('renders without errors', () => {
    const component = shallow(<ApplicantName />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('displays no error by default', () => {
    const component = mount(<ApplicantName />)

    component.find('.first input').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('implements an onUpdate handler', () => {
    let updates = 0
    const testProps = {
      onUpdate: () => {
        updates += 1
      },
    }

    const component = mount(<ApplicantName {...testProps} />)
    component.find('.first input').simulate('change')
    expect(updates).toBe(1)
  })
})
