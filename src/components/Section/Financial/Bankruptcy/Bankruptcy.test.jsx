import React from 'react'
import { mount } from 'enzyme'
import Bankruptcy from './Bankruptcy'

describe('The bankruptcy component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'bankruptcy'
    }
    const component = mount(<Bankruptcy {...expected} />)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      HasBankruptcy: 'Yes'
    }
    const component = mount(<Bankruptcy {...expected} />)
    expect(component.find('.amount').length).toBeGreaterThan(0)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      HasBankruptcy: 'No'
    }
    const component = mount(<Bankruptcy {...expected} />)
    expect(component.find('.amount').length).toEqual(0)
  })
})
