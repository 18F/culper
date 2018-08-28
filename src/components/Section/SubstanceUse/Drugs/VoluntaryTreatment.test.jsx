import React from 'react'
import { mount } from 'enzyme'
import VoluntaryTreatment from './VoluntaryTreatment'

describe('The VoluntaryTreatment component', () => {
  it('Renders without errors', () => {
    const component = mount(<VoluntaryTreatment />)
    expect(component.find('.drug-voluntary-treatment').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<VoluntaryTreatment onUpdate={onUpdate} />)

    component.find('.drug-type-voluntary .cocaine input').simulate('change')
    component.find('.treatment-provider input').simulate('change')
    component.find('.treatment-provider-address .city input').simulate('change')
    component
      .find('.treatment-provider-telephone .telephone .number.three input')
      .at(0)
      .simulate('change')
    component.find('.treatment-dates .from .year input').simulate('change')
    component.find('.treatment-completed .yes input').simulate('change')
    expect(updates).toBe(6)
  })

  it('Performs update when no treatment completed', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <VoluntaryTreatment
        onUpdate={onUpdate}
        TreatmentCompleted={{ value: 'No' }}
      />
    )

    component.find('.no-treatment-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
