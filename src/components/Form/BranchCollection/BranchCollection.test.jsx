import React from 'react'
import { mount } from 'enzyme'
import BranchCollection from './BranchCollection'
import Text from '../Text'

describe('The BranchCollection component', () => {
  const hello = (<div id="summary">Hola</div>)

  it('renders yes/no and branch contents', () => {
    const component = mount(<BranchCollection branch={hello} />)
    expect(component.find({type: 'radio', value: 'Yes'}).length).toBe(1)
    expect(component.find({type: 'radio', value: 'No'}).length).toBe(1)
    expect(component.find('div#summary').text()).toBe('Hola')
  })

  it('Renders contents when items exist', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const items = [{ Has: 'Yes' }]

    const component = mount(<BranchCollection items={items} branch={hello} onUpdate={onUpdate}><Text bind={true} name="foo" /></BranchCollection>)
    expect(component.find({type: 'text', id: 'foo'}).length).toBe(1)
    component.find({type: 'text', id: 'foo'}).simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.last-branch').length).toBe(1)
  })

  it('Renders no when item has `No` value', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const items = [
      {
        Has: 'No'
      }
    ]

    const component = mount(<BranchCollection items={items} branch={hello} onUpdate={onUpdate}> <Text bind={true} name="foo" /> </BranchCollection>)
    expect(component.find({type: 'text', id: 'foo'}).length).toBe(0)
  })

  it('Renders multiple pieces of information with ability to add at the end', () => {
    const items = [
      {
        Has: 'Yes'
      },
      {
        Has: 'Yes'
      },
      {
        Has: 'Yes'
      }
    ]

    const component = mount(
                            <BranchCollection items={items} branch={hello}>
                              <Text bind={true} name="foo" />
                            </BranchCollection>
                           )
    expect(component.find({type: 'radio', value: 'Yes'}).length).toBe(4)
    expect(component.find({type: 'radio', value: 'No'}).length).toBe(4)
  })
})
