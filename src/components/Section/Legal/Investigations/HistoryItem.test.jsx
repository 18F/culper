import React from 'react'
import { mount } from 'enzyme'
import HistoryItem from './HistoryItem'

describe('The legal investigations history item component', () => {
  it('can select values', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<HistoryItem onUpdate={onUpdate} />)
    component
      .find(
        '.legal-investigations-history-agency .investigative-agency-dod input'
      )
      .simulate('change')
    component
      .find('.legal-investigations-history-agency-notapplicable .button input')
      .simulate('change')
    component
      .find('.legal-investigations-history-completed .year input')
      .simulate('change')
    component
      .find(
        '.legal-investigations-history-completed-notapplicable .button input'
      )
      .simulate('change')
    component
      .find('.legal-investigations-history-issued input')
      .simulate('change')
    component
      .find('.legal-investigations-history-granted .year input')
      .simulate('change')
    component
      .find('.legal-investigations-history-granted-notapplicable .button input')
      .simulate('change')
    component
      .find(
        '.legal-investigations-history-clearance .clearance-level-none input'
      )
      .simulate('change')
    component
      .find(
        '.legal-investigations-history-clearance-notapplicable .button input'
      )
      .simulate('change')
    expect(updates).toBe(9)
  })
})
