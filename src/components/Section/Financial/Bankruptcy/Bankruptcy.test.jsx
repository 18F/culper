import React from 'react'
import { mount } from 'enzyme'
import Bankruptcy from './Bankruptcy'

let bankruptcyData = [
  {
    CourtAddress: {
      address: '123 Some Rd'
    },
    CourtInvolved: {
      name: 'CourtInvolved',
      value: 'Test Court'
    },
    CourtNumber: {
      name: 'CourtNumber',
      value: 'A123'
    },
    NameDebt: {
      first: 'John',
      last: 'Doe'
    },
    PetitionType: {
      name: 'PetitionType',
      address: {
        address: '123 Some Rd'
      },
      value: 'Chapter13'
    },
    TotalAmount: {
      name: 'TotalAmount',
      value: '1000'
    }
  }
]

describe('The bankruptcy component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'bankruptcy'
    }
    const component = mount(<Bankruptcy name={expected.name} />)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(0)
  })

  it('load data and add another gambling debt', () => {
    const expected = {
      name: 'bankrupcty'
    }
    let onUpdate = () => {}
    const component = mount(
      <Bankruptcy
        name={expected.name}
        List={bankruptcyData}
        HasBankruptcy={true}
        Comments={'Test'}
        onUpdate={onUpdate}
      />
    )
    component.find({type: 'radio', name: 'has_bankruptcydebt', value: 'Yes'}).simulate('change')
    expect(component.find('.details').length).toBeGreaterThan(0)
    component.find('textarea#Comments').simulate('change')

    component.find('button.add').simulate('click')
    expect(component.find('.summary.open').length).toBeGreaterThan(0)
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
