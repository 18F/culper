import React from 'react'
import { mount } from 'enzyme'
import BranchCollection from './BranchCollection'
import Text from '../Text'

describe('The BranchCollection component', () => {
  const hello = (<div className="summary">Hola</div>)

  it('renders yes/no and branch contents', () => {
    const component = mount(<BranchCollection content={hello} />)
    expect(component.find({type: 'radio', value: 'Yes'}).length).toBe(1)
    expect(component.find({type: 'radio', value: 'No'}).length).toBe(1)
    expect(component.find('div.summary').text()).toBe('Hola')
  })

  it('can click "yes"', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<BranchCollection content={hello} onUpdate={onUpdate}/>)
    component.find({type: 'radio', value: 'Yes'}).simulate('change')
    expect(updates).toBe(1)
  })

  it('can click "no"', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<BranchCollection content={hello} onUpdate={onUpdate}/>)
    component.find({type: 'radio', value: 'No'}).simulate('change')
    expect(updates).toBe(1)
  })

  it('can click "no" on last branch', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const items = [{ Has: 'Yes' }]
    const component = mount(<BranchCollection items={items} content={hello} onUpdate={onUpdate}/>)
    component.find({type: 'radio', value: 'No'}).at(1).simulate('change')
    component.find({type: 'radio', value: 'Yes'}).at(1).simulate('change')
    expect(updates).toBe(2)
  })

  it('Renders contents when items exist', () => {
    const items = [{ Has: 'Yes' }]
    const component = mount(<BranchCollection items={items} content={hello}><Text bind={true} name="foo" /></BranchCollection>)
    expect(component.find({type: 'text', name: 'foo'}).length).toBe(1)
    expect(component.find('.field.branch').length).toBe(2)
  })

  it('Renders no when item has `No` value', () => {
    const items = [{ Has: 'No' }]
    const component = mount(<BranchCollection items={items} content={hello}><Text bind={true} name="foo" /></BranchCollection>)
    expect(component.find({type: 'text', name: 'foo'}).length).toBe(0)
  })

  it('Renders multiple pieces of information with ability to add at the end', () => {
    const items = [
      { Has: 'Yes' },
      { Has: 'Yes' },
      { Has: 'Yes' }
    ]

    const component = mount(
                            <BranchCollection items={items} content={hello}>
                              <Text bind={true} name="foo" />
                            </BranchCollection>
                           )
    expect(component.find({type: 'radio', value: 'Yes'}).length).toBe(4)
    expect(component.find({type: 'radio', value: 'No'}).length).toBe(4)
  })
})
